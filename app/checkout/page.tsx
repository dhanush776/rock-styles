"use client";

import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import {
  readCart,
  money,
  writeCart,
} from "@/lib/store";
import type { CartItem } from "@/types";
import { useRouter } from "next/navigation";

type Address = {
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  district: string;
  pincode: string;
};

export default function Checkout() {
  const router = useRouter();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [user, setUser] = useState<User | null>(null);

  const [address, setAddress] = useState<Address>({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    district: "",
    pincode: "",
  });

  const [savedAddress, setSavedAddress] =
    useState<Address | null>(null);

  const [selectedAddress, setSelectedAddress] =
    useState(false);

  const [editing, setEditing] = useState(false);

  const [loading, setLoading] = useState(true);
  const [savingAddress, setSavingAddress] =
    useState(false);
  const [placingOrder, setPlacingOrder] =
    useState(false);

  const [message, setMessage] = useState("");

  /*
  ==========================================
  LOAD CART + FIREBASE USER
  ==========================================
  */

  useEffect(() => {
    setCart(readCart());

    const unsubscribe = onAuthStateChanged(
      auth,
      async (currentUser) => {
        setUser(currentUser);

        if (!currentUser) {
          setLoading(false);
          return;
        }

        try {
          const profileRef = doc(
            db,
            "users",
            currentUser.uid
          );

          const profileSnap =
            await getDoc(profileRef);

          if (profileSnap.exists()) {
            const data = profileSnap.data();

            const profileAddress: Address = {
              name:
                data.name ||
                currentUser.displayName ||
                "",

              phone: data.phone || "",

              email:
                currentUser.email ||
                data.email ||
                "",

              address: data.address || "",
              city: data.city || "",
              district: data.district || "",
              pincode: data.pincode || "",
            };

            setSavedAddress(profileAddress);

            /*
            Auto select only when an actual
            saved delivery address exists.
            */

            if (
              profileAddress.address &&
              profileAddress.city &&
              profileAddress.pincode
            ) {
              setAddress(profileAddress);
              setSelectedAddress(true);
            }
          } else {
            setAddress((prev) => ({
              ...prev,
              name:
                currentUser.displayName || "",
              email:
                currentUser.email || "",
            }));
          }
        } catch (error) {
          console.error(
            "PROFILE LOAD ERROR:",
            error
          );
        }

        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  /*
  ==========================================
  TOTAL
  ==========================================
  */

  const subtotal = cart.reduce(
    (sum, item) =>
      sum + item.price * item.qty,
    0
  );

  const delivery =
    subtotal >= 1499 ? 0 : 80;

  const total = subtotal + delivery;

  /*
  ==========================================
  INPUT UPDATE
  ==========================================
  */

  function updateAddress(
    field: keyof Address,
    value: string
  ) {
    setAddress((prev) => ({
      ...prev,
      [field]: value,
    }));

    setSelectedAddress(false);
  }

  /*
  ==========================================
  LOGIN CHECK
  ==========================================
  */

  if (!loading && !user) {
    return (
      <div className="page container">
        <span className="eyebrow">
          CHECKOUT
        </span>

        <h1 className="page-title">
          Login Required
        </h1>

        <div
          className="panel"
          style={{
            maxWidth: 600,
            margin: "0 auto",
            textAlign: "center",
            padding: 40,
          }}
        >
          <h2>
            Please login to place your order
          </h2>

          <p style={{ marginTop: 10 }}>
            Login to your Rock Styles account
            to continue with checkout.
          </p>

          <button
            type="button"
            className="btn"
            style={{ marginTop: 20 }}
            onClick={() =>
              router.push("/account")
            }
          >
            LOGIN TO ACCOUNT
          </button>
        </div>
      </div>
    );
  }

  /*
  ==========================================
  SAVE / UPDATE ADDRESS
  ==========================================
  */

  async function saveAddress() {
    if (!user) return;

    if (!address.name.trim()) {
      setMessage("Please enter your name.");
      return;
    }

    if (!address.phone.trim()) {
      setMessage(
        "Please enter your mobile number."
      );
      return;
    }

    if (!address.address.trim()) {
      setMessage(
        "Please enter your delivery address."
      );
      return;
    }

    if (!address.city.trim()) {
      setMessage("Please enter your city.");
      return;
    }

    if (!address.district.trim()) {
      setMessage(
        "Please enter your district."
      );
      return;
    }

    if (
      address.pincode.trim().length !== 6
    ) {
      setMessage(
        "Please enter a valid 6-digit pincode."
      );
      return;
    }

    try {
      setSavingAddress(true);
      setMessage("");

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,

          name: address.name.trim(),

          email:
            user.email ||
            address.email.trim(),

          phone: address.phone.trim(),

          address: address.address.trim(),

          city: address.city.trim(),

          district:
            address.district.trim(),

          pincode:
            address.pincode.trim(),

          updatedAt:
            serverTimestamp(),
        },
        {
          merge: true,
        }
      );

      const updatedAddress = {
        ...address,
        name: address.name.trim(),
        phone: address.phone.trim(),
        email:
          user.email ||
          address.email.trim(),
        address: address.address.trim(),
        city: address.city.trim(),
        district:
          address.district.trim(),
        pincode:
          address.pincode.trim(),
      };

      setAddress(updatedAddress);
      setSavedAddress(updatedAddress);

      setSelectedAddress(true);
      setEditing(false);

      setMessage(
        "Address saved successfully."
      );
    } catch (error) {
      console.error(
        "ADDRESS SAVE ERROR:",
        error
      );

      setMessage(
        "We couldn't save your address right now. Please try again."
      );
    } finally {
      setSavingAddress(false);
    }
  }

  /*
  ==========================================
  USE SAVED ADDRESS
  ==========================================
  */

  function useSavedAddress() {
    if (!savedAddress) return;

    setAddress(savedAddress);
    setSelectedAddress(true);
    setEditing(false);
    setMessage("");
  }

  /*
  ==========================================
  PLACE ORDER
  ==========================================
  */

  async function placeOrder(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!user) {
      setMessage(
        "Please login before placing your order."
      );
      return;
    }

    if (!cart.length) {
      setMessage(
        "Your cart is empty."
      );
      return;
    }

    if (!selectedAddress) {
      setMessage(
        "Please select your saved address or save an edited address."
      );
      return;
    }

    if (
      !address.name ||
      !address.phone ||
      !address.address ||
      !address.city ||
      !address.district ||
      !address.pincode
    ) {
      setMessage(
        "Please complete your delivery address."
      );
      return;
    }

    try {
      setPlacingOrder(true);
      setMessage("");

      const orderData = {
        uid: user.uid,

        customerName:
          address.name.trim(),

        phone:
          address.phone.trim(),

        email:
          user.email ||
          address.email.trim(),

        address:
          address.address.trim(),

        city:
          address.city.trim(),

        district:
          address.district.trim(),

        pincode:
          address.pincode.trim(),

        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          qty: item.qty,
          price: item.price,
          size: item.size || "",
          image: item.image || "",
        })),

        subtotal,

        deliveryCharge: delivery,

        total,

        status: "Pending",

        paymentMethod:
          "Cash on Delivery",

        createdAt:
          serverTimestamp(),
      };

      const orderRef =
        await addDoc(
          collection(db, "orders"),
          orderData
        );

      /*
      Only clear cart AFTER successful
      Firebase order creation.
      */

      writeCart([]);

      localStorage.setItem(
        "rock_styles_email",
        user.email || ""
      );

      localStorage.setItem(
        "rock_styles_phone",
        address.phone
      );

      router.push(
        `/orders?created=${orderRef.id}`
      );
    } catch (error) {
      console.error(
        "ORDER SAVE ERROR:",
        error
      );

      setMessage(
        "Sorry, we couldn't place your order right now. Please try again."
      );
    } finally {
      setPlacingOrder(false);
    }
  }

  /*
  ==========================================
  LOADING
  ==========================================
  */

  if (loading) {
    return (
      <div className="page container">
        <div
          className="panel"
          style={{
            textAlign: "center",
            padding: 40,
          }}
        >
          Loading checkout...
        </div>
      </div>
    );
  }

  /*
  ==========================================
  CHECKOUT
  ==========================================
  */

  return (
    <div className="page container">
      <span className="eyebrow">
        CASH ON DELIVERY
      </span>

      <h1 className="page-title">
        Checkout
      </h1>

      <form
        onSubmit={placeOrder}
        className="checkout-layout"
      >
        {/* ==================================
            DELIVERY ADDRESS
        ================================== */}

        <div className="panel">
          <h2>
            Delivery Address
          </h2>

          {/* SAVED ADDRESS */}

          {savedAddress &&
            !editing && (
              <div
                style={{
                  marginTop: 20,
                  padding: 18,
                  border:
                    selectedAddress
                      ? "2px solid #1769e0"
                      : "1px solid #d7e5f5",
                  borderRadius: 14,
                  background:
                    selectedAddress
                      ? "#f4f8ff"
                      : "#fff",
                }}
              >
                <label
                  style={{
                    display: "flex",
                    gap: 12,
                    cursor: "pointer",
                    alignItems:
                      "flex-start",
                  }}
                >
                  <input
                    type="radio"
                    name="saved-address"
                    checked={
                      selectedAddress
                    }
                    onChange={
                      useSavedAddress
                    }
                    style={{
                      marginTop: 4,
                      accentColor:
                        "#1769e0",
                    }}
                  />

                  <div>
                    <strong>
                      Use this address
                    </strong>

                    <p
                      style={{
                        margin:
                          "10px 0 0",
                        lineHeight: 1.7,
                      }}
                    >
                      {savedAddress.name}
                      <br />

                      {savedAddress.address}
                      <br />

                      {savedAddress.city},{" "}
                      {savedAddress.district}
                      <br />

                      {savedAddress.pincode}
                      <br />

                      Mobile:{" "}
                      {savedAddress.phone}
                    </p>
                  </div>
                </label>

                <button
                  type="button"
                  className="btn"
                  style={{
                    marginTop: 16,
                    background:
                      "#fff",
                    color:
                      "#1769e0",
                    border:
                      "1px solid #1769e0",
                  }}
                  onClick={() => {
                    setEditing(true);
                    setSelectedAddress(
                      false
                    );
                    setMessage("");
                  }}
                >
                  EDIT ADDRESS
                </button>
              </div>
            )}

          {/* NO SAVED ADDRESS */}

          {!savedAddress &&
            !editing && (
              <div
                style={{
                  marginTop: 20,
                  padding: 18,
                  border:
                    "1px solid #d7e5f5",
                  borderRadius: 14,
                  background:
                    "#f5f9ff",
                }}
              >
                <p>
                  No saved address found.
                  Please add your delivery
                  address.
                </p>

                <button
                  type="button"
                  className="btn"
                  style={{
                    marginTop: 14,
                  }}
                  onClick={() =>
                    setEditing(true)
                  }
                >
                  ADD ADDRESS
                </button>
              </div>
            )}

          {/* EDIT ADDRESS */}

          {editing && (
            <div
              className="form-grid"
              style={{
                marginTop: 20,
              }}
            >
              <input
                required
                className="input"
                placeholder="Full name"
                value={address.name}
                onChange={(e) =>
                  updateAddress(
                    "name",
                    e.target.value
                  )
                }
              />

              <input
                required
                className="input"
                placeholder="Mobile number"
                type="tel"
                value={address.phone}
                onChange={(e) =>
                  updateAddress(
                    "phone",
                    e.target.value
                  )
                }
              />

              <input
                className="input full"
                placeholder="Email"
                type="email"
                value={
                  user?.email ||
                  address.email
                }
                disabled
              />

              <textarea
                required
                className="textarea full"
                placeholder="Full address"
                value={address.address}
                onChange={(e) =>
                  updateAddress(
                    "address",
                    e.target.value
                  )
                }
              />

              <input
                required
                className="input"
                placeholder="City"
                value={address.city}
                onChange={(e) =>
                  updateAddress(
                    "city",
                    e.target.value
                  )
                }
              />

              <input
                required
                className="input"
                placeholder="District"
                value={address.district}
                onChange={(e) =>
                  updateAddress(
                    "district",
                    e.target.value
                  )
                }
              />

              <input
                required
                className="input"
                placeholder="Pincode"
                inputMode="numeric"
                maxLength={6}
                value={address.pincode}
                onChange={(e) =>
                  updateAddress(
                    "pincode",
                    e.target.value
                      .replace(
                        /\D/g,
                        ""
                      )
                      .slice(0, 6)
                  )
                }
              />

              <div
                className="full"
                style={{
                  display: "flex",
                  gap: 10,
                  marginTop: 5,
                }}
              >
                <button
                  type="button"
                  className="btn"
                  disabled={
                    savingAddress
                  }
                  onClick={
                    saveAddress
                  }
                >
                  {savingAddress
                    ? "SAVING..."
                    : "SAVE ADDRESS"}
                </button>

                {savedAddress && (
                  <button
                    type="button"
                    className="btn"
                    style={{
                      background:
                        "#fff",
                      color:
                        "#64748b",
                      border:
                        "1px solid #d7e5f5",
                    }}
                    onClick={() => {
                      setAddress(
                        savedAddress
                      );
                      setEditing(false);
                      setSelectedAddress(
                        true
                      );
                      setMessage("");
                    }}
                  >
                    CANCEL
                  </button>
                )}
              </div>
            </div>
          )}

          {/* MESSAGE */}

          {message && (
            <div
              style={{
                marginTop: 18,
                padding:
                  "12px 14px",
                borderRadius: 10,
                background:
                  "#eff6ff",
                color:
                  "#1769e0",
                fontSize: 14,
                fontWeight: 600,
              }}
            >
              {message}
            </div>
          )}

          {/* PLACE ORDER */}

          <button
            type="submit"
            className="btn btn-block"
            disabled={
              placingOrder ||
              !cart.length ||
              !selectedAddress
            }
            style={{
              marginTop: 20,
              opacity:
                !selectedAddress
                  ? 0.55
                  : 1,
            }}
          >
            {placingOrder
              ? "PLACING ORDER..."
              : "PLACE COD ORDER"}
          </button>
        </div>

        {/* ==================================
            ORDER SUMMARY
        ================================== */}

        <div className="panel summary">
          <h2>
            Order Summary
          </h2>

          {cart.map((item) => (
            <div
              className="row"
              key={
                item.id +
                (item.size || "")
              }
            >
              <span>
                {item.name} ×{" "}
                {item.qty}
              </span>

              <b>
                {money(
                  item.price *
                    item.qty
                )}
              </b>
            </div>
          ))}

          <hr />

          <div className="row">
            <span>
              Subtotal
            </span>

            <strong>
              {money(subtotal)}
            </strong>
          </div>

          <div className="row">
            <span>
              Delivery
            </span>

            <strong>
              {delivery === 0
                ? "FREE"
                : money(delivery)}
            </strong>
          </div>

          <hr />

          <div className="row">
            <strong>
              Total
            </strong>

            <strong>
              {money(total)}
            </strong>
          </div>
        </div>
      </form>
    </div>
  );
}