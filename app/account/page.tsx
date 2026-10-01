"use client";

import { useEffect, useState } from "react";

import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  type User,
} from "firebase/auth";

import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);

  const [mode, setMode] = useState<"login" | "signup">("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<
    "success" | "error" | ""
  >("");

  const [showForgotPassword, setShowForgotPassword] =
    useState(false);

  /*
  ==========================================
  FIREBASE AUTH SESSION
  ==========================================
  */

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    async function initAuth() {
      try {
        // Keep user logged in after browser refresh/reopen.
        await setPersistence(
          auth,
          browserLocalPersistence
        );

        unsubscribe = onAuthStateChanged(
          auth,
          async (currentUser) => {
            setUser(currentUser);

            if (!currentUser) {
              setLoading(false);
              return;
            }

            setName(currentUser.displayName || "");

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

                setName(
                  data.name ||
                    currentUser.displayName ||
                    ""
                );

                setAddress(data.address || "");
                setCity(data.city || "");
                setPincode(data.pincode || "");
              }
            } catch (error) {
              console.error(
                "Profile loading error:",
                error
              );
            }

            setLoading(false);
          }
        );
      } catch (error) {
        console.error(
          "Firebase auth initialization error:",
          error
        );

        setLoading(false);
      }
    }

    initAuth();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  /*
  ==========================================
  MESSAGE HELPER
  ==========================================
  */

  function showMessage(
    text: string,
    type: "success" | "error"
  ) {
    setMessage(text);
    setMessageType(type);
  }

  /*
  ==========================================
  EMAIL LOGIN
  ==========================================
  */

  async function handleEmailLogin() {
    if (!email.trim() || !password) {
      showMessage(
        "Please enter your email and password.",
        "error"
      );
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await setPersistence(
        auth,
        browserLocalPersistence
      );

      await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );

      showMessage(
        "Login successful ✅",
        "success"
      );
    } catch (error: any) {
      console.error(error);

      if (
        error?.code ===
        "auth/invalid-credential"
      ) {
        showMessage(
          "Invalid email or password.",
          "error"
        );
      } else if (
        error?.code ===
        "auth/user-not-found"
      ) {
        showMessage(
          "Account not found. Please create an account.",
          "error"
        );
      } else if (
        error?.code ===
        "auth/wrong-password"
      ) {
        showMessage(
          "Wrong password.",
          "error"
        );
      } else if (
        error?.code ===
        "auth/too-many-requests"
      ) {
        showMessage(
          "Too many attempts. Please try again later.",
          "error"
        );
      } else {
        showMessage(
          error?.message ||
            "Login failed.",
          "error"
        );
      }
    } finally {
      setLoading(false);
    }
  }

  /*
  ==========================================
  CREATE ACCOUNT
  ==========================================
  */

  async function handleSignup() {
    if (!email.trim() || !password) {
      showMessage(
        "Please enter your email and password.",
        "error"
      );
      return;
    }

    if (password.length < 6) {
      showMessage(
        "Password must contain at least 6 characters.",
        "error"
      );
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await setPersistence(
        auth,
        browserLocalPersistence
      );

      const result =
        await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

      await setDoc(
        doc(db, "users", result.user.uid),
        {
          uid: result.user.uid,
          email: result.user.email || "",
          name: "",
          address: "",
          city: "",
          pincode: "",
          createdAt: serverTimestamp(),
        }
      );

      setUser(result.user);

      showMessage(
        "Account created successfully ✅",
        "success"
      );
    } catch (error: any) {
      console.error(error);

      if (
        error?.code ===
        "auth/email-already-in-use"
      ) {
        showMessage(
          "This email is already registered. Please login.",
          "error"
        );
      } else if (
        error?.code ===
        "auth/invalid-email"
      ) {
        showMessage(
          "Please enter a valid email address.",
          "error"
        );
      } else if (
        error?.code ===
        "auth/weak-password"
      ) {
        showMessage(
          "Password is too weak. Use at least 6 characters.",
          "error"
        );
      } else {
        showMessage(
          error?.message ||
            "Account creation failed.",
          "error"
        );
      }
    } finally {
      setLoading(false);
    }
  }

  /*
  ==========================================
  FORGOT PASSWORD
  ==========================================
  */

  async function handleForgotPassword() {
    if (!email.trim()) {
      showMessage(
        "Enter your email address first.",
        "error"
      );
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await sendPasswordResetEmail(
        auth,
        email.trim()
      );

      showMessage(
        "Password reset link sent to your email 📧",
        "success"
      );

      setShowForgotPassword(false);
    } catch (error: any) {
      console.error(error);

      if (
        error?.code ===
        "auth/user-not-found"
      ) {
        showMessage(
          "No account found with this email.",
          "error"
        );
      } else if (
        error?.code ===
        "auth/invalid-email"
      ) {
        showMessage(
          "Please enter a valid email address.",
          "error"
        );
      } else {
        showMessage(
          error?.message ||
            "Could not send password reset email.",
          "error"
        );
      }
    } finally {
      setLoading(false);
    }
  }

  /*
  ==========================================
  SAVE PROFILE
  ==========================================
  */

  async function saveProfile() {
    if (!user) return;

    if (!name.trim()) {
      showMessage(
        "Please enter your name.",
        "error"
      );
      return;
    }

    if (!address.trim()) {
      showMessage(
        "Please enter your delivery address.",
        "error"
      );
      return;
    }

    if (!city.trim()) {
      showMessage(
        "Please enter your city.",
        "error"
      );
      return;
    }

    if (pincode.trim().length !== 6) {
      showMessage(
        "Please enter a valid 6-digit pincode.",
        "error"
      );
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      await updateProfile(user, {
        displayName: name.trim(),
      });

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,

          name: name.trim(),

          email: user.email || "",

          address: address.trim(),

          city: city.trim(),

          pincode: pincode.trim(),

          updatedAt: serverTimestamp(),
        },
        {
          merge: true,
        }
      );

      showMessage(
        "Profile saved successfully ✅",
        "success"
      );
    } catch (error: any) {
      console.error(error);

      showMessage(
        error?.message ||
          "Could not save profile.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }

  /*
  ==========================================
  LOGOUT
  ==========================================
  */

  async function handleLogout() {
    try {
      await signOut(auth);

      setUser(null);

      setName("");
      setAddress("");
      setCity("");
      setPincode("");

      setEmail("");
      setPassword("");

      setMessage("");
      setMessageType("");

      setMode("login");
    } catch (error: any) {
      showMessage(
        error?.message ||
          "Logout failed.",
        "error"
      );
    }
  }

  /*
  ==========================================
  LOADING
  ==========================================
  */

  if (loading && !user) {
    return (
      <>
        <style jsx>{styles}</style>

        <main className="account-page">
          <div className="loading-card">
            <div className="loader"></div>
            <p>Loading your account...</p>
          </div>
        </main>
      </>
    );
  }

  /*
  ==========================================
  LOGGED IN ACCOUNT
  ==========================================
  */

  if (user) {
    return (
      <>
        <style jsx>{styles}</style>

        <main className="account-page">
          <div className="account-card">

            <div className="account-heading">
              <p className="brand">
                ROCK STYLES
              </p>

              <h1>MY ACCOUNT</h1>

              <p className="account-email">
                {user.email}
              </p>
            </div>

            <div className="profile-fields">

              <div className="field">
                <label>FULL NAME</label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />
              </div>

              <div className="field">
                <label>EMAIL ADDRESS</label>

                <input
                  type="email"
                  value={user.email || ""}
                  disabled
                />

                <small>
                  Email cannot be changed here.
                </small>
              </div>

              <div className="field">
                <label>DELIVERY ADDRESS</label>

                <textarea
                  placeholder="House No, Street, Area"
                  rows={4}
                  value={address}
                  onChange={(e) =>
                    setAddress(e.target.value)
                  }
                />
              </div>

              <div className="profile-row">

                <div className="field">
                  <label>CITY</label>

                  <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) =>
                      setCity(e.target.value)
                    }
                  />
                </div>

                <div className="field">
                  <label>PINCODE</label>

                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    placeholder="600001"
                    value={pincode}
                    onChange={(e) => {
                      const value =
                        e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 6);

                      setPincode(value);
                    }}
                  />
                </div>

              </div>
            </div>

            <button
              type="button"
              className="primary-btn"
              onClick={saveProfile}
              disabled={loading}
            >
              {loading
                ? "SAVING..."
                : "SAVE PROFILE"}
            </button>

            <button
              type="button"
              className="logout-btn"
              onClick={handleLogout}
            >
              LOG OUT
            </button>

            {message && (
              <p
                className={`message ${messageType}`}
              >
                {message}
              </p>
            )}

          </div>
        </main>
      </>
    );
  }

  /*
  ==========================================
  LOGIN / SIGNUP
  ==========================================
  */

  return (
    <>
      <style jsx>{styles}</style>

      <main className="account-page">
        <div className="account-card">

          <div className="account-heading">
            <p className="brand">
              ROCK STYLES
            </p>

            <h1>
              {mode === "login"
                ? "WELCOME BACK"
                : "CREATE ACCOUNT"}
            </h1>

            <p>
              {mode === "login"
                ? "Login to continue shopping."
                : "Create your Rock Styles account."}
            </p>
          </div>

          {/* LOGIN / SIGNUP TABS */}

          <div className="tabs">

            <button
              type="button"
              className={
                mode === "login"
                  ? "active"
                  : ""
              }
              onClick={() => {
                setMode("login");
                setMessage("");
              }}
            >
              LOGIN
            </button>

            <button
              type="button"
              className={
                mode === "signup"
                  ? "active"
                  : ""
              }
              onClick={() => {
                setMode("signup");
                setMessage("");
              }}
            >
              CREATE ACCOUNT
            </button>

          </div>

          {/* EMAIL FORM */}

          <div className="auth-form">

            <div className="field">
              <label>EMAIL ADDRESS</label>

              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                autoComplete="email"
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />
            </div>

            <div className="field">
              <label>PASSWORD</label>

              <input
                type="password"
                placeholder="Minimum 6 characters"
                value={password}
                autoComplete={
                  mode === "login"
                    ? "current-password"
                    : "new-password"
                }
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />
            </div>

            <button
              type="button"
              className="primary-btn"
              onClick={
                mode === "login"
                  ? handleEmailLogin
                  : handleSignup
              }
              disabled={loading}
            >
              {loading
                ? "PLEASE WAIT..."
                : mode === "login"
                ? "LOGIN"
                : "CREATE ACCOUNT"}
            </button>

            {mode === "login" && (
              <button
                type="button"
                className="forgot-btn"
                onClick={() => {
                  setShowForgotPassword(
                    !showForgotPassword
                  );
                  setMessage("");
                }}
              >
                FORGOT PASSWORD?
              </button>
            )}

            {showForgotPassword && (
              <div className="forgot-box">
                <p>
                  We'll send a password reset
                  link to your email.
                </p>

                <button
                  type="button"
                  className="reset-btn"
                  onClick={
                    handleForgotPassword
                  }
                  disabled={loading}
                >
                  {loading
                    ? "SENDING..."
                    : "SEND RESET LINK"}
                </button>
              </div>
            )}

          </div>

          {message && (
            <p
              className={`message ${messageType}`}
            >
              {message}
            </p>
          )}

          <p className="security-note">
            🔒 Your account is securely
            protected by Firebase.
          </p>

        </div>
      </main>
    </>
  );
}

