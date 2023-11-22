import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Prediction from "./prediction.jsx";
import "./index.css";
import logo from "./assets/IMBD_logo.png";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Router>
            <div className="navbar">
                <Link to="/">
                    <img src={logo} alt="logo" className="logo" />
                </Link>
                <div className="navbarLinkContainer">
                    <Link to="/write-a-review" className="navbar-links">
                        Write a Review
                    </Link>
                    <Link to="/about" className="navbar-links">
                        About Project
                    </Link>
                </div>
            </div>

            <Routes>
                <Route excat path="/" element={<App />} />
                <Route excat path="/write-a-review" element={<Prediction />} />
            </Routes>
        </Router>
        <div className="footer">
            <SocialIcon
                network="github"
                bgColor="#121212"
                url="https://github.com/shudhanshurp/Movie-Review-Predicator"
            />
            <SocialIcon
                network="linkedin"
                bgColor="#121212"
                url="https://github.com/shudhanshurp/Movie-Review-Predicator"
            />
            <SocialIcon
                network="x"
                bgColor="#121212"
                url="https://github.com/shudhanshurp/Movie-Review-Predicator"
            />
            <SocialIcon
                network="instagram"
                bgColor="#121212"
                url="https://github.com/shudhanshurp/Movie-Review-Predicator"
            />
            <SocialIcon
                network="email"
                bgColor="#121212"
                url="https://github.com/shudhanshurp/Movie-Review-Predicator"
            />
        </div>
    </React.StrictMode>
);
