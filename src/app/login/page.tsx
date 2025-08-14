"use client";
import React, { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: 'linear-gradient(135deg, #2563EB 0%, #1E3A5F 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      margin: 0,
    }}>
      <div style={{
        maxWidth: 420,
        width: '100%',
        background: 'rgba(255,255,255,0.98)',
        borderRadius: 18,
        boxShadow: '0 8px 32px rgba(37,99,235,0.15)',
        padding: '40px 32px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <h1 style={{
          fontSize: 32,
          fontWeight: 800,
          color: '#2563EB',
          marginBottom: 28,
          letterSpacing: 1,
        }}>Login</h1>
        <form style={{ width: '100%' }}>
          <div style={{ marginBottom: 22 }}>
            <label style={{ color: '#1E3A5F', fontWeight: 700, fontSize: 15 }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{
                width: '100%',
                padding: '13px',
                borderRadius: 8,
                border: '1.5px solid #C7D2FE',
                fontSize: 16,
                marginTop: 7,
                outline: 'none',
                background: '#F3F6FB',
                transition: 'border-color 0.2s',
                boxShadow: '0 1px 2px rgba(37,99,235,0.04)',
              }}
              onFocus={e => (e.target.style.borderColor = '#2563EB')}
              onBlur={e => (e.target.style.borderColor = '#C7D2FE')}
            />
          </div>
          <div style={{ marginBottom: 28 }}>
            <label style={{ color: '#1E3A5F', fontWeight: 700, fontSize: 15 }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '13px 44px 13px 13px',
                  borderRadius: 8,
                  border: '1.5px solid #C7D2FE',
                  fontSize: 16,
                  marginTop: 7,
                  outline: 'none',
                  background: '#F3F6FB',
                  transition: 'border-color 0.2s',
                  boxShadow: '0 1px 2px rgba(37,99,235,0.04)',
                }}
                onFocus={e => (e.target.style.borderColor = '#2563EB')}
                onBlur={e => (e.target.style.borderColor = '#C7D2FE')}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: 14,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                  fontSize: 15,
                  color: '#2563EB',
                  fontWeight: 600,
                  userSelect: 'none',
                  padding: '2px 8px',
                  borderRadius: 6,
                  background: '#E0E7FF',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#C7D2FE')}
                onMouseLeave={e => (e.currentTarget.style.background = '#E0E7FF')}
              >
                {showPassword ? 'Hide' : 'Show'}
              </span>
            </div>
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              background: 'linear-gradient(90deg, #2563EB 60%, #1E3A5F 100%)',
              color: '#fff',
              padding: '15px',
              border: 'none',
              borderRadius: 8,
              fontWeight: 800,
              fontSize: 17,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(37,99,235,0.10)',
              letterSpacing: 0.5,
              marginTop: 8,
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#1E40AF')}
            onMouseLeave={e => (e.currentTarget.style.background = 'linear-gradient(90deg, #2563EB 60%, #1E3A5F 100%)')}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
