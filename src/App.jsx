import "./App.css";
import poster from "./assets/background.jpg";
import { useEffect } from "react";
import { Link } from "react-router-dom";

function App() {
    useEffect(() => {
        document.title = "Home";
    }, []);
    return (
        <div>
            <div className="posterDiv">
                <img src={poster} alt="" className="homepagePoster" />
            </div>
            <div className="homepageContent">
                <div className="QuoteOfPage">
                    Share your movie-watching experience with the world
                </div>
                <Link
                    to="/write-a-review"
                    className="submitUserReview extraBtn"
                >
                    Write a review
                </Link>
            </div>
        </div>
    );
}

export default App;