/*
==================================================
INLINE CSS
==================================================
*/

const styles = `
  * {
    box-sizing: border-box;
  }

  .account-page {
    min-height: calc(100vh - 80px);
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 60px 20px 100px;
    background:
      radial-gradient(
        circle at top,
        #f7f7f7 0%,
        #ffffff 45%,
        #eeeeee 100%
      );
    font-family:
      Arial,
      Helvetica,
      sans-serif;
  }

  .account-card {
    width: 100%;
    max-width: 520px;
    background: #ffffff;
    border: 1px solid #e5e5e5;
    border-radius: 22px;
    padding: 38px;
    box-shadow:
      0 20px 60px rgba(0,0,0,0.08);
  }

  .account-heading {
    text-align: center;
    margin-bottom: 30px;
  }

  .brand {
    margin: 0 0 10px;
    font-size: 14px;
    font-weight: 800;
    letter-spacing: 0.2em;
  }

  .account-heading h1 {
    margin: 0;
    font-size: 34px;
    line-height: 1;
    font-weight: 900;
    letter-spacing: -0.04em;
    color: #111111;
  }

  .account-heading > p:not(.brand) {
    margin: 12px 0 0;
    color: #777777;
    font-size: 14px;
  }

  .account-email {
    margin-top: 12px;
    color: #555555;
    font-size: 14px;
    word-break: break-word;
  }

  .tabs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-bottom: 1px solid #dddddd;
    margin-bottom: 28px;
  }

  .tabs button {
    border: 0;
    background: transparent;
    padding: 14px 8px;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.08em;
    color: #888888;
    cursor: pointer;
    position: relative;
  }

  .tabs button.active {
    color: #111111;
  }

  .tabs button.active::after {
    content: "";
    position: absolute;
    left: 15%;
    right: 15%;
    bottom: -1px;
    height: 2px;
    background: #111111;
  }

  .auth-form,
  .profile-fields {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .field label {
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.12em;
    color: #333333;
  }

  .field input,
  .field textarea {
    width: 100%;
    border: 1px solid #d8d8d8;
    border-radius: 12px;
    padding: 14px 15px;
    background: #ffffff;
    color: #111111;
    font-size: 15px;
    outline: none;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;
  }

  .field textarea {
    resize: vertical;
    min-height: 105px;
  }

  .field input:focus,
  .field textarea:focus {
    border-color: #111111;
    box-shadow:
      0 0 0 3px rgba(0,0,0,0.06);
  }

  .field input:disabled {
    background: #f5f5f5;
    color: #666666;
    cursor: not-allowed;
  }

  .field small {
    color: #888888;
    font-size: 11px;
  }

  .profile-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
  }

  .primary-btn {
    width: 100%;
    margin-top: 26px;
    border: none;
    border-radius: 12px;
    background: #111111;
    color: #ffffff;
    padding: 16px;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.12em;
    cursor: pointer;
    transition:
      transform 0.2s ease,
      opacity 0.2s ease;
  }

  .primary-btn:hover {
    transform: translateY(-1px);
  }

  .primary-btn:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    transform: none;
  }

  .forgot-btn {
    border: none;
    background: transparent;
    color: #555555;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    cursor: pointer;
    padding: 5px;
  }

  .forgot-btn:hover {
    color: #000000;
    text-decoration: underline;
  }

  .forgot-box {
    padding: 16px;
    border-radius: 12px;
    background: #f6f6f6;
    border: 1px solid #e5e5e5;
  }

  .forgot-box p {
    margin: 0 0 12px;
    font-size: 12px;
    color: #666666;
    line-height: 1.5;
  }

  .reset-btn {
    width: 100%;
    border: 1px solid #111111;
    background: #ffffff;
    color: #111111;
    border-radius: 10px;
    padding: 12px;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.08em;
    cursor: pointer;
  }

  .reset-btn:hover {
    background: #111111;
    color: #ffffff;
  }

  .logout-btn {
    width: 100%;
    margin-top: 12px;
    padding: 14px;
    border: 1px solid #dddddd;
    border-radius: 12px;
    background: #ffffff;
    color: #222222;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.12em;
    cursor: pointer;
  }

  .logout-btn:hover {
    border-color: #111111;
  }

  .message {
    margin: 20px 0 0;
    padding: 13px 15px;
    border-radius: 10px;
    text-align: center;
    font-size: 13px;
    line-height: 1.5;
  }

  .message.success {
    background: #eef9f0;
    color: #24713a;
    border: 1px solid #ccebd2;
  }

  .message.error {
    background: #fff1f1;
    color: #a72c2c;
    border: 1px solid #f0cccc;
  }

  .security-note {
    margin: 25px 0 0;
    text-align: center;
    color: #999999;
    font-size: 11px;
    line-height: 1.5;
  }

  .loading-card {
    width: 100%;
    max-width: 420px;
    padding: 50px 30px;
    background: #ffffff;
    border: 1px solid #eeeeee;
    border-radius: 20px;
    text-align: center;
    box-shadow:
      0 20px 60px rgba(0,0,0,0.06);
  }

  .loading-card p {
    color: #777777;
    font-size: 13px;
    margin-top: 20px;
  }

  .loader {
    width: 35px;
    height: 35px;
    margin: auto;
    border: 3px solid #eeeeee;
    border-top-color: #111111;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 600px) {
    .account-page {
      padding: 30px 14px 90px;
    }

    .account-card {
      padding: 25px 18px;
      border-radius: 18px;
    }

    .account-heading h1 {
      font-size: 28px;
    }

    .profile-row {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .tabs button {
      font-size: 10px;
    }
  }
`;