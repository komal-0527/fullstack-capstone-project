import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  FaGift,
  FaSearch,
  FaUserPlus,
  FaSignInAlt,
  FaArrowRight,
  FaRecycle,
  FaHeart,
} from "react-icons/fa";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

import "./App.css";

function HomePage() {
  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <Link to="/" className="logo">
          <FaGift />
          <span>GiftLink</span>
        </Link>

        <div className="nav-links">
          <Link to="/login">
            <FaSignInAlt />
            Login
          </Link>

          <Link to="/register" className="register-btn">
            <FaUserPlus />
            Register
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main>
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-icon">
              <FaGift />
            </div>

            <h1>
              Give More.
              <br />
              <span>Waste Less.</span>
            </h1>

            <p>
              GiftLink connects people who have household items they no longer
              need with people who can reuse them.
            </p>

            <div className="hero-buttons">
              <Link to="/register" className="primary-btn">
                Get Started
                <FaArrowRight />
              </Link>

              <Link to="/login" className="secondary-btn">
                <FaSignInAlt />
                Login
              </Link>
            </div>
          </div>

          <div className="hero-card">
            <div className="floating-card card-one">
              <FaGift />
              <div>
                <strong>Give Away</strong>
                <small>Share unused items</small>
              </div>
            </div>

            <div className="gift-circle">
              <FaGift />
            </div>

            <div className="floating-card card-two">
              <FaHeart />
              <div>
                <strong>Find Free Items</strong>
                <small>Reuse & recycle</small>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="features">
          <div className="feature-card">
            <div className="feature-icon">
              <FaGift />
            </div>
            <h3>Share Items</h3>
            <p>
              List household items you no longer need and give them a second
              life.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaSearch />
            </div>
            <h3>Find What You Need</h3>
            <p>
              Search and filter available items to find something useful for
              you.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">
              <FaRecycle />
            </div>
            <h3>Reduce Waste</h3>
            <p>
              Help your community reuse items instead of throwing them away.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="cta-section">
          <h2>Ready to make a difference?</h2>
          <p>Join GiftLink and start sharing today.</p>

          <Link to="/register" className="primary-btn">
            Get Started
            <FaArrowRight />
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <div className="logo">
          <FaGift />
          <span>GiftLink</span>
        </div>

        <p>Give what you don't need. Find what you do.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;