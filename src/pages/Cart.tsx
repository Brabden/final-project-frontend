import { useCartContext } from "../context/CartContext";
import "./Cart.css";
import { useState } from "react";

const Cart: React.FC = () => {
  const { cartItems, totalPrice, removeFromCart, clearCart } = useCartContext();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const isCartEmpty = cartItems.length === 0;

  return (
    <div className="cart-page">
      <h1 className="cart-title">review your cart</h1>
      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p>your cart is empty!</p>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image_url} alt={item.product} />
                <div className="cart-item-info">
                  <h3>{item.product}</h3>
                  <p>${item.price.toFixed(2)}</p>

                  <button
                    className="remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
                <div className="cart-item-total">
                  ${item.total_price.toFixed(2)}
                </div>
              </div>
            ))
          )}
        </div>
        <aside className="cart-summary">
          <h2>order details</h2>
          <div className="summary-row">
            <span>subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>

          <div className="summary-row muted">
            <span>taxes</span>
            <span>calculated at checkout</span>
          </div>
          <div className="summary-row muted">
            <span>shipping</span>
            <span>calculated at checkout</span>
          </div>

          <div className="summary-total">
            <span>total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <button
            className="checkout-btn"
            disabled={isCartEmpty}
            onClick={() => {
              if (!isCartEmpty) setShowCheckoutModal(true);
            }}
          >
            checkout
          </button>
        </aside>
      </div>
      {/* Modal */}
      {showCheckoutModal && (
        <div className="modal-backdrop">
          <div className="modal">
            {!orderPlaced ? (
              <>
                <h3>demo checkout</h3>
                <p>
                  this is a demo project. no real purchases are purchased. in a
                  sense all items are free!
                </p>
                <div className="modal-actions">
                  <button
                    className="secondary"
                    onClick={() => setShowCheckoutModal(false)}
                  >
                    cancel
                  </button>
                  <button
                    className="primary"
                    onClick={async () => {
                      await clearCart();
                      setOrderPlaced(true);
                    }}
                  >
                    place order
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3>order placed! 🎉</h3>
                <p>thank you for trying this demo checkout.</p>
                <button
                  className="primary"
                  onClick={() => {
                    setShowCheckoutModal(false);
                    setOrderPlaced(false);
                  }}
                >
                  close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
