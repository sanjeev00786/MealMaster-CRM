import React from 'react';

const Header = () => {
  return (
    <header style={headerStyle}>
      <div style={logoContainerStyle}>
        <img src={`${process.env.PUBLIC_URL}/Assets/Images/logo.svg`} alt="Logo" style={logoStyle} />
      </div>
    </header>
  );
};
// 
const headerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px 20px',
    backgroundColor: '#f0f0f0',
  };
  
  const logoContainerStyle = {
    display: 'flex',
    alignItems: 'center',
  };
  
  const logoStyle = {
    width: 'auto',
    height: 'auto',
    marginRight: '10px',
  };

  
export default Header;