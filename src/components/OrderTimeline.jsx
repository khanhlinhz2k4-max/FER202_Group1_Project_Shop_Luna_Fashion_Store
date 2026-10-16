import React from 'react';
import { Check, Clock, PackageCheck, Truck, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './OrderTimeline.css';

/**
 * OrderTimeline Component
 * Visual Stepped Tracker displaying the 4 stages of an Atelier Order
 * Matches LUNE Warm Luxury brand guidelines
 * Bilingual Support: Vietnamese 🇻🇳 & English 🇬🇧
 */
export default function OrderTimeline({ status = 'Pending', compact = false }) {
  const { t, language } = useLanguage();
  const normStatus = (status || 'pending').toLowerCase();

  // If order is cancelled, show an explicit alert state
  if (normStatus === 'cancelled') {
    return (
      <div className="order-timeline-wrapper">
        <div className="order-timeline-cancelled-notice">
          <AlertCircle size={20} />
          <div>
            <strong>{t('timeline.cancelledTitle')}</strong> {t('timeline.cancelledDesc')}
          </div>
        </div>
      </div>
    );
  }

  // 4 progressive stages with bilingual titles and descriptions
  const steps = [
    {
      key: 'placed',
      title: t('timeline.step1Title'),
      desc: t('timeline.step1Desc'),
      icon: Clock,
      isActive: true, // Always completed if order exists
      isCompleted: normStatus !== 'pending'
    },
    {
      key: 'processing',
      title: t('timeline.step2Title'),
      desc: t('timeline.step2Desc'),
      icon: PackageCheck,
      isActive: normStatus === 'pending' || normStatus === 'shipping' || normStatus === 'delivered',
      isCompleted: normStatus === 'shipping' || normStatus === 'delivered'
    },
    {
      key: 'shipping',
      title: t('timeline.step3Title'),
      desc: t('timeline.step3Desc'),
      icon: Truck,
      isActive: normStatus === 'shipping' || normStatus === 'delivered',
      isCompleted: normStatus === 'delivered'
    },
    {
      key: 'delivered',
      title: t('timeline.step4Title'),
      desc: t('timeline.step4Desc'),
      icon: CheckCircle2,
      isActive: normStatus === 'delivered',
      isCompleted: normStatus === 'delivered'
    }
  ];

  // Calculate track progress percentage
  let progressPercent = 15;
  if (normStatus === 'pending') progressPercent = 35;
  if (normStatus === 'shipping') progressPercent = 70;
  if (normStatus === 'delivered') progressPercent = 100;

  // Status badge display translation
  const getStatusDisplay = () => {
    if (language === 'vi') {
      if (normStatus === 'pending') return 'Chờ xử lý & May đo';
      if (normStatus === 'shipping') return 'Đang vận chuyển';
      if (normStatus === 'delivered') return 'Đã giao thành công';
      if (normStatus === 'cancelled') return 'Đã hủy đơn';
    }
    return status;
  };

  return (
    <div className={`order-timeline-wrapper ${compact ? 'compact' : ''}`}>
      <div className="order-timeline-header">
        <h4 className="order-timeline-title">{t('timeline.headerTitle')}</h4>
        <span className={`order-timeline-status-badge ${normStatus}`}>
          {t('timeline.currentStatusLabel')} {getStatusDisplay()}
        </span>
      </div>

      <div className="order-timeline-steps">
        <div className="order-timeline-track">
          <div 
            className="order-timeline-track-fill" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {steps.map((step) => {
          const StepIcon = step.icon;
          const isCurrent = (
            (normStatus === 'pending' && step.key === 'processing') ||
            (normStatus === 'shipping' && step.key === 'shipping') ||
            (normStatus === 'delivered' && step.key === 'delivered')
          );

          let stepClass = 'order-timeline-step';
          if (step.isCompleted) stepClass += ' completed';
          else if (isCurrent) stepClass += ' current';

          return (
            <div key={step.key} className={stepClass}>
              <div className="order-timeline-node">
                {step.isCompleted ? (
                  <Check size={16} strokeWidth={2.5} />
                ) : (
                  <StepIcon size={16} />
                )}
              </div>
              <div className="order-timeline-step-name">{step.title}</div>
              {!compact && <div className="order-timeline-step-desc">{step.desc}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
