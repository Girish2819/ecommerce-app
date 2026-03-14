
import React from "react";
import Layout from "../components/layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/Auth";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  // total price
  const totalPrice = () => {
    try {
      let total = 0;
      cart?.forEach((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };

  // remove item
  const removeCartItem = (pid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="container mt-3">

        {/* HEADER */}
        <div className="row">
          <div className="col-md-12 text-center">
            <h1 className="bg-light p-2">
              {`Hello ${auth?.token && auth?.user?.name}`}
            </h1>

            <h4 className="mb-4">
              {cart?.length
                ? `You have ${cart.length} items in your cart ${
                    auth?.token ? "" : "please login to checkout"
                  }`
                : "Your Cart Is Empty"}
            </h4>
          </div>
        </div>

        {/* MAIN CART SECTION */}
        <div className="row mt-4">

          {/* LEFT SIDE PRODUCTS */}
          <div className="col-lg-8">
            {cart?.map((p) => (
              <div className="card mb-3 p-3 shadow-sm" key={p._id}>
                <div className="row align-items-center">

                  {/* PRODUCT IMAGE */}
                  <div className="col-md-3">
                    <img
                      src={`/api/v1/product/product-photo/${p._id}`}
                      className="img-fluid rounded"
                      alt={p.name}
                      style={{ height: "90px", objectFit: "cover" }}
                    />
                  </div>

                  {/* PRODUCT INFO */}
                  <div className="col-md-6">
                    <h6>{p.name}</h6>
                    <p className="text-muted">
                      {p.description.substring(0, 40)}...
                    </p>
                    <p className="fw-bold">Price : ${p.price}</p>
                  </div>

                  {/* REMOVE BUTTON */}
                  <div className="col-md-3 text-center">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => removeCartItem(p._id)}
                    >
                      Remove
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE CART SUMMARY */}
          <div className="col-lg-4">
            <div className="card p-4 shadow-sm">
              <h4>Cart Summary</h4>
              <hr />
              <h5>Total : {totalPrice()}</h5>

              {auth?.user?.address ? (
                <>
                  <h6 className="mt-3">Current Address</h6>
                  <p>{auth?.user?.address}</p>

                  <button
                    className="btn btn-outline-warning w-100 mb-2"
                    onClick={() =>
                      navigate("/dashboard/user/profile")
                    }
                  >
                    Update Address
                  </button>
                </>
              ) : (
                <>
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning w-100"
                      onClick={() =>
                        navigate("/dashboard/user/profile")
                      }
                    >
                      Update Address
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning w-100"
                      onClick={() =>
                        navigate("/login", { state: "/cart" })
                      }
                    >
                      Please Login to Checkout
                    </button>
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

