import React, { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Layout from "./../components/layout/Layout";
import "../Styles/Cartpage.css";
import { useCart } from "../context/cart";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";
import dropin from "braintree-web-drop-in";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tokenLoading, setTokenLoading] = useState(false);
  const [tokenError, setTokenError] = useState("");
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [dropInLoading, setDropInLoading] = useState(false);
  const [dropInError, setDropInError] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const dropInContainerRef = useRef(null);
  const paymentDialogRef = useRef(null);
  const makePaymentButtonRef = useRef(null);

  const removeCartItem = (productId) => {
    const updatedCart = cart.filter((item) => item._id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const totalPrice = () =>
    cart.reduce((total, item) => total + Number(item.price || 0), 0);

  const getToken = useCallback(async () => {
    setTokenLoading(true);
    setTokenError("");
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      if (!data?.clientToken) {
        throw new Error("The payment provider did not return a client token.");
      }
      setClientToken(data.clientToken);
    } catch (error) {
      setTokenError(
        error.response?.data?.message ||
          error.message ||
          "Unable to load payment options. Please try again."
      );
    } finally {
      setTokenLoading(false);
    }
  }, []);

  useEffect(() => {
    if (auth?.token) getToken();
    else {
      setClientToken("");
      setInstance(null);
      setCheckoutOpen(false);
    }
  }, [auth?.token, getToken]);

  useEffect(() => {
    if (!checkoutOpen || !clientToken || !dropInContainerRef.current) return;

    let active = true;
    let dropInInstance;
    setInstance(null);
    setDropInError("");
    setDropInLoading(true);

    dropin
      .create({
        authorization: clientToken,
        container: dropInContainerRef.current,
        paymentOptionPriority: ["card"],
      })
      .then((createdInstance) => {
        dropInInstance = createdInstance;
        if (active) setInstance(createdInstance);
        else return createdInstance.teardown();
      })
      .catch((error) => {
        console.error("Braintree Drop-In initialization error:", error);
        if (active) {
          setDropInError(
            error.message || "Unable to load card payment options."
          );
        }
      })
      .finally(() => {
        if (active) setDropInLoading(false);
      });

    return () => {
      active = false;
      if (dropInInstance) {
        dropInInstance.teardown().catch((error) => {
          console.error("Braintree Drop-In teardown error:", error);
        });
      }
    };
  }, [checkoutOpen, clientToken]);

  useEffect(() => {
    if (!checkoutOpen) {
      makePaymentButtonRef.current?.focus();
      return;
    }

    paymentDialogRef.current?.focus();
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !loading) setCheckoutOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [checkoutOpen, loading]);

  const closePaymentDialog = () => {
    if (!loading) setCheckoutOpen(false);
  };

  // PAYMENT
  const handlePayment = async () => {
    if (!instance) {
      setPaymentError("Payment form is still loading. Please wait a moment.");
      return;
    }

    try {
      setLoading(true);
      setPaymentError("");
      const { nonce } = await instance.requestPaymentMethod();

      await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        { nonce, cart }
      );

      localStorage.removeItem("cart");
      setCart([]);
      toast.success("Payment Successful");
      navigate("/dashboard/user/orders");
    } catch (error) {
      setPaymentError(
        error.response?.data?.message ||
          error.message ||
          "Payment could not be completed. Please check your card details and try again."
      );
    } finally {
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
          <div className="cart-layout">

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

              {auth?.token && auth?.user?.address && cart.length > 0 && (
                <>
                  <button
                    ref={makePaymentButtonRef}
                    className="btn-make-payment"
                    onClick={() => {
                      setInstance(null);
                      setCheckoutOpen(true);
                      setPaymentError("");
                    }}
                    aria-expanded={checkoutOpen}
                    aria-haspopup="dialog"
                  >
                    Make Payment
                  </button>

                  {checkoutOpen && (
                    createPortal(
                      <div
                        className="payment-dialog-backdrop"
                        onMouseDown={(event) => {
                          if (event.target === event.currentTarget) {
                            closePaymentDialog();
                          }
                        }}
                      >
                        <section
                          ref={paymentDialogRef}
                          className="payment-dialog"
                          role="dialog"
                          aria-modal="true"
                          aria-labelledby="payment-dialog-title"
                          tabIndex={-1}
                        >
                          <button
                            type="button"
                            className="payment-dialog-close"
                            onClick={closePaymentDialog}
                            disabled={loading}
                            aria-label="Cancel payment and close dialog"
                          >
                            &times;
                          </button>
                          <h2
                            id="payment-dialog-title"
                            className="payment-dialog-title"
                          >
                            Complete your payment
                          </h2>
                          <div className="braintree-dropin-wrap">
                            <h3 className="payment-method-title">
                              Card payment
                            </h3>
                            <p className="payment-method-description">
                              Enter your card details securely below.
                            </p>
                            {tokenLoading && (
                              <p role="status">
                                Loading secure payment options...
                              </p>
                            )}
                            {tokenError && (
                              <div className="payment-error" role="alert">
                                <p>{tokenError}</p>
                                <button
                                  type="button"
                                  className="btn-payment-retry"
                                  onClick={getToken}
                                  disabled={tokenLoading}
                                >
                                  Try again
                                </button>
                              </div>
                            )}
                            {dropInLoading && (
                              <p role="status">Loading card form...</p>
                            )}
                            {dropInError && (
                              <p className="payment-error" role="alert">
                                {dropInError}
                              </p>
                            )}
                            {clientToken && (
                              <>
                                <div ref={dropInContainerRef} />
                                {paymentError && (
                                  <p className="payment-error" role="alert">
                                    {paymentError}
                                  </p>
                                )}
                                <button
                                  type="button"
                                  className="btn-make-payment"
                                  onClick={handlePayment}
                                  disabled={!instance || loading}
                                >
                                  {loading ? "Processing..." : "Pay securely"}
                                </button>
                              </>
                            )}
                          </div>
                        </section>
                      </div>,
                      document.body
                    )
                  )}
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