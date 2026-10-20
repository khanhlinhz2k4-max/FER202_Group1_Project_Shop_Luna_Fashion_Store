import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useLanguage } from '../context/LanguageContext';
import './ChatBot.css';

// Helper: Extract height, weight and 3-bust measurements from natural text
function parseMeasurements(text) {
  const lower = text.toLowerCase();

  let height = null;
  // Patterns like 1m60, 1.60, 1,60
  const m1 = lower.match(/1[m.,](\d{1,2})/);
  if (m1) {
    const dec = m1[1].length === 1 ? m1[1] + '0' : m1[1];
    height = 100 + parseInt(dec, 10);
  }
  // Patterns like 160cm, 165 cm, cao 165
  if (!height) {
    const m2 = lower.match(/(?:cao\s*)?(1[4-9]\d)(?:\s*cm)?/);
    if (m2) {
      height = parseInt(m2[1], 10);
    }
  }

  // Weight match: 52kg, 52 kg, nặng 52, 52 cân
  let weight = null;
  const wMatch = lower.match(/(\d{2,3})\s*(?:kg|kí|ký|cân\b|kilogram)/) || lower.match(/nặng\s*(\d{2,3})/);
  if (wMatch) {
    weight = parseInt(wMatch[1], 10);
  }

  // 3-Bust/Waist/Hip measurements
  let bust = null, waist = null, hip = null;
  const bMatch = lower.match(/(?:vòng 1|v1|ngực|bust)\s*[:=]?\s*(\d{2,3})/);
  if (bMatch) bust = parseInt(bMatch[1], 10);

  const w2Match = lower.match(/(?:vòng 2|v2|eo|waist)\s*[:=]?\s*(\d{2,3})/);
  if (w2Match) waist = parseInt(w2Match[1], 10);

  const hMatch = lower.match(/(?:vòng 3|v3|mông|hip|hips)\s*[:=]?\s*(\d{2,3})/);
  if (hMatch) hip = parseInt(hMatch[1], 10);

  // Pattern: 86-68-90 or 86 68 90
  const threeSizes = lower.match(/(\d{2})\s*[-/., ]\s*(\d{2})\s*[-/., ]\s*(\d{2})/);
  if (threeSizes && !bust && !waist && !hip) {
    bust = parseInt(threeSizes[1], 10);
    waist = parseInt(threeSizes[2], 10);
    hip = parseInt(threeSizes[3], 10);
  }

  return { height, weight, bust, waist, hip };
}

// Helper: Calculate personalized tailored size recommendation
function getPersonalizedSizeAdvice({ height, weight, bust, waist, hip }, isVi = true) {
  let primarySize = 'S';
  let secondarySize = 'M';

  if (weight) {
    if (weight < 47) {
      primarySize = 'XS';
      secondarySize = 'S';
    } else if (weight <= 52) {
      primarySize = 'S';
      secondarySize = 'M';
    } else if (weight <= 58) {
      primarySize = 'M';
      secondarySize = 'L';
    } else if (weight <= 65) {
      primarySize = 'L';
      secondarySize = 'XL';
    } else {
      primarySize = 'XL';
      secondarySize = isVi ? 'Bespoke (May đo riêng)' : 'Bespoke Atelier';
    }
  } else if (waist) {
    if (waist <= 64) {
      primarySize = 'XS';
      secondarySize = 'S';
    } else if (waist <= 68) {
      primarySize = 'S';
      secondarySize = 'M';
    } else if (waist <= 73) {
      primarySize = 'M';
      secondarySize = 'L';
    } else if (waist <= 78) {
      primarySize = 'L';
      secondarySize = 'XL';
    } else {
      primarySize = 'XL';
      secondarySize = isVi ? 'Bespoke (May đo riêng)' : 'Bespoke Atelier';
    }
  }

  const measurements = [
    height ? (isVi ? `Chiều cao ${(height >= 100 ? (height / 100).toFixed(2) + 'm' : height + 'cm')}` : `Height ${height}cm`) : null,
    weight ? (isVi ? `Cân nặng ${weight}kg` : `Weight ${weight}kg`) : null,
    bust ? (isVi ? `Vòng 1: ${bust}cm` : `Bust: ${bust}cm`) : null,
    waist ? (isVi ? `Vòng 2: ${waist}cm` : `Waist: ${waist}cm`) : null,
    hip ? (isVi ? `Vòng 3: ${hip}cm` : `Hips: ${hip}cm`) : null,
  ].filter(Boolean).join(' • ');

  if (isVi) {
    return (
      `✨ TƯ VẤN SIZE MAY ĐO CÁ NHÂN HÓA:\n` +
      `📏 Số đo ghi nhận: ${measurements}\n\n` +
      `🎯 Size phù hợp nhất: SIZE ${primarySize}\n` +
      `• Phom vừa vặn tôn dáng (Tailored Fit): Chuẩn xác theo tỷ lệ vóc dáng của bạn.\n` +
      `• Nếu thích mặc suông rộng / khoác ngoài cá tính (Relaxed Fit): Bạn có thể chọn Size ${secondarySize} cho các mẫu Áo vest Linen Blazer hoặc Áo len Cashmere dệt kim.\n` +
      `• Với Đầm lụa (Silk Draped Dress) & Quần xếp ly (Pleated Trouser): Nên chọn chuẩn Size ${primarySize} để vòng eo và hông đạt tỷ lệ chuẩn nhất!`
    );
  } else {
    return (
      `✨ PERSONAL ATELIER SIZING RECOMMENDATION:\n` +
      `📏 Recorded Measurements: ${measurements}\n\n` +
      `🎯 Recommended Size: SIZE ${primarySize}\n` +
      `• Tailored Fit: Perfectly sculpted to flatter your natural proportions.\n` +
      `• Contemporary Relaxed Silhouette: Opt for Size ${secondarySize} for our Structured Linen Blazers or Mongolian Cashmere.\n` +
      `• For Silk Dresses & Pleated Trousers: True-to-size ${primarySize} guarantees pristine waistline shaping!`
    );
  }
}

