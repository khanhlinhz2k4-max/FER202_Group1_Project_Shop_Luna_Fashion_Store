import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

const ShopContext = createContext();

// Sample initial orders for testing Admin and Profile My Orders
const sampleOrders = [
  {
    id: "LUNE-1049",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    customer: {
      name: "Emma Laurent",
      email: "emma@example.com",
      phone: "+84 912 345 678",
      address: "123 Dong Khoi, District 1, Ho Chi Minh City"
    },
    items: [
      {
        id: 1,
        name: "Atelier Tailored Linen Blazer",
        price: 245,
        image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=900",
        selectedSize: "M",
        selectedColor: "#C8AE84",
        quantity: 1
      }
    ],
    totalAmount: 245,
    status: "Delivered",
    paymentMethod: "Credit Card"
  },
  {
    id: "LUNE-1050",
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    customer: {
      name: "Alexander Vance",
      email: "alex@example.com",
      phone: "+84 903 888 999",
      address: "456 Tran Phu, Ward 4, Da Nang"
    },
    items: [
      {
        id: 2,
        name: "Sienna Silk Draped Midi Dress",
        price: 210,
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=900",
        selectedSize: "S",
        selectedColor: "#CAA072",
        quantity: 1
      },
      {
        id: 7,
        name: "Luna Saddle Leather Shoulder Bag",
        price: 220,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=900",
        selectedSize: "One Size",
        selectedColor: "#775B3F",
        quantity: 1
      }
    ],
    totalAmount: 430,
    status: "Shipping",
    paymentMethod: "Cash on Delivery"
  }
];

// Sample default accounts (Admin and Customer)
const sampleUsers = [
  {
    id: "user-admin",
    name: "Lune Administrator",
    email: "admin@lune.com",
    password: "Admin@123",
    role: "admin",
    phone: "+84 900 000 001",
    address: "Lune Fashion HQ, 01 Le Duan, District 1, HCMC"
  },
  {
    id: "user-demo",
    name: "Linh Nguyen",
    email: "customer@lune.com",
    password: "Password@123",
    role: "user",
    phone: "+84 987 654 321",
    address: "789 Nguyen Hue, District 1, HCMC"
  }
];

