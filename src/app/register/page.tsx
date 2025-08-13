'use client';
import React, { useState } from 'react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div
      style={{
        maxWidth: '400px',
        margin: '60px auto',
        padding: '32px',
        background: 'rgba(255,255,255,0.95)',
        borderRadius: '16px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
        backdropFilter: 'blur(8px)'
      }}
    >
      <h1
        style={{
          fontSize: '28px',
          fontWeight: 700,
          color: '#059669',
          marginBottom: '24px',
          textAlign: 'center'
        }}
      >
        Register
      </h1>

      <form>
        {/* Email */}
        <div style={{ marginBottom: '18px' }}>
          <label style={{ color: '#374151', fontWeight: 600 }}>Email</label>
          <input
            type="email"
            value={email}
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #D1D5DB',
              fontSize: '16px',
              marginTop: '6px',
              outline: 'none',
              transition: 'border-color 0.2s ease'
            }}
            onFocus={(e) => (e.target.style.borderColor = '#059669')}
            onBlur={(e) => (e.target.style.borderColor = '#D1D5DB')}
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: '18px' }}>
          <label style={{ color: '#374151', fontWeight: 600 }}>Password</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 40px 12px 12px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                fontSize: '16px',
                marginTop: '6px',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => (e.target.style.borderColor = '#059669')}
              onBlur={(e) => (e.target.style.borderColor = '#D1D5DB')}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#6B7280',
                userSelect: 'none'
              }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </span>
          </div>
        </div>

        {/* Confirm Password */}
        <div style={{ marginBottom: '24px' }}>
          <label style={{ color: '#374151', fontWeight: 600 }}>Confirm Password</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showConfirm ? 'text' : 'password'}
              value={confirm}
              placeholder="••••••••"
              onChange={(e) => setConfirm(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 40px 12px 12px',
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                fontSize: '16px',
                marginTop: '6px',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => (e.target.style.borderColor = '#059669')}
              onBlur={(e) => (e.target.style.borderColor = '#D1D5DB')}
            />
            <span
              onClick={() => setShowConfirm(!showConfirm)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#6B7280',
                userSelect: 'none'
              }}
            >
              {showConfirm ? 'Hide' : 'Show'}
            </span>
          </div>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          style={{
            width: '100%',
            background: '#059669',
            color: '#fff',
            padding: '14px',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#047857')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#059669')}
        >
          Register
        </button>
      </form>
    </div>
  );
}
