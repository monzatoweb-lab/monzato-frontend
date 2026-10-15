import React from 'react';
import { CartProvider } from './context/CartContext';
import { MainLayout } from './components/MainLayout';

function App() {
  return (
    <CartProvider>
      <MainLayout />
    </CartProvider>
  );
}

export default App;