<<<<<<< HEAD
const sampleVouchers = [
  {
    id: 'voucher-lune10',
    code: 'LUNE10',
    discountType: 'percent',
    discountValue: 10,
    minSubtotal: 0,
    expiresAt: '',
    isActive: true
=======
// Sample initial reviews for testing luxury rating features
const sampleReviews = [
  {
    id: 101,
    productId: 1,
    orderId: "LUNE-1049",
    userName: "Elena Rostova",
    userEmail: "elena@example.com",
    rating: 5,
    title: "Masterpiece of tailoring & linen texture",
    comment: "The cut of this blazer is nothing short of exceptional. The linen-silk blend feels crisp yet supple, and the beige hue pairs seamlessly with monochrome palettes. Worth every single penny.",
    date: "Oct 08, 2026",
    verifiedBuyer: true
  },
  {
    id: 102,
    productId: 1,
    orderId: null,
    userName: "Minh Anh N.",
    userEmail: "minhanh@example.com",
    rating: 5,
    title: "Perfect structured shoulders",
    comment: "I wore this for an atelier opening in Saigon and received countless compliments. The fit is true to size (I am 165cm and wear size S).",
    date: "Oct 10, 2026",
    verifiedBuyer: true
  },
  {
    id: 103,
    productId: 1,
    orderId: null,
    userName: "Claire Dubois",
    userEmail: "claire@example.com",
    rating: 4,
    title: "Timeless silhouette",
    comment: "Breathable fabric and elegant horn buttons. Slightly roomy around the waist, which creates an effortless relaxed tailored vibe.",
    date: "Sep 28, 2026",
    verifiedBuyer: false
  },
  {
    id: 104,
    productId: 2,
    orderId: "LUNE-1050",
    userName: "Alexander Vance",
    userEmail: "alex@example.com",
    rating: 5,
    title: "Drapes like water",
    comment: "Purchased this as a gala gift. The mulberry silk catches ambient light with quiet luxury. The bias cut is remarkably flattering.",
    date: "Oct 11, 2026",
    verifiedBuyer: true
  },
  {
    id: 105,
    productId: 2,
    orderId: null,
    userName: "Camille Laurent",
    userEmail: "camille@example.com",
    rating: 5,
    title: "Incredible craftsmanship",
    comment: "Delicate straps yet surprisingly supportive. The open low back gives it a sensual yet ultra-refined presence.",
    date: "Oct 05, 2026",
    verifiedBuyer: true
  },
  {
    id: 106,
    productId: 3,
    orderId: null,
    userName: "Sophia T.",
    userEmail: "sophia@example.com",
    rating: 5,
    title: "Cloud-like cashmere softness",
    comment: "Substantial knit that does not pill easily. Perfect weight for autumn and winter layering in air-conditioned offices.",
    date: "Oct 09, 2026",
    verifiedBuyer: true
  },
  {
    id: 107,
    productId: 4,
    orderId: null,
    userName: "Isabella Martinez",
    userEmail: "isabella@example.com",
    rating: 5,
    title: "Architectural drape",
    comment: "The high-waisted pleats create elongated leg lines. Wrinkle-resistant fabric that stays pristine after a long day.",
    date: "Oct 03, 2026",
    verifiedBuyer: true
  },
  {
    id: 108,
    productId: 5,
    orderId: null,
    userName: "Marcus Thorne",
    userEmail: "marcus@example.com",
    rating: 5,
    title: "Impeccable wool craftsmanship",
    comment: "Sharp lapels and natural shoulder drape. Exactly what I expected from a boutique atelier brand.",
    date: "Oct 06, 2026",
    verifiedBuyer: true
  },
  {
    id: 109,
    productId: 6,
    orderId: null,
    userName: "Julian K.",
    userEmail: "julian@example.com",
    rating: 5,
    title: "Subtle luster & breathable comfort",
    comment: "Softest cotton shirt I have ever owned. The hidden placket keeps the chest silhouette ultra-clean.",
    date: "Oct 04, 2026",
    verifiedBuyer: true
  },
  {
    id: 110,
    productId: 7,
    orderId: "LUNE-1050",
    userName: "Alexander Vance",
    userEmail: "alex@example.com",
    rating: 5,
    title: "Buttery smooth saddle leather",
    comment: "Hardware has an understated brushed gold finish that looks heirloom quality. Beautiful stitching throughout.",
    date: "Oct 12, 2026",
    verifiedBuyer: true
  },
  {
    id: 111,
    productId: 8,
    orderId: null,
    userName: "Genevieve Moreau",
    userEmail: "genevieve@example.com",
    rating: 5,
    title: "Warm amber acetate frame",
    comment: "Lightweight on the bridge of the nose with excellent UV shielding. Looks like high-end vintage eyewear.",
    date: "Oct 07, 2026",
    verifiedBuyer: true
>>>>>>> dd6537150711d01c057db8227186955ea585ccac
  }
];

export function ShopProvider({ children }) {
  // 1. PRODUCTS STATE
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('lune_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Đồng bộ (merge) các trường mới thêm (như garmentType, stock) từ initialProducts vào localStorage
          return parsed.map(localProd => {
            const initialProd = initialProducts.find(p => p.id === localProd.id);
            return initialProd 
              ? { ...initialProd, ...localProd, stock: localProd.stock !== undefined ? Number(localProd.stock) : (initialProd.stock ?? 20) } 
              : { stock: 20, ...localProd };
          });
        }
      }
    } catch (e) {
      console.error("Error reading lune_products:", e);
    }
    return initialProducts;
  });

  // 2. CART STATE
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('lune_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // 3. WISHLIST STATE (Synchronized with Current User)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const savedUser = localStorage.getItem('lune_current_user');
      const user = savedUser ? JSON.parse(savedUser) : null;
      if (user) {
        const userWishlist = localStorage.getItem(`lune_wishlist_${user.email}`);
        if (userWishlist) return JSON.parse(userWishlist);
      }
      const saved = localStorage.getItem('lune_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Wishlist Floating Toast State (Non-blocking notification)
  const [wishlistToast, setWishlistToast] = useState({
    show: false,
    isAdded: true,
    productName: '',
    message: ''
  });

  const showWishlistToast = (isAdded, productName = '', message = '') => {
    setWishlistToast({
      show: true,
      isAdded,
      productName,
      message
    });
  };

  const closeWishlistToast = () => {
    setWishlistToast(prev => ({ ...prev, show: false }));
  };

  // Auto-dismiss toast after 3.5 seconds
  useEffect(() => {
    if (wishlistToast.show) {
      const timer = setTimeout(() => {
        closeWishlistToast();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [wishlistToast.show]);

  // 4. ORDERS STATE
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('lune_orders');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Error reading lune_orders:", e);
    }
    return sampleOrders;
  });

  const [vouchers, setVouchers] = useState(() => {
    try {
      const saved = localStorage.getItem('lune_vouchers');
      return saved ? JSON.parse(saved) : sampleVouchers;
    } catch {
      return sampleVouchers;
    }
  });

  // 5. USERS & CURRENT USER STATE
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('lune_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Error reading lune_users:", e);
    }
    return sampleUsers;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('lune_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  // 6. UI STATE - CART DRAWER
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 7. REVIEWS STATE (WARM LUXURY REVIEWS)
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = localStorage.getItem('lune_reviews');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error("Error reading lune_reviews:", e);
    }
    return sampleReviews;
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem('lune_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('lune_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(`lune_wishlist_${currentUser.email}`, JSON.stringify(wishlist));
    }
    localStorage.setItem('lune_wishlist', JSON.stringify(wishlist));
  }, [wishlist, currentUser]);

  useEffect(() => {
    localStorage.setItem('lune_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('lune_vouchers', JSON.stringify(vouchers));
  }, [vouchers]);

  useEffect(() => {
    localStorage.setItem('lune_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('lune_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('lune_current_user', JSON.stringify(currentUser));
      // Load user-specific wishlist
      try {
        const userWishlist = localStorage.getItem(`lune_wishlist_${currentUser.email}`);
        if (userWishlist) {
          setWishlist(JSON.parse(userWishlist));
        }
      } catch (e) {}
    } else {
      localStorage.removeItem('lune_current_user');
    }
  }, [currentUser]);

  // ================= CART ACTIONS =================
  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);
  const toggleCart = () => setIsCartOpen(prev => !prev);

  const addToCart = (product, selectedSize = "M", selectedColor = "", quantity = 1) => {
    setCart(prevCart => {
      // Find if item with same id, size, and color already exists
      const existingIndex = prevCart.findIndex(item => 
        item.id === product.id && 
        item.selectedSize === selectedSize && 
        item.selectedColor === selectedColor
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem = {
          cartItemId: `${product.id}-${selectedSize}-${selectedColor}-${Date.now()}`,
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          selectedSize: selectedSize || (product.sizes && product.sizes[0]) || "Standard",
          selectedColor: selectedColor || (product.colors && product.colors[0]) || "Default",
          quantity: quantity
        };
        return [newItem, ...prevCart];
      }
    });
    // Open drawer to delight user
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => (item.cartItemId || item.id) !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev => prev.map(item => 
      (item.cartItemId || item.id) === cartItemId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // ================= WISHLIST ACTIONS (Instant 1-Click Toggle) =================
  const toggleWishlist = (product) => {
    if (!product || !product.id) return false;

    let willBeAdded = false;
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        willBeAdded = false;
        return prev.filter(item => item.id !== product.id);
      } else {
        willBeAdded = true;
        return [product, ...prev];
      }
    });

    // Provide friendly non-blocking toast
    const isAdding = !wishlist.some(item => item.id === product.id);
    showWishlistToast(
      isAdding,
      product.name,
      isAdding 
        ? (currentUser ? "Saved to your personal wardrobe lookbook." : "Saved to your lookbook. Sign in anytime to sync across devices.")
        : "Removed from your saved lookbook."
    );

    return true;
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const removeFromWishlist = (productId) => {
    setWishlist(prev => prev.filter(item => item.id !== productId));
  };

  // ================= ORDER ACTIONS (CRUD) =================
  const addOrder = (orderData) => {
    const newOrderId = orderData.id || `LUNE-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: newOrderId,
      createdAt: orderData.createdAt || new Date().toISOString(),
      status: orderData.status || "Pending",
      paymentMethod: orderData.paymentMethod || "Cash on Delivery",
      ...orderData
    };

    // Tự động trừ tồn kho (Auto-deduct stock) theo số lượng đã mua
    if (Array.isArray(orderData.items) && orderData.items.length > 0) {
      setProducts(prevProds => prevProds.map(prod => {
        const boughtItem = orderData.items.find(item => item.id === prod.id);
        if (boughtItem) {
          const currentStock = prod.stock !== undefined ? Number(prod.stock) : 20;
          const newStock = Math.max(0, currentStock - (boughtItem.quantity || 1));
          return { ...prod, stock: newStock };
        }
        return prod;
      }));
    }

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    const targetOrder = orders.find(o => o.id === orderId);

    // Nếu chuyển sang trạng thái Cancelled và đơn chưa từng bị Cancelled: tự động hoàn trả số lượng vào kho
    if (newStatus === 'Cancelled' && targetOrder && targetOrder.status !== 'Cancelled') {
      if (Array.isArray(targetOrder.items) && targetOrder.items.length > 0) {
        setProducts(prevProds => prevProds.map(prod => {
          const cancelledItem = targetOrder.items.find(item => item.id === prod.id);
          if (cancelledItem) {
            const currentStock = prod.stock !== undefined ? Number(prod.stock) : 0;
            return { ...prod, stock: currentStock + (cancelledItem.quantity || 1) };
          }
          return prod;
        }));
      }
    }

    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const updateOrder = (orderId, updatedFields) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, ...updatedFields } : order
    ));
  };

  const deleteOrder = (orderId) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
  };

  // ================= PRODUCT CRUD ACTIONS (ADMIN) =================
  const addProduct = (newProduct) => {
    const created = {
      ...newProduct,
      id: Date.now(),
      price: Number(newProduct.price) || 0,
      stock: Number(newProduct.stock) >= 0 ? Number(newProduct.stock) : 20,
      isNew: newProduct.isNew !== undefined ? newProduct.isNew : true,
      colors: Array.isArray(newProduct.colors) ? newProduct.colors : ["#000000"],
      sizes: Array.isArray(newProduct.sizes) ? newProduct.sizes : ["S", "M", "L"]
    };
    setProducts(prev => [created, ...prev]);
    return created;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(prod => {
      if (prod.id === id) {
        return {
          ...prod,
          ...updatedFields,
          price: updatedFields.price !== undefined ? Number(updatedFields.price) : prod.price,
          stock: updatedFields.stock !== undefined ? Number(updatedFields.stock) : (prod.stock ?? 20)
        };
      }
      return prod;
    }));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(prod => prod.id !== id));
  };

<<<<<<< HEAD
  // ================= VOUCHER ACTIONS (ADMIN) =================
  const addVoucher = (voucherData) => {
    const created = {
      ...voucherData,
      id: `voucher-${Date.now()}`,
      code: voucherData.code.trim().toUpperCase(),
      discountValue: Number(voucherData.discountValue),
      minSubtotal: Number(voucherData.minSubtotal) || 0,
      isActive: true
    };
    setVouchers(prev => [created, ...prev]);
    return created;
  };

  const toggleVoucher = (id) => {
    setVouchers(prev => prev.map(voucher =>
      voucher.id === id ? { ...voucher, isActive: !voucher.isActive } : voucher
    ));
  };

  const deleteVoucher = (id) => {
    setVouchers(prev => prev.filter(voucher => voucher.id !== id));
  };

  // ================= AUTH / USER ACTIONS =================
  const login = (email, password) => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
=======
  // ================= REVIEWS & RATINGS ACTIONS =================
  const addReview = (reviewData) => {
    const newReview = {
      ...reviewData,
      id: Date.now(),
      productId: Number(reviewData.productId),
      rating: Number(reviewData.rating) || 5,
      date: reviewData.date || new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      verifiedBuyer: reviewData.verifiedBuyer !== undefined ? reviewData.verifiedBuyer : true
    };

    setReviews(prev => [newReview, ...prev]);
    return newReview;
  };

  const getProductReviews = (productId) => {
    return reviews.filter(r => Number(r.productId) === Number(productId));
  };

  const getProductRatingStats = (productId) => {
    const prodReviews = reviews.filter(r => Number(r.productId) === Number(productId));
    if (prodReviews.length === 0) {
      return {
        averageRating: 5.0,
        totalReviews: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
        percentages: { 5: 100, 4: 0, 3: 0, 2: 0, 1: 0 }
      };
    }

    const sum = prodReviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0);
    const averageRating = Number((sum / prodReviews.length).toFixed(1));

    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    prodReviews.forEach(r => {
      const star = Math.min(5, Math.max(1, Math.round(Number(r.rating) || 5)));
      distribution[star] = (distribution[star] || 0) + 1;
    });

    const percentages = {};
    for (let i = 1; i <= 5; i++) {
      percentages[i] = Math.round((distribution[i] / prodReviews.length) * 100);
    }

    return {
      averageRating,
      totalReviews: prodReviews.length,
      distribution,
      percentages
    };
  };

  // ================= AUTH / USER ACTIONS (CRUD) =================
  const login = (identifier, password) => {
    const identNorm = (identifier || '').toLowerCase().trim();
    const user = users.find(u => {
      const emailMatch = (u.email || '').toLowerCase() === identNorm;
      const usernameMatch = (u.username || '').toLowerCase() === identNorm;
      if (!emailMatch && !usernameMatch) return false;

      if (u.password === password) return true;
      // Admin demo fallback
      if ((identNorm === 'admin@lune.com' || identNorm === 'admin') && (password === 'admin123' || password === 'Admin@123')) {
        return true;
      }
      // Customer demo fallback
      if ((identNorm === 'customer@lune.com' || identNorm === 'user') && (password === 'user123' || password === 'Password@123')) {
        return true;
      }
      return false;
    });

>>>>>>> dd6537150711d01c057db8227186955ea585ccac
    if (user) {
      setCurrentUser(user);

      // Smart Auto-Merge: Merge guest items into user's account wishlist
      try {
        const guestWishlistRaw = localStorage.getItem('lune_wishlist');
        const guestItems = guestWishlistRaw ? JSON.parse(guestWishlistRaw) : [];
        const userWishlistRaw = localStorage.getItem(`lune_wishlist_${user.email}`);
        const userItems = userWishlistRaw ? JSON.parse(userWishlistRaw) : [];

        const mergedMap = new Map();
        [...guestItems, ...userItems].forEach(item => {
          if (item && item.id) mergedMap.set(item.id, item);
        });
        const mergedList = Array.from(mergedMap.values());

        setWishlist(mergedList);
        localStorage.setItem(`lune_wishlist_${user.email}`, JSON.stringify(mergedList));
        localStorage.setItem('lune_wishlist', JSON.stringify(mergedList));
      } catch (e) {
        console.error("Error auto-merging wishlist on login:", e);
      }

      return { success: true, user };
    }
    return { success: false, message: "Invalid email/username or password" };
  };

  const logout = () => {
    setCurrentUser(null);
    setWishlist([]);
    localStorage.removeItem('lune_wishlist');
  };

  const register = (userData) => {
    const emailNorm = (userData.email || '').toLowerCase().trim();
    const usernameNorm = (userData.username || '').toLowerCase().trim();

    const emailExists = users.some(u => (u.email || '').toLowerCase() === emailNorm);
    if (emailExists) {
      return { success: false, message: "Email is already registered" };
    }

    if (usernameNorm) {
      const usernameExists = users.some(u => (u.username || '').toLowerCase() === usernameNorm);
      if (usernameExists) {
        return { success: false, message: "Username is already taken" };
      }
    }

    const newUser = {
      id: userData.id || `user-${Date.now()}`,
      name: userData.name || userData.fullName || "Valued Client",
      email: userData.email,
      username: userData.username || emailNorm.split('@')[0],
      password: userData.password,
      role: userData.role || "user",
      phone: userData.phone || "",
      address: userData.address || "",
      createdAt: userData.createdAt || new Date().toISOString()
    };

    setUsers(prev => [...prev, newUser]);
    return { success: true, user: newUser };
  };

  const addUser = (userData) => {
    return register(userData);
  };

  const updateUser = (userId, updatedFields) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        const updated = { ...u, ...updatedFields };
        // If current user is being updated, sync currentUser state
        if (currentUser && currentUser.id === userId) {
          setCurrentUser(updated);
        }
        return updated;
      }
      return u;
    }));
    return { success: true };
  };

  const deleteUser = (userId) => {
    if (currentUser && currentUser.id === userId) {
      return { success: false, message: "Cannot delete the currently logged in account." };
    }
    setUsers(prev => prev.filter(u => u.id !== userId));
    return { success: true };
  };

  const updateProfile = (updatedFields) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedFields };
    setCurrentUser(updated);
    setUsers(prev => prev.map(u => u.id === updated.id ? updated : u));
    return { success: true };
  };

  const changePassword = (userId, oldPassword, newPassword) => {
    const targetUser = users.find(u => u.id === userId);
    if (!targetUser) {
      return { success: false, message: "User not found." };
    }

    // Verify old password
    const isOldCorrect = targetUser.password === oldPassword ||
      (targetUser.role === 'admin' && (oldPassword === 'admin123' || oldPassword === 'Admin@123')) ||
      (targetUser.role === 'user' && (oldPassword === 'user123' || oldPassword === 'Password@123'));

    if (!isOldCorrect) {
      return { success: false, message: "Current password does not match." };
    }

    const updatedUser = { ...targetUser, password: newPassword };
    setUsers(prev => prev.map(u => u.id === userId ? updatedUser : u));
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(updatedUser);
    }
    return { success: true, message: "Password updated successfully!" };
  };

  return (
    <ShopContext.Provider value={{
      // State
      products,
      cart,
      wishlist,
      orders,
      vouchers,
      users,
      currentUser,
      isCartOpen,
      cartCount,
      cartTotal,

      // UI
      openCart,
      closeCart,
      toggleCart,

      // Cart actions
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,

      // Wishlist actions
      toggleWishlist,
      isInWishlist,
      removeFromWishlist,
      wishlistToast,
      showWishlistToast,
      closeWishlistToast,

      // Order actions
      addOrder,
      updateOrderStatus,
      updateOrder,
      deleteOrder,

      // Product CRUD
      addProduct,
      updateProduct,
      deleteProduct,

<<<<<<< HEAD
      // Voucher management
      addVoucher,
      toggleVoucher,
      deleteVoucher,

      // Auth actions
=======
      // Reviews & Ratings
      reviews,
      addReview,
      getProductReviews,
      getProductRatingStats,

      // Auth & User CRUD actions
>>>>>>> dd6537150711d01c057db8227186955ea585ccac
      login,
      logout,
      register,
      addUser,
      updateUser,
      deleteUser,
      updateProfile,
      changePassword
    }}>
      {children}
    </ShopContext.Provider>
  );
}

// Custom Hook to consume shop context conveniently
export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