export default function ChatBot() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const isVi = language === 'vi';

  // Structured Knowledge Base (Bilingual)
  const FAQ_RESPONSES = {
    sizeGuide: {
      title: isVi ? '📏 Tư vấn chọn kích cỡ (Size Guide)' : '📏 Atelier Sizing Guide',
      text: isVi
        ? `Lune thiết kế theo phom dáng may đo Pháp (French Contemporary Tailoring):\n• Size S: Vòng 1 (82-86cm), Vòng 2 (64-68cm), 45-52kg.\n• Size M: Vòng 1 (86-90cm), Vòng 2 (68-72cm), 53-58kg.\n• Size L: Vòng 1 (90-95cm), Vòng 2 (72-78cm), 59-65kg.\n\n💡 TƯ VẤN THEO SỐ ĐO RIÊNG CỦA BẠN:\nHãy gõ chiều cao & cân nặng (ví dụ: "1m60 52kg" hoặc "cao 1m65 56kg") vào ô chat bên dưới để trợ lý tính toán size chuẩn xác nhất cho bạn nhé!`
        : `Lune garments follow French contemporary tailoring proportions:\n• Size S: Bust 82-86cm, Waist 64-68cm, 45-52kg.\n• Size M: Bust 86-90cm, Waist 68-72cm, 53-58kg.\n• Size L: Bust 90-95cm, Waist 72-78cm, 59-65kg.\n\n💡 PERSONALIZED SIZING:\nType your height & weight (e.g. "160cm 52kg") or 3-bust measurements into the chat to get instant personalized size advice!`,
    },
    returnPolicy: {
      title: isVi ? '🔄 Chính sách đổi trả 30 ngày' : '🔄 30-Day Complimentary Exchange',
      text: isVi
        ? `Quý khách hoàn toàn an tâm mua sắm tại Lune:\n• Hỗ trợ đổi size hoặc đổi mẫu trong vòng 30 NGÀY kể từ khi nhận hàng.\n• Điều kiện: Sản phẩm còn nguyên tem mác, chưa qua sử dụng hoặc giặt tẩy.\n• Lune hỗ trợ nhận hàng đổi trả tận nơi miễn phí cho đơn hàng từ 1.000.000₫.`
        : `Shop with total peace of mind at Lune:\n• 30-Day exchange period for sizes or alternative designs.\n• Requirement: Garment unworn, unwashed with all original atelier tags attached.\n• Complimentary home pickup on all orders over $150.`,
    },
    shipping: {
      title: isVi ? '🚚 Vận chuyển & Giao hàng' : '🚚 Shipping & Delivery Rates',
      text: isVi
        ? `Thông tin giao nhận hàng toàn quốc:\n• Miễn phí giao hàng hỏa tốc cho mọi đơn từ 1.500.000₫ (hoặc $150).\n• Nội thành (Hà Nội, TP.HCM): 1 - 2 ngày làm việc.\n• Các tỉnh thành khác: 2 - 4 ngày làm việc.\n• Mọi kiện hàng đều được đóng gói bằng hộp giấy lụa bảo vệ môi trường cao cấp.`
        : `Worldwide & Nationwide Delivery details:\n• Free express shipping on orders over $150.\n• Metro centers: 1 - 2 business days.\n• Regional provinces: 2 - 4 business days.\n• All pieces arrive in sustainable signature silk packaging.`,
    },
    vouchers: {
      title: isVi ? '🎟️ Mã ưu đãi hiện có' : '🎟️ Active Promotional Vouchers',
      text: isVi
        ? `Các mã ưu đãi đặc quyền hôm nay:\n• LUNE10 — Giảm 10% cho đơn hàng đầu tiên của thành viên mới.\n• ATELIER20 — Giảm 20% cho hóa đơn từ 2.500.000₫.\n• FREESHIP — Miễn phí vận chuyển toàn quốc không giới hạn giá trị đơn hàng.`
        : `Exclusive atelier privilege codes today:\n• LUNE10 — 10% off your very first order upon registration.\n• ATELIER20 — 20% off for boutique orders over $200.\n• FREESHIP — Free express delivery on all orders without minimum limit.`,
    },
    bestSellers: {
      title: isVi ? '✨ Sản phẩm bán chạy nhất' : '✨ Iconic Best Sellers',
      text: isVi
        ? `3 thiết kế biểu tượng được yêu thích nhất mùa này:\n1. Atelier Tailored Linen Blazer ($245.00) — Phom vest lanh cao cấp thoáng nhẹ.\n2. Sienna Silk Draped Midi Dress ($210.00) — Đầm lụa tơ tằm dệt rủ quý phái.\n3. Cashmere Ribbed Knit Cardigan ($175.00) — Áo dệt kim len cashmere Mông Cổ mềm mại.`
        : `Top 3 signature silhouettes adored this season:\n1. Atelier Tailored Linen Blazer ($245.00) — Architectural structured pure linen.\n2. Sienna Silk Draped Midi Dress ($210.00) — Fluid mulberry silk evening drape.\n3. Cashmere Ribbed Knit Cardigan ($175.00) — Ultra-soft Mongolian pure cashmere.`,
    },
  };

  const initialMessages = [
    {
      id: 1,
      sender: 'bot',
      text: isVi
        ? 'Xin chào quý khách! Tôi là trợ lý phong cách tại Atelier Lune. Bạn có thể hỏi về tư vấn size theo số đo cá nhân, chính sách đổi trả hoặc mã giảm giá hôm nay!'
        : 'Welcome to Atelier Lune! I am your personal stylist assistant. Ask me for personalized sizing based on your measurements, return policy, or active voucher codes!',
      time: 'Just now',
    },
  ];

  const [messages, setMessages] = useState(initialMessages);

  // Auto-scroll to bottom of messages
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleOpen = () => {
    setIsOpen(true);
    setHasUnread(false);
  };

  const sendDirectMessage = (text) => {
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      processBotResponse(text);
    }, 600);
  };

  const handleSelectQuickPrompt = (key) => {
    const faq = FAQ_RESPONSES[key];
    if (!faq) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: faq.title,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: faq.text,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const processBotResponse = (query) => {
    const lower = query.toLowerCase();
    const measurements = parseMeasurements(query);
    let responseText = '';

    // 1. Personal measurements detected (height, weight, or 3-bust)
    if (measurements.weight || (measurements.height && measurements.weight) || measurements.waist) {
      responseText = getPersonalizedSizeAdvice(measurements, isVi);
    } else if (measurements.height && !measurements.weight) {
      const hStr = measurements.height >= 100 ? (measurements.height / 100).toFixed(2) + 'm' : measurements.height + 'cm';
      responseText = isVi
        ? `Với chiều cao ${hStr}, bạn có vóc dáng rất đẹp để diện các mẫu đầm lụa và áo khoác blazer của Lune.\n💡 Để gợi ý size chuẩn vừa vặn nhất, bạn cho Lune biết thêm CÂN NẶNG của bạn nhé (ví dụ: "${hStr} 52kg")!`
        : `With height ${hStr}, you have an ideal silhouette for Lune's flowing silhouettes.\n💡 Please provide your WEIGHT (e.g. "${hStr} 52kg") so I can recommend the exact tailored size!`;
    } else if (lower.includes('size') || lower.includes('kích cỡ') || lower.includes('vừa') || lower.includes('số đo') || lower.includes('bảng size') || lower.includes('mặc size')) {
      responseText = FAQ_RESPONSES.sizeGuide.text;
    } else if (lower.includes('đổi') || lower.includes('trả') || lower.includes('bảo hành') || lower.includes('return') || lower.includes('exchange')) {
      responseText = FAQ_RESPONSES.returnPolicy.text;
    } else if (lower.includes('ship') || lower.includes('giao') || lower.includes('vận chuyển') || lower.includes('phí') || lower.includes('mấy ngày') || lower.includes('delivery')) {
      responseText = FAQ_RESPONSES.shipping.text;
    } else if (lower.includes('mã') || lower.includes('voucher') || lower.includes('giảm giá') || lower.includes('coupon') || lower.includes('discount') || lower.includes('sale') || lower.includes('ưu đãi')) {
      responseText = FAQ_RESPONSES.vouchers.text;
    } else if (lower.includes('áo') || lower.includes('váy') || lower.includes('đầm') || lower.includes('blazer') || lower.includes('lụa') || lower.includes('cashmere') || lower.includes('sản phẩm') || lower.includes('bán chạy') || lower.includes('gợi ý')) {
      responseText = FAQ_RESPONSES.bestSellers.text;
    } else if (lower.includes('liên hệ') || lower.includes('hotline') || lower.includes('sđt') || lower.includes('gặp nhân viên') || lower.includes('contact') || lower.includes('cửa hàng')) {
      responseText = isVi
        ? `Quý khách có thể kết nối trực tiếp với chuyên viên may đo của chúng tôi:\n• Hotline Atelier: 1900 6868 (8:30 - 22:00 hàng ngày)\n• Email hỗ trợ: stylist@atelierlune.vn\n• Flagship Boutique: 68 Đồng Khởi, Quận 1, TP. Hồ Chí Minh.`
        : `Connect directly with our boutique master tailors:\n• Atelier Concierge: +84 1900 6868 (Daily 8:30 - 22:00)\n• Email: concierge@atelierlune.com\n• Flagship Boutique: 68 Dong Khoi St, District 1, Ho Chi Minh City.`;
    } else {
      responseText = isVi
        ? `Cảm ơn bạn đã nhắn tin. Về câu hỏi "${query}", bạn có thể gõ số đo chiều cao & cân nặng (ví dụ: "1m60 52kg") để được tư vấn size, hoặc chọn các chủ đề nhanh bên dưới nhé!`
        : `Thank you for your message. Regarding "${query}", you can share your measurements (e.g. "160cm 52kg") for size advice, or choose any topic below!`;
    }

    const botMsg = {
      id: Date.now() + 1,
      sender: 'bot',
      text: responseText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, botMsg]);
    setIsTyping(false);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    const query = inputValue.trim();
    if (!query) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      processBotResponse(query);
    }, 600);
  };

  const handleReset = () => {
    setMessages(initialMessages);
  };

  return (
    <div className="lune-chatbot-container">
      {/* 1. Floating Action Bubble (FAB) */}
      {!isOpen && (
        <button
          type="button"
          onClick={handleOpen}
          className="chatbot-trigger-btn"
          aria-label={isVi ? 'Mở trợ lý tư vấn Lune' : 'Open Lune Stylist Assistant'}
        >
          <div className="chatbot-icon-inner">
            <MessageSquare size={22} className="chat-bubble-icon" />
            <Sparkles size={12} className="chat-sparkle-icon" />
          </div>

          {/* Online green indicator */}
          <span className="chatbot-online-pulse" />
        </button>
      )}

      {/* 2. Chatbot Dialog Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Top Decorative Gold Ribbon */}
          <div className="chatbot-top-ribbon" />

          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-left">
              <div className="chatbot-avatar-circle">
                <Sparkles size={16} className="text-[var(--primary-brown)]" />
              </div>
              <div className="chatbot-header-info">
                <div className="chatbot-header-title-row">
                  <span className="chatbot-brand-name">Atelier Lune</span>
                  <span className="chatbot-ai-badge">AI Stylist</span>
                </div>
                <div className="chatbot-header-status">
                  <span className="status-dot-active" />
                  <span>{isVi ? 'Tư vấn trực tuyến 24/7' : 'Online Stylist 24/7'}</span>
                </div>
              </div>
            </div>

            <div className="chatbot-header-actions">
              <button
                type="button"
                onClick={handleReset}
                title={isVi ? 'Làm mới cuộc trò chuyện' : 'Reset Chat'}
                className="chatbot-control-btn"
              >
                <RotateCcw size={14} />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title={isVi ? 'Đóng chat' : 'Close'}
                className="chatbot-control-btn"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="chatbot-body">
                {/* Message Log */}
                {messages.map((msg) => (
                  <div key={msg.id} className={`chat-message-row ${msg.sender === 'user' ? 'user-row' : 'bot-row'}`}>
                    {msg.sender === 'bot' && (
                      <div className="bot-avatar-mini">
                        <span>L</span>
                      </div>
                    )}
                    <div className={`chat-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
                      <p className="chat-bubble-text">{msg.text}</p>
                      <span className="chat-bubble-time">{msg.time}</span>
                    </div>
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="chat-message-row bot-row">
                    <div className="bot-avatar-mini">
                      <span>L</span>
                    </div>
                    <div className="chat-bubble bot-bubble typing-bubble">
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompt Badges using shadcn Badge */}
              <div className="chatbot-quick-prompts">
                <span className="quick-prompts-label">
                  {isVi ? 'Gợi ý câu hỏi & thử số đo nhanh:' : 'Quick Questions & Size Tests:'}
                </span>
                <div className="quick-prompts-scroll">
                  <button
                    type="button"
                    className="quick-chip-btn highlight"
                    onClick={() => sendDirectMessage(isVi ? 'Mình cao 1m60 nặng 52kg mặc size gì?' : 'I am 160cm and 52kg, what size fits me?')}
                  >
                    ✨ {isVi ? 'Thử: 1m60 • 52kg' : 'Test: 160cm • 52kg'}
                  </button>
                  <button
                    type="button"
                    className="quick-chip-btn highlight"
                    onClick={() => sendDirectMessage(isVi ? 'Mình cao 1m65 nặng 58kg mặc size nào?' : 'I am 165cm and 58kg, what size should I wear?')}
                  >
                    ✨ {isVi ? 'Thử: 1m65 • 58kg' : 'Test: 165cm • 58kg'}
                  </button>
                  <button
                    type="button"
                    className="quick-chip-btn"
                    onClick={() => handleSelectQuickPrompt('sizeGuide')}
                  >
                    📏 {isVi ? 'Bảng size may đo' : 'Size Guide'}
                  </button>
                  <button
                    type="button"
                    className="quick-chip-btn"
                    onClick={() => handleSelectQuickPrompt('vouchers')}
                  >
                    🎟️ {isVi ? 'Mã ưu đãi' : 'Promo Codes'}
                  </button>
                  <button
                    type="button"
                    className="quick-chip-btn"
                    onClick={() => handleSelectQuickPrompt('returnPolicy')}
                  >
                    🔄 {isVi ? 'Đổi trả 30 ngày' : '30-Day Return'}
                  </button>
                  <button
                    type="button"
                    className="quick-chip-btn"
                    onClick={() => handleSelectQuickPrompt('shipping')}
                  >
                    🚚 {isVi ? 'Vận chuyển' : 'Shipping'}
                  </button>
                  <button
                    type="button"
                    className="quick-chip-btn"
                    onClick={() => handleSelectQuickPrompt('bestSellers')}
                  >
                    ✨ {isVi ? 'Mẫu bán chạy' : 'Best Sellers'}
                  </button>
                </div>
              </div>

              {/* Input Footer using shadcn Button */}
              <form onSubmit={handleSendMessage} className="chatbot-footer">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={isVi ? 'Nhập câu hỏi tư vấn...' : 'Ask your stylist anything...'}
                  className="chatbot-input"
                  maxLength={300}
                />
                <Button
                  type="submit"
                  size="icon"
                  variant="default"
                  disabled={!inputValue.trim()}
                  className="chatbot-send-btn"
                  aria-label="Send message"
                >
                  <Send size={15} />
                </Button>
              </form>
        </div>
      )}
    </div>
  );
}
