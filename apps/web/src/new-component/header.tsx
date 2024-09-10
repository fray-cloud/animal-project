import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="navbar bg-base-300 h-16 flex justify-between items-center p-4">
      <div className="text-xl font-bold">My App</div>
      <div className="space-x-4">
        <button className="btn">Login</button>
        <button className="btn btn-primary">Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
