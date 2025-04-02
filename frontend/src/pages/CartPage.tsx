import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { CartItem } from '../types/CartItem';
import WelcomeBand from '../components/WelcomeBand';

function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();
  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <WelcomeBand />
      <div>
        <h2>Your Cart</h2>
        <div>
          {cart.length === 0 ? (
            <p>Your Cart is empty.</p>
          ) : (
            <ul>
              {cart.map((item: CartItem) => (
                <li key={item.bookId}>
                  {item.title} Quantity: {item.quantity} Subtotal: $
                  {item.price.toFixed(2)}
                  <button
                    onClick={() => removeFromCart(item.bookId)}
                    className="btn"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <h3>Total: ${totalAmount.toFixed(2)}</h3>
        <div className="container">
          <div className="row">
            <div className="col-6">
              <button className="btn btn-light" onClick={() => navigate('/')}>
                Continue Browsing
              </button>
            </div>
            <div className="col-2"></div>
            <div className="col-4">
              <button className="btn btn-success">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CartPage;
