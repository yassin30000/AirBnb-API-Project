import React, { useState } from "react";
import '../Modals/ReviewModal.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { createSpotReview } from "../../store/spots";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function ReviewModal() {
    const history = useHistory();
    const [review, setReview] = useState('');
    const [stars, setStarRating] = useState(null);
    const [errors, setErrors] = useState({});
    const [validSubmit, setValidSubmit] = useState(false);
    const [hoveredStars, setHoveredStars] = useState(null);
    const dispatch = useDispatch();
    const { spotId } = useParams();

    const handleStarClick = (rating) => {
        setStarRating(rating);
        setHoveredStars(null);

    };
    const handleStarHover = (rating) => {
        setHoveredStars(rating);
    };
    const handleStarUnhover = () => {
        setHoveredStars(null);
    };

    const reviewValid = review.length < 10;
    const validStars = !stars;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};

        if (review.length < 10) errors.review = 'Review must be 10 or more characters';
        if (!stars) errors.stars = 'Star Rating is required'

        setErrors(errors);

        if (Object.values(errors).length === 0) {
            setValidSubmit(true);

            const safeReview = { review, stars };

            console.log(safeReview)

            try {
                await dispatch(createSpotReview(spotId, safeReview))
                window.location.reload();
                history.push(`/spots/${spotId}`)
            } catch (error) {
                console.log('REVIEW CREATING FAILED IN REVIEWMODAL.JS: ', error)
            }
            setValidSubmit(false)
        }

    };

    return (
        <>
            <div className='review-modal-overlay'>
                <div className='review-modal-overlay'></div>
                <div className='review-modal-content'>
                    <form className="create-review-form" onSubmit={handleSubmit}>
                        <div className="modal-close-btn-center">

                            <button className="modal-close-btn">X</button>
                        </div>

                        <h2>How was your stay?</h2>
                        <p>{errors.message}</p>
                        <div>
                            {errors.review && (
                                <p className="review-errors">{errors.review}</p>
                            )}
                            <textarea
                                type="string"
                                name="review"
                                placeholder="Leave your review here..."
                                value={review}
                                required
                                onChange={e => setReview(e.target.value)}
                            />


                        </div>

                        <div className="stars-div">
                            {errors.stars && (
                                <p className="review-errors">{errors.stars}</p>
                            )}
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <FontAwesomeIcon
                                    key={rating}
                                    icon={faStar}
                                    className={rating <= (hoveredStars !== null ? hoveredStars : stars) ? "star filled" : "star"}
                                    onClick={() => handleStarClick(rating)}
                                    onMouseEnter={() => handleStarHover(rating)}
                                    onMouseLeave={handleStarUnhover}
                                />
                            ))}

                        </div>
                        <button disabled={reviewValid || validStars} className='review-submit-button' type="submit">Submit your Review</button>
                    </form>
                </div>
            </div>

        </>
    )
}