import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  ShieldCheck,
  RefreshCw,
  Truck,
  ChevronRight,
  Minus,
  Plus
} from 'lucide-react';

import { useShop } from '../context/ShopContext';
import SizeGuideModal from '../components/SizeGuideModal';

export default function ProductDetailPage() {
  const { id } = useParams();

  const {
    products,
    addToCart,
    toggleWishlist,
    isInWishlist
  } = useShop();

  const product = useMemo(() => {
    return products.find(
      (item) => String(item.id) === String(id)
    );
  }, [products, id]);

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  // Set default values whenever product changes
  useEffect(() => {
    if (!product) return;

    setSelectedSize(
      product.sizes?.length
        ? product.sizes[0]
        : 'M'
    );

    setSelectedColor(
      product.colors?.length
        ? product.colors[0]
        : ''
    );

    setQuantity(1);
    setActiveImageIndex(0);
    setActiveTab('description');
  }, [product]);

  // Product not found
  if (!product) {
    return (
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '100px 24px',
          textAlign: 'center'
        }}
      >
        <h1
          style={{
            fontFamily: 'serif',
            fontSize: '2rem',
            fontWeight: 500
          }}
        >
          PRODUCT NOT FOUND
        </h1>

        <p
          style={{
            color: '#78716C',
            marginBottom: '24px'
          }}
        >
          The product you are looking for does not exist.
        </p>

        <Link
          to="/shop"
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#775B3F',
            color: '#fff',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: 600
          }}
        >
          BACK TO SHOP
        </Link>
      </div>
    );
  }

  const allImages = [
    product.image,
    product.secondaryImage,
    ...(product.images || [])
  ].filter(Boolean);

  const isFavorited = isInWishlist(product.id);
  const stock = product.stock !== undefined ? product.stock : 20;

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    if (stock > 0) {
      setQuantity((current) => Math.min(stock, current + 1));
    }
  };

  const handleAddToCart = () => {
    if (stock <= 0) return;
    addToCart(
      product,
      selectedSize || product.sizes?.[0] || 'M',
      selectedColor || product.colors?.[0] || '',
      quantity
    );
  };

  const handleWishlist = () => {
    toggleWishlist(product);
  };

  return (
    <>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '24px'
        }}
      >

        {/* ================= BREADCRUMB ================= */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.78rem',
            color: '#78716C',
            marginBottom: '32px'
          }}
        >
          <Link
            to="/"
            style={{
              color: '#78716C',
              textDecoration: 'none'
            }}
          >
            Home
          </Link>

          <ChevronRight size={14} />

          <Link
            to="/shop"
            style={{
              color: '#78716C',
              textDecoration: 'none'
            }}
          >
            Shop
          </Link>

          <ChevronRight size={14} />

          <span style={{ color: '#1C1917' }}>
            {product.name}
          </span>
        </div>


        {/* ================= PRODUCT AREA ================= */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'minmax(0, 1.05fr) minmax(0, 0.95fr)',
            gap: '50px',
            alignItems: 'start'
          }}
        >

          {/* ================= IMAGE GALLERY ================= */}
          <div>
            <div
              style={{
                width: '100%',
                aspectRatio: '4 / 5',
                backgroundColor: '#EDE8E1',
                overflow: 'hidden',
                marginBottom: '12px'
              }}
            >
              <img
                src={allImages[activeImageIndex]}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block'
                }}
              />
            </div>

            {allImages.length > 1 && (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    'repeat(4, 1fr)',
                  gap: '10px'
                }}
              >
                {allImages.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() =>
                      setActiveImageIndex(index)
                    }
                    style={{
                      padding: 0,
                      border:
                        activeImageIndex === index
                          ? '2px solid #775B3F'
                          : '1px solid #E7E5E4',
                      backgroundColor: '#EDE8E1',
                      cursor: 'pointer',
                      aspectRatio: '1 / 1',
                      overflow: 'hidden'
                    }}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>


          {/* ================= PRODUCT INFORMATION ================= */}
          <div>

            <div
              style={{
                color: '#A16207',
                fontSize: '0.75rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginBottom: '10px'
              }}
            >
              {product.category}
            </div>

            <h1
              style={{
                fontFamily: 'serif',
                fontSize: '2.2rem',
                fontWeight: 500,
                lineHeight: 1.15,
                margin: '0 0 14px'
              }}
            >
              {product.name}
            </h1>

            <div
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                marginBottom: '20px'
              }}
            >
              <span
                style={{
                  fontSize: '1.15rem',
                  fontWeight: 600
                }}
              >
                ${Number(product.price).toFixed(2)}
              </span>

              {product.originalPrice && (
                <span
                  style={{
                    color: '#A8A29E',
                    textDecoration: 'line-through'
                  }}
                >
                  ${Number(product.originalPrice).toFixed(2)}
                </span>
              )}
            </div>

            <p
              style={{
                color: '#57534E',
                lineHeight: 1.7,
                fontSize: '0.92rem',
                marginBottom: '28px'
              }}
            >
              {product.description}
            </p>

            <div
              style={{
                height: '1px',
                backgroundColor: '#E7E5E4',
                marginBottom: '24px'
              }}
            />


            {/* ================= COLOR ================= */}
            {product.colors?.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <div
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    marginBottom: '12px'
                  }}
                >
                  COLOR
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: '12px'
                  }}
                >
                  {product.colors.map((color, index) => (
                    <button
                      key={`${color}-${index}`}
                      type="button"
                      onClick={() =>
                        setSelectedColor(color)
                      }
                      aria-label={`Color ${index + 1}`}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        backgroundColor: color,
                        border:
                          selectedColor === color
                            ? '2px solid #775B3F'
                            : '1px solid #D6D3D1',
                        boxShadow:
                          selectedColor === color
                            ? '0 0 0 2px white, 0 0 0 3px #775B3F'
                            : 'none',
                        cursor: 'pointer'
                      }}
                    />
                  ))}
                </div>
              </div>
            )}


            {/* ================= SIZE ================= */}
            {product.sizes?.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '12px'
                  }}
                >
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      letterSpacing: '0.08em'
                    }}
                  >
                    SIZE
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setIsSizeGuideOpen(true)
                    }
                    style={{
                      border: 'none',
                      background: 'none',
                      textDecoration: 'underline',
                      cursor: 'pointer',
                      color: '#78716C',
                      fontSize: '0.75rem'
                    }}
                  >
                    Size Guide
                  </button>
                </div>

                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap'
                  }}
                >
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() =>
                        setSelectedSize(size)
                      }
                      style={{
                        minWidth: '48px',
                        padding: '11px 14px',
                        backgroundColor:
                          selectedSize === size
                            ? '#775B3F'
                            : '#fff',
                        color:
                          selectedSize === size
                            ? '#fff'
                            : '#2C2117',
                        border:
                          selectedSize === size
                            ? '1px solid #775B3F'
                            : '1px solid #D6D3D1',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}


            {/* ================= STOCK STATUS ================= */}
            <div style={{ marginBottom: '20px' }}>
              {stock === 0 ? (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    backgroundColor: '#FEE2E2',
                    color: '#991B1B',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em'
                  }}
                >
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#DC2626' }} />
                  OUT OF STOCK
                </div>
              ) : stock <= 5 ? (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    backgroundColor: '#FEF3C7',
                    color: '#92400E',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em'
                  }}
                >
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#D97706' }} />
                  LOW STOCK: ONLY {stock} LEFT
                </div>
              ) : (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    backgroundColor: '#ECFDF5',
                    color: '#065F46',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em'
                  }}
                >
                  <span style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                  IN STOCK ({stock} units available)
                </div>
              )}
            </div>

            {/* ================= QUANTITY ================= */}
            <div style={{ marginBottom: '24px' }}>
              <div
                style={{
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  marginBottom: '12px'
                }}
              >
                QUANTITY
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  border: '1px solid #D6D3D1',
                  opacity: stock === 0 ? 0.5 : 1
                }}
              >
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1 || stock === 0}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: 'none',
                    background: '#fff',
                    cursor:
                      quantity <= 1 || stock === 0
                        ? 'not-allowed'
                        : 'pointer',
                    opacity:
                      quantity <= 1 || stock === 0 ? 0.4 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Minus size={15} />
                </button>

                <span
                  style={{
                    width: '42px',
                    textAlign: 'center'
                  }}
                >
                  {stock === 0 ? 0 : quantity}
                </span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={quantity >= stock || stock === 0}
                  style={{
                    width: '40px',
                    height: '40px',
                    border: 'none',
                    background: '#fff',
                    cursor:
                      quantity >= stock || stock === 0
                        ? 'not-allowed'
                        : 'pointer',
                    opacity:
                      quantity >= stock || stock === 0 ? 0.4 : 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Plus size={15} />
                </button>
              </div>
            </div>


            {/* ================= BUTTONS ================= */}
            <div
              style={{
                display: 'flex',
                gap: '10px',
                marginBottom: '28px'
              }}
            >
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={stock === 0}
                style={{
                  flex: 1,
                  minHeight: '50px',
                  border: 'none',
                  backgroundColor: stock === 0 ? '#A8A29E' : '#775B3F',
                  color: '#fff',
                  cursor: stock === 0 ? 'not-allowed' : 'pointer',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'background-color 0.2s ease',
                  opacity: stock === 0 ? 0.7 : 1
                }}
                onMouseEnter={(e) => {
                  if (stock > 0) e.currentTarget.style.backgroundColor = '#5C4A3A';
                }}
                onMouseLeave={(e) => {
                  if (stock > 0) e.currentTarget.style.backgroundColor = '#775B3F';
                }}
              >
                <ShoppingBag size={17} />
                {stock === 0 ? 'OUT OF STOCK' : 'ADD TO BAG'}
              </button>

              <button
                type="button"
                onClick={handleWishlist}
                style={{
                  width: '50px',
                  minHeight: '50px',
                  border: '1px solid #D6D3D1',
                  backgroundColor: '#fff',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Heart
                  size={19}
                  fill={
                    isFavorited
                      ? '#E11D48'
                      : 'none'
                  }
                  stroke={
                    isFavorited
                      ? '#E11D48'
                      : '#1C1917'
                  }
                />
              </button>
            </div>


            {/* ================= TRUST BADGES ================= */}
            <div
              style={{
                borderTop: '1px solid #E7E5E4',
                borderBottom: '1px solid #E7E5E4',
                padding: '20px 0',
                display: 'grid',
                gridTemplateColumns:
                  'repeat(3, 1fr)',
                gap: '12px'
              }}
            >
              <div
                style={{
                  textAlign: 'center'
                }}
              >
                <ShieldCheck
                  size={19}
                  strokeWidth={1.5}
                />
                <div
                  style={{
                    fontSize: '0.68rem',
                    color: '#57534E',
                    marginTop: '7px'
                  }}
                >
                  SECURE PAYMENT
                </div>
              </div>

              <div
                style={{
                  textAlign: 'center'
                }}
              >
                <RefreshCw
                  size={19}
                  strokeWidth={1.5}
                />
                <div
                  style={{
                    fontSize: '0.68rem',
                    color: '#57534E',
                    marginTop: '7px'
                  }}
                >
                  EASY RETURNS
                </div>
              </div>

              <div
                style={{
                  textAlign: 'center'
                }}
              >
                <Truck
                  size={19}
                  strokeWidth={1.5}
                />
                <div
                  style={{
                    fontSize: '0.68rem',
                    color: '#57534E',
                    marginTop: '7px'
                  }}
                >
                  FAST DELIVERY
                </div>
              </div>
            </div>

          </div>
        </div>


        {/* ================================================== */}
        {/* ================= PRODUCT TABS =================== */}
        {/* ================================================== */}

        <div
          style={{
            marginTop: '70px',
            borderTop: '1px solid #E7E5E4'
          }}
        >

          {/* TAB BUTTONS */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              borderBottom: '1px solid #E7E5E4',
              overflowX: 'auto'
            }}
          >

            <button
              type="button"
              onClick={() =>
                setActiveTab('description')
              }
              style={{
                padding: '18px 24px',
                border: 'none',
                borderBottom:
                  activeTab === 'description'
                    ? '2px solid #775B3F'
                    : '2px solid transparent',
                backgroundColor: '#fff',
                color:
                  activeTab === 'description'
                    ? '#775B3F'
                    : '#78716C',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 600,
                whiteSpace: 'nowrap'
              }}
            >
              DESCRIPTION & MATERIAL
            </button>


            <button
              type="button"
              onClick={() =>
                setActiveTab('care')
              }
              style={{
                padding: '18px 24px',
                border: 'none',
                borderBottom:
                  activeTab === 'care'
                    ? '2px solid #775B3F'
                    : '2px solid transparent',
                backgroundColor: '#fff',
                color:
                  activeTab === 'care'
                    ? '#775B3F'
                    : '#78716C',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 600,
                whiteSpace: 'nowrap'
              }}
            >
              CARE INSTRUCTIONS
            </button>


            <button
              type="button"
              onClick={() =>
                setActiveTab('shipping')
              }
              style={{
                padding: '18px 24px',
                border: 'none',
                borderBottom:
                  activeTab === 'shipping'
                    ? '2px solid #775B3F'
                    : '2px solid transparent',
                backgroundColor: '#fff',
                color:
                  activeTab === 'shipping'
                    ? '#775B3F'
                    : '#78716C',
                cursor: 'pointer',
                fontSize: '0.75rem',
                fontWeight: 600,
                whiteSpace: 'nowrap'
              }}
            >
              SHIPPING & DELIVERY
            </button>

          </div>


          {/* TAB CONTENT */}
          <div
            style={{
              maxWidth: '800px',
              margin: '0 auto',
              padding: '35px 20px 50px'
            }}
          >

            {activeTab === 'description' && (
              <div>
                <h2
                  style={{
                    fontFamily: 'serif',
                    fontSize: '1.35rem',
                    fontWeight: 500,
                    textAlign: 'center',
                    marginBottom: '15px'
                  }}
                >
                  DESCRIPTION & MATERIAL
                </h2>

                <p
                  style={{
                    color: '#57534E',
                    fontSize: '0.9rem',
                    lineHeight: 1.8,
                    textAlign: 'center',
                    margin: 0
                  }}
                >
                  {product.description}
                </p>

                <div
                  style={{
                    marginTop: '25px',
                    padding: '18px',
                    backgroundColor: '#F7F5F2',
                    textAlign: 'center'
                  }}
                >
                  <strong
                    style={{
                      display: 'block',
                      marginBottom: '6px'
                    }}
                  >
                    MATERIAL
                  </strong>

                  <span
                    style={{
                      color: '#57534E',
                      fontSize: '0.85rem'
                    }}
                  >
                    Premium materials selected for
                    comfort, quality and everyday wear.
                  </span>
                </div>
              </div>
            )}


            {activeTab === 'care' && (
              <div>
                <h2
                  style={{
                    fontFamily: 'serif',
                    fontSize: '1.35rem',
                    fontWeight: 500,
                    textAlign: 'center',
                    marginBottom: '15px'
                  }}
                >
                  CARE INSTRUCTIONS
                </h2>

                <p
                  style={{
                    color: '#57534E',
                    fontSize: '0.9rem',
                    lineHeight: 1.8,
                    textAlign: 'center',
                    margin: 0
                  }}
                >
                  To preserve the quality and appearance
                  of this piece, follow the recommended
                  care instructions for its fabric.
                </p>

                <div
                  style={{
                    marginTop: '25px',
                    padding: '20px',
                    backgroundColor: '#F7F5F2'
                  }}
                >
                  <p
                    style={{
                      margin: '0 0 10px',
                      color: '#57534E',
                      fontSize: '0.85rem'
                    }}
                  >
                    • Avoid excessive heat.
                  </p>

                  <p
                    style={{
                      margin: '0 0 10px',
                      color: '#57534E',
                      fontSize: '0.85rem'
                    }}
                  >
                    • Follow the garment's recommended
                    washing instructions.
                  </p>

                  <p
                    style={{
                      margin: 0,
                      color: '#57534E',
                      fontSize: '0.85rem'
                    }}
                  >
                    • Store in a dry and clean place.
                  </p>
                </div>
              </div>
            )}


            {activeTab === 'shipping' && (
              <div>
                <h2
                  style={{
                    fontFamily: 'serif',
                    fontSize: '1.35rem',
                    fontWeight: 500,
                    textAlign: 'center',
                    marginBottom: '15px'
                  }}
                >
                  SHIPPING & DELIVERY
                </h2>

                <p
                  style={{
                    color: '#57534E',
                    fontSize: '0.9rem',
                    lineHeight: 1.8,
                    textAlign: 'center',
                    margin: 0
                  }}
                >
                  Your order will be carefully packed
                  and prepared for delivery after checkout.
                </p>

                <div
                  style={{
                    marginTop: '25px',
                    padding: '20px',
                    backgroundColor: '#F7F5F2'
                  }}
                >
                  <p
                    style={{
                      margin: '0 0 10px',
                      color: '#57534E',
                      fontSize: '0.85rem'
                    }}
                  >
                    • Orders are carefully packed before
                    shipment.
                  </p>

                  <p
                    style={{
                      margin: '0 0 10px',
                      color: '#57534E',
                      fontSize: '0.85rem'
                    }}
                  >
                    • Delivery time depends on your
                    location.
                  </p>

                  <p
                    style={{
                      margin: 0,
                      color: '#57534E',
                      fontSize: '0.85rem'
                    }}
                  >
                    • Delivery information is provided
                    after your order is processed.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>


      {/* ================= SIZE GUIDE ================= */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() =>
          setIsSizeGuideOpen(false)
        }
      />
    </>
  );
}