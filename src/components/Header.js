
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const linkStyle = (path) => ({
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '0.95rem',
    padding: '0.6rem 1rem',
    borderRadius: '8px',
    transition: 'all 0.3s ease',
    backgroundColor: location.pathname === path ? 'rgba(255, 255, 255, 0.25)' : 'transparent',
    border: location.pathname === path ? '1px solid rgba(255, 255, 255, 0.4)' : '1px solid transparent',
    display: 'block',
    textAlign: 'center',
    whiteSpace: 'nowrap'
  });

  const mobileNavStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: '1rem',
    background: 'rgba(0, 0, 0, 0.1)',
    borderRadius: '12px',
    margin: '1rem 0.5rem 0 0.5rem'
  };

  const desktopNavStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '0.8rem',
    marginBottom: '1rem',
    flexWrap: 'wrap',
    padding: '0 1rem'
  };

  const hamburgerStyle = {
    display: 'none',
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '1.5rem',
    cursor: 'pointer',
    padding: '0.5rem',
    borderRadius: '4px',
    position: 'absolute',
    top: '1rem',
    right: '1rem',
    zIndex: 1000
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, #2e7d32, #388e3c, #1b5e20)',
    color: 'white',
    padding: '1rem 0',
    marginBottom: '1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    position: 'relative'
  };

  const titleStyle = {
    margin: '0',
    fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
    fontWeight: '700',
    textShadow: '0 2px 4px rgba(0,0,0,0.3)',
    lineHeight: '1.2'
  };

  const subtitleStyle = {
    margin: '0.5rem 0 0 0',
    fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
    opacity: '0.95',
    fontStyle: 'italic'
  };

  const handleMouseOver = (e) => {
    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    e.target.style.transform = 'translateY(-1px)';
  };

  const handleMouseOut = (e, path) => {
    e.target.style.backgroundColor = location.pathname === path ? 'rgba(255, 255, 255, 0.25)' : 'transparent';
    e.target.style.transform = 'translateY(0)';
  };

  return (
    <>
      <style>
        {`
          @media (max-width: 768px) {
            .desktop-nav {
              display: none !important;
            }
            .mobile-hamburger {
              display: block !important;
            }
            .mobile-nav {
              display: ${isMobileMenuOpen ? 'flex' : 'none'} !important;
            }
          }
          @media (min-width: 769px) {
            .mobile-hamburger {
              display: none !important;
            }
            .mobile-nav {
              display: none !important;
            }
          }
        `}
      </style>
      <header style={headerStyle}>
        <button 
          className="mobile-hamburger"
          style={hamburgerStyle}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" style={desktopNavStyle}>
          <Link 
            to="/" 
            style={linkStyle('/')}
            onMouseOver={handleMouseOver}
            onMouseOut={(e) => handleMouseOut(e, '/')}
          >
            🏠 Home
          </Link>
          <Link 
            to="/gallery" 
            style={linkStyle('/gallery')}
            onMouseOver={handleMouseOver}
            onMouseOut={(e) => handleMouseOut(e, '/gallery')}
          >
            🖼️ Gallery
          </Link>
          <Link 
            to="/favorites" 
            style={linkStyle('/favorites')}
            onMouseOver={handleMouseOver}
            onMouseOut={(e) => handleMouseOut(e, '/favorites')}
          >
            ❤️ Favorites
          </Link>
          <Link 
            to="/compare" 
            style={linkStyle('/compare')}
            onMouseOver={handleMouseOver}
            onMouseOut={(e) => handleMouseOut(e, '/compare')}
          >
            ⚖️ Compare
          </Link>
          <Link 
            to="/discovery" 
            style={linkStyle('/discovery')}
            onMouseOver={handleMouseOver}
            onMouseOut={(e) => handleMouseOut(e, '/discovery')}
          >
            🎲 Surprise
          </Link>
          <Link 
            to="/about" 
            style={linkStyle('/about')}
            onMouseOver={handleMouseOver}
            onMouseOut={(e) => handleMouseOut(e, '/about')}
          >
            ℹ️ About
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <nav className="mobile-nav" style={mobileNavStyle}>
          <Link 
            to="/" 
            style={linkStyle('/')}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            🏠 Home
          </Link>
          <Link 
            to="/gallery" 
            style={linkStyle('/gallery')}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            🖼️ Gallery
          </Link>
          <Link 
            to="/favorites" 
            style={linkStyle('/favorites')}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ❤️ Favorites
          </Link>
          <Link 
            to="/compare" 
            style={linkStyle('/compare')}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ⚖️ Compare
          </Link>
          <Link 
            to="/discovery" 
            style={linkStyle('/discovery')}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            🎲 Surprise
          </Link>
          <Link 
            to="/about" 
            style={linkStyle('/about')}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            ℹ️ About
          </Link>
        </nav>

        <div style={{ textAlign: 'center', padding: '0 1rem' }}>
          <h1 style={titleStyle}>
            🌿 Kerala BioDiversity 🦎
          </h1>
          <p style={subtitleStyle}>
            Explore Plants & Animals of God's Own Country
          </p>
        </div>
      </header>
    </>
  );
}

export default Header;
