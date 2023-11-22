import "./App.css";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import star from "./assets/star.jpg";
import sad from "./assets/sad.png";
import smile from "./assets/smile.png";
import alt from "./assets/alt.png";

function Prediction() {
    const [data, setData] = useState([]);
    const [userReview, setUserReview] = useState("");
    const [sentiment, setSentiment] = useState();
    const [flag, setFlag] = useState(0);
    const [loading, setLoading] = useState(true);

    let DEFAULT_IMG = alt;

    const handleSubmitReview = () => {
        setFlag(1);
        fetch("http://127.0.0.1:5000/predict", {
            method: "POST",
            body: JSON.stringify({ text: userReview }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data0) => {
                let temp = data0["sentiment"];
                temp = temp.slice(2, -2);
                temp = parseFloat(temp);
                setSentiment(temp);
                setFlag(2);
            });
    };

    useEffect(() => {
        const csvUrl =
            "https://raw.githubusercontent.com/shudhanshurp/Movie-Review-Predicator/master/frontend/src/MovieGenre.csv";

        Papa.parse(csvUrl, {
            encoding: "UTF-8",
            header: true,
            download: true,
            dynamicTyping: true,
            skipEmptyLines: true,
            complete: function (results) {
                setData(results.data.slice(0, 100));
                setLoading(false);
            },
            error: function (error) {
                console.error("Error parsing CSV:", error);
            },
        });
    }, []);
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    useEffect(() => {
        document.title = "Write a review";
    }, []);
    return (
        <div>
            <div className="movieDetails">
                {loading ? (
                    <div className="LoadingScreen">Loading...</div>
                ) : (
                    <Slider {...settings} className="sliderOfMovie">
                        {data?.map((item) => {
                            return (
                                <div key={item.imdbId} className="movieBox">
                                    <div className="movieTitleAndRating">
                                        <p className="movieTitle">
                                            {item.Title}
                                        </p>
                                        <div className="IMDbRating">
                                            <p className="IMDbRatingTitle">
                                                {" "}
                                                IMDb RATING
                                            </p>
                                            <div className="actualRatingDiv">
                                                <img
                                                    className="starOfRating"
                                                    src={star}
                                                    alt="star"
                                                />
                                                <p className="actualIMDbRating">
                                                    {item["IMDB Score"]}{" "}
                                                    <span className="outOfTen">
                                                        /10
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mainContentOfMovie">
                                        <img
                                            className="moviePoster"
                                            src={item.Poster}
                                            onError={(e) => {
                                                e.target.src = DEFAULT_IMG;
                                            }}
                                            alt={alt}
                                        />
                                        <div className="genreAndUserInput">
                                            <div className="movieGenre">
                                                {item.Genre.split("|").map(
                                                    (genre, index) => {
                                                        return (
                                                            <p
                                                                className="displayMovieGenre"
                                                                key={index}
                                                            >
                                                                {genre}
                                                            </p>
                                                        );
                                                    }
                                                )}
                                            </div>
                                            <div className="movieReviewInputDiv">
                                                <p>
                                                    Enter Your Review for The
                                                    Movie
                                                </p>
                                                <textarea
                                                    className="movieReviewUserInput"
                                                    onChange={(e) => {
                                                        setUserReview(
                                                            e.target.value
                                                        );
                                                    }}
                                                />
                                                <button
                                                    className="submitUserReview"
                                                    onClick={handleSubmitReview}
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="movieBoxBackground"
                                        style={{
                                            backgroundImage: `url(${item.Poster})`,
                                        }}
                                    ></div>
                                    <div className="movieBoxOverlay"></div>
                                </div>
                            );
                        })}
                    </Slider>
                )}
                <div className="output-container">
                    {flag != 0 && (
                        <div className="output-div">
                            {flag == 1 ? (
                                <div className="responseBox">
                                    <div className="loading">
                                        <span className="loading__dot"></span>
                                        <span className="loading__dot"></span>
                                        <span className="loading__dot"></span>
                                    </div>
                                </div>
                            ) : flag == 2 && sentiment > 0.5 ? (
                                <div className="responseBox">
                                    {" "}
                                    <img
                                        className="respface"
                                        src={smile}
                                        alt="star"
                                    />
                                    <p>Thank you for your positive response!</p>
                                </div>
                            ) : (
                                <div className="responseBox">
                                    <img
                                        className="respface"
                                        src={sad}
                                        alt="star"
                                    />
                                    <p>
                                        Sorry to hear that you did not like the
                                        movie!
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Prediction;

{
    /* <br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<br></br>
<div className="slider-controls">
    <button
        onClick={() => {
            goToSlide(currentSlide - 1);
            console.log("clicked");
        }}
    >
        Previous
    </button>
    <button
        onClick={() => {
            goToSlide(currentSlide + 1);
            console.log("clicked");
        }}
    >
        Next
    </button>
</div> */
}
