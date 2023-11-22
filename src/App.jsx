import "./App.css";
import poster from "./assets/background.jpg";

function App() {
    return (
        <div>
            <div className="posterDiv">
                <img src={poster} alt="" className="homepagePoster" />
            </div>
            <div className="homepageContent">
                <div className="QuoteOfPage">
                    Share your movie-watching experience with the world
                </div>
                <button className="submitUserReview ">Write a review</button>
            </div>
        </div>
    );
}

export default App;
