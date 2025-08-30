
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  const linkStyle = (path) => ({
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '0.95rem',
    padding: '0.4rem 0.8rem',
    borderRadius: '6px',
    transition: 'all 0.3s ease',
    backgroundColor: location.pathname === path ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
    border: location.pathname === path ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid transparent'
  });

  const handleMouseOver = (e) => {
    e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
    e.target.style.transform = 'translateY(-1px)';
  };

  const handleMouseOut = (e, path) => {
    e.target.style.backgroundColor = location.pathname === path ? 'rgba(255, 255, 255, 0.2)' : 'transparent';
    e.target.style.transform = 'translateY(0)';
  };

  return (
    <header style={{ 
      background: 'linear-gradient(135deg, #2e7d32, #388e3c, #1b5e20)', 
      color: 'white', 
      padding: '1rem 0', 
      marginBottom: '1rem',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '0.5rem',
        marginBottom: '1rem',
        flexWrap: 'wrap',
        padding: '0 1rem'
      }}>
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
      <div style={{ textAlign: 'center' }}>
        <h1 style={{ 
          margin: '0', 
          fontSize: '2.4rem', 
          fontWeight: '700',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          🌿 Kerala BioDiversity 🦎
        </h1>
        <p style={{ 
          margin: '0.5rem 0 0 0', 
          fontSize: '1.1rem', 
          opacity: '0.95',
          fontStyle: 'italic'
        }}>
          Explore Plants & Animals of God's Own Country
        </p>
      </div>
    </header>
  );
}

export default Header;
