import React from 'react';

const Header = () => {
  return (
    <header style={headerStyle}>
      <div style={logoContainerStyle}>
        <img src="" alt="Logo" style={logoStyle} />
      </div>
    </header>
  );
};

const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#f0f0f0',
  };
  
  const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
  };
  
  const logoStyle = {
    width: '50px',
    height: 'auto',
    marginRight: '10px',
  };

  
export default Header;