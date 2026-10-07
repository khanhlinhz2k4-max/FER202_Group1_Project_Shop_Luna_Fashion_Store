import React from 'react';
import { X } from 'lucide-react';

/**
 * SizeGuideModal Component
 * Phụ trách: Thành viên 3 (Trải nghiệm sản phẩm)
 */
export default function SizeGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(4px)'
    }} onClick={onClose}>
      <div style={{
        backgroundColor: '#fff',
        maxWidth: '560px',
        width: '90%',
        padding: '30px',
        borderRadius: '4px',
        position: 'relative'
      }} onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>
        <h3 style={{ margin: '0 0 16px', fontSize: '1.2rem', letterSpacing: '0.05em' }}>LUNE SIZE GUIDE (CM)</h3>
        <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '20px' }}>
          Measurements are based on body circumference. Choose your regular size for an authentic tailored fit.
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #775B3F', backgroundColor: '#F5EFE6' }}>
              <th style={{ padding: '8px' }}>Size</th>
              <th style={{ padding: '8px' }}>Bust</th>
              <th style={{ padding: '8px' }}>Waist</th>
              <th style={{ padding: '8px' }}>Hips</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #E7E5E4' }}>
              <td style={{ padding: '8px', fontWeight: 600 }}>XS</td>
              <td style={{ padding: '8px' }}>78 - 82</td>
              <td style={{ padding: '8px' }}>60 - 64</td>
              <td style={{ padding: '8px' }}>86 - 90</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E7E5E4' }}>
              <td style={{ padding: '8px', fontWeight: 600 }}>S</td>
              <td style={{ padding: '8px' }}>82 - 86</td>
              <td style={{ padding: '8px' }}>64 - 68</td>
              <td style={{ padding: '8px' }}>90 - 94</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E7E5E4' }}>
              <td style={{ padding: '8px', fontWeight: 600 }}>M</td>
              <td style={{ padding: '8px' }}>86 - 90</td>
              <td style={{ padding: '8px' }}>68 - 72</td>
              <td style={{ padding: '8px' }}>94 - 98</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E7E5E4' }}>
              <td style={{ padding: '8px', fontWeight: 600 }}>L</td>
              <td style={{ padding: '8px' }}>90 - 96</td>
              <td style={{ padding: '8px' }}>72 - 78</td>
              <td style={{ padding: '8px' }}>98 - 104</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
