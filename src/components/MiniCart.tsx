import { useCartContext } from "../context/CartContext";
import "./MiniCart.css";
import { X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const MiniCart: React.FC<Props> = ({ isOpen, onClose }) => {
  const { cartItems, totalPrice, updateQuantity } = useCartContext();

  if (!isOpen) return null;

  return (
    <div className="cart-overlay" onClick={onClose}>
      <aside className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>your cart</h2>
          <button className="close-btn" onClick={onClose}>
            <X />
          </button>
        </div>
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <>
              <div className="cart-empty-wrapper">
                <div className="cart-empty">
                  <p className="empty">your cart is empty</p>
                  <a href="/shop">
                    <button className="checkout-btn">continue shopping</button>
                  </a>
                </div>
                <div className="account-prompt">
                  <p className="account-question">have an account?</p>
                  <p className="login-prompt">
                    <a href="/login">log in</a> to checkout faster
                  </p>
                </div>
              </div>
            </>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-left">
                  <img
                    src={item.image_url}
                    alt={item.product}
                    className="cart-item-img"
                  />
                </div>
                <div className="cart-item-info">
                  <strong>{item.product}</strong>
                </div>
                <div className="cart-item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <div className="quantity-controls">
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    {" "}
                    -
                  </button>
                  <span className="qty">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <div className="total-row">
            <span>Total</span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>
          <button
            className="checkout-btn"
            disabled={cartItems.length === 0}
            onClick={() => {
              if (cartItems.length > 0) {
                window.location.href = "/cart";
              }
            }}
          >
            review order
          </button>
        </div>
      </aside>
    </div>
  );
};

export default MiniCart;
