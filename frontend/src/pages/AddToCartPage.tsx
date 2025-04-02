import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import WelcomeBand from '../components/WelcomeBand';

function AddToCartPage() {
  const navigate = useNavigate();
  const { title, bookId, price } = useParams();
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const newItem: CartItem = {
      bookId: Number(bookId),
      title: title || 'No Book Found',
      price: Number(price),
      quantity: 1,
    };
    addToCart(newItem);
    navigate('/cart');
  };
  return (
    <>
      <WelcomeBand />
      <h2>Adding {title} to Cart</h2>
      <h5>${Number(price).toFixed(2)}</h5>
      <div className="container">
        <div className="row">
          <div className="col-4">
            <button className="btn btn-dark" onClick={() => navigate('/books')}>
              Go Back
            </button>
          </div>
          <div className="col-4"></div>
          <div className="col-4">
            <button className="btn btn-success" onClick={handleAddToCart}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddToCartPage;
