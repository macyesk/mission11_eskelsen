import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import { CartItem } from '../types/CartItem';

function AddToCartPage() {
  const navigate = useNavigate();
  const { title, bookId, price } = useParams();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      title: title || 'No Book Found',
      price: Number(price),
    };
    addToCart(newItem);
    navigate('/cart');
  };
  return (
    <>
      <h2>Adding {title} to Cart</h2>
      <h5>${Number(price).toFixed(2)}</h5>
      <div>
        <button className="btn btn-dark" onClick={() => navigate('/books')}>
          Go Back
        </button>
        <button className="btn btn-success" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </>
  );
}

export default AddToCartPage;
