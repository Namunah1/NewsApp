import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import './App.css';

const App = () => {
  const [category, setCategory] = useState('general');

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
  };

  return (
    <div className="app-container">
      <Navbar onCategoryChange={handleCategoryChange} activeCategory={category} />
      <div className="main-content">
        <News key={category} category={category} />
      </div>
    </div>
  );
};

export default App;

