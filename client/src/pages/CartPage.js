import React, { useState, useEffect } from "react";
import Layout from "./../components/layout/Layout";
import "../Styles/Cartpage.css";
import { useCart } from "../context/cart";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // TOTAL PRICE
  const totalPrice = () => {
    let total = 0;
    cart?.forEach((item) => (total += item.price));
    return total.toLocaleString("en-IN", {
      style: "currency",
      currency: "INR",
    });
  };

  // REMOVE ITEM
  const removeCartItem = (pid) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === pid);
    myCart.splice(index, 1);
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
  };

  // GET TOKEN
  const getToken = async () => {
    try {
     const { data } = await axios.get(
  `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
);
      setClientToken(data?.clientToken);
    } catch (error) {
      toast.error("Failed to load payment token");
    }
  };

  useEffect(() => {
    if (auth?.token) getToken();
  }, [auth?.token]);

  // PAYMENT
  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();

      await axios.post("/api/v1/product/braintree/payment", {
        nonce,
        cart,
      });

      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      toast.success("Payment Successful");
      navigate("/dashboard/user/orders");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout title={"Cart"}>
      <div className="cart-page">

        {/* HERO */}
        <div className="cart-hero">
          <h1 className="cart-hero-greeting">
            Hello {auth?.user?.name || "Guest"}
          </h1>
          <p className={`cart-hero-subtext ${cart.length === 0 && "empty"}`}>
            {cart.length
              ? `You have ${cart.length} items in your cart`
              : "Your cart is empty"}
          </p>
        </div>

        <div className="cart-main-container">
          <div className="layout">

            {/* LEFT - ITEMS */}
            <div>
              <h4 className="cart-section-label">Cart Items</h4>

              {cart.length === 0 && (
                <div className="cart-empty-state">
                  <div className="cart-empty-icon">🛒</div>
                  <h3>Your cart is empty</h3>
                </div>
              )}

              {cart.map((p) => (
                <div className="cart-item-card" key={p._id}>

                  <div className="cart-item-img-wrap">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                      alt={p.name}
                    />
                  </div>

                  <div className="cart-item-info">
                    <h5 className="cart-item-name">{p.name}</h5>
                    <p className="cart-item-desc">
                      {p.description.substring(0, 50)}...
                    </p>
                    <p className="cart-item-price">₹ {p.price}</p>
                  </div>

                  <div className="cart-item-remove">
                    <button
                      className="btn-remove"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* RIGHT - SUMMARY */}
            <div className="cart-summary-panel">
              <h2 className="summary-title">Order Summary</h2>
              <p className="summary-subtitle">Checkout Details</p>

              <hr className="summary-divider" />

              <div className="summary-total-row">
                <span>Total</span>
                <span className="summary-total-value">{totalPrice()}</span>
              </div>

              <hr className="summary-divider" />

              {auth?.user?.address ? (
                <div className="summary-address-block">
                  <p className="summary-address-text">
                    {auth?.user?.address}
                  </p>

                  <button
                    className="btn-update-address"
                    onClick={() =>
                      navigate("/dashboard/user/profile", { state: "/cart" })
                    }
                  >
                    Update Address
                  </button>
                </div>
              ) : (
                <button
                  className="btn-login-checkout"
                  onClick={() =>
                    navigate(auth?.token ? "/dashboard/user/profile" : "/login")
                  }
                >
                  {auth?.token ? "Add Address" : "Login to Checkout"}
                </button>
              )}

              {clientToken && cart.length > 0 && (
                <>
                  <div className="braintree-dropin-wrap">
                    <DropIn
                      options={{ authorization: clientToken }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                  </div>

                  <button
                    className="btn-make-payment"
                    onClick={handlePayment}
                    disabled={!instance || loading}
                  >
                    {loading ? "Processing..." : "Make Payment"}
                  </button>
                </>
              )}
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;