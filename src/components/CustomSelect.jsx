import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check } from 'lucide-react';

/**
 * CustomSelect — Drop-in Luxury Dropdown replacement for native <select>
 * Avoids unstyled / oversized OS native <select> popups on mobile & desktop.
 */
export default function CustomSelect({
  value,
  onChange,
  className = '',
  style = {},
  disabled = false,
  children,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState({});
  const triggerRef = useRef(null);
  const menuRef = useRef(null);

  // Extract options from <option> children
  const options = React.Children.toArray(children)
    .filter((child) => React.isValidElement(child) && child.type === 'option')
    .map((child) => ({
      value: child.props.value,
      label: child.props.children,
      disabled: Boolean(child.props.disabled),
    }));

  const selectedOption =
    options.find((opt) => String(opt.value) === String(value)) || options[0] || { label: '', value: '' };

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const minWidth = Math.max(rect.width, 150);
    const maxWidth = Math.min(Math.max(rect.width, 280), viewportWidth - 24);
    let left = rect.left;
    if (left + minWidth > viewportWidth - 12) {
      left = Math.max(12, viewportWidth - minWidth - 12);
    }

    const spaceBelow = viewportHeight - rect.bottom - 12;
    const spaceAbove = rect.top - 12;
    const openUpward = spaceBelow < 180 && spaceAbove > spaceBelow;

    setMenuStyle({
      position: 'fixed',
      left: `${left}px`,
      width: `${rect.width}px`,
      minWidth: `${Math.min(minWidth, viewportWidth - 24)}px`,
      maxWidth: `${maxWidth}px`,
      ...(openUpward
        ? {
            bottom: `${viewportHeight - rect.top + 4}px`,
            maxHeight: `${Math.min(240, spaceAbove - 8)}px`,
          }
        : {
            top: `${rect.bottom + 4}px`,
            maxHeight: `${Math.min(240, Math.max(140, spaceBelow - 8))}px`,
          }),
      zIndex: 10050,
    });
  }, []);

  const handleToggle = () => {
    if (disabled) return;
    if (!isOpen) {
      updatePosition();
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleSelect = (opt) => {
    if (opt.disabled) return;
    if (onChange) {
      onChange({ target: { value: opt.value } });
    }
    setIsOpen(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target) &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    const handleScrollOrResize = (e) => {
      if (menuRef.current && menuRef.current.contains(e.target)) {
        return;
      }
      updatePosition();
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside, { passive: true });
    document.addEventListener('keydown', handleKeyDown);
    window.addEventListener('resize', handleScrollOrResize);
    window.addEventListener('scroll', handleScrollOrResize, true);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleScrollOrResize);
      window.removeEventListener('scroll', handleScrollOrResize, true);
    };
  }, [isOpen, updatePosition]);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        className={`lune-custom-select-trigger ${className}`.trim()}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          textAlign: 'left',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.65 : 1,
          userSelect: 'none',
          boxSizing: 'border-box',
          fontFamily: 'var(--font-sans)',
          ...style,
        }}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            flex: 1,
            minWidth: 0,
            lineHeight: 1.35,
          }}
        >
          {selectedOption.label}
        </span>
        <ChevronDown
          size={15}
          style={{
            flexShrink: 0,
            color: 'currentColor',
            opacity: 0.75,
            transition: 'transform 0.2s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            role="listbox"
            className="lune-custom-select-menu"
            style={{
              ...menuStyle,
              backgroundColor: '#FFFFFF',
              border: '1px solid #C8AE84',
              borderRadius: '6px',
              boxShadow: '0 10px 28px rgba(44, 33, 23, 0.16)',
              padding: '5px',
              overflowY: 'auto',
              boxSizing: 'border-box',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {options.map((opt, idx) => {
              const isSelected = String(opt.value) === String(value);
              return (
                <button
                  key={`${opt.value}-${idx}`}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  disabled={opt.disabled}
                  onClick={() => handleSelect(opt)}
                  className={`lune-custom-select-option ${isSelected ? 'selected' : ''}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '8px',
                    width: '100%',
                    padding: '8px 10px',
                    border: 'none',
                    borderRadius: '4px',
                    backgroundColor: isSelected ? '#F5EFEB' : 'transparent',
                    color: isSelected ? '#775B3F' : '#2C2117',
                    fontSize: '0.84rem',
                    fontWeight: isSelected ? 600 : 500,
                    fontFamily: 'var(--font-sans)',
                    textAlign: 'left',
                    cursor: opt.disabled ? 'not-allowed' : 'pointer',
                    transition: 'background-color 0.15s ease, color 0.15s ease',
                    boxSizing: 'border-box',
                  }}
                >
                  <span
                    style={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    {opt.label}
                  </span>
                  {isSelected && (
                    <Check size={14} color="#775B3F" style={{ flexShrink: 0 }} />
                  )}
                </button>
              );
            })}
          </div>,
          document.body
        )}
    </>
  );
}

