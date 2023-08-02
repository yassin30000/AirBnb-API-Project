import React, { useState } from 'react';
import './SpotDetails.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchSpotDetails, fetchSpotReviews, fetchSpots } from '../../store/spots';
import ReviewModal from '../Modals/ReviewModal';
import Modal from '../Modals/Modal';
import DeleteReviewModal from '../Modals/DeleteReviewModal';

const SpotDetails = ({ isLoaded }) => {

    const dispatch = useDispatch();
    const { spotId } = useParams();


    const spot = useSelector((state) => state.spots.spotDetails);
    const reviewsObj = useSelector(state => state.spots.spotReviews);
    const reviewsObjAgain = reviewsObj ? Object.values(reviewsObj) : [];
    const reviews = reviewsObjAgain[0] ? reviewsObjAgain[0] : [];
    const sessionUser = useSelector(state => state.session.user);

    let hasReview, isOwner, postReviewBtn;
    if (reviews && spot && sessionUser && Array.isArray(reviews)) {
        for (let review of reviews) {
            if (review.userId === sessionUser.id) {
                hasReview = true;
            }
        }

        if (sessionUser.id === spot.Owner.id) {
            isOwner = true;
        }
    }

    postReviewBtn = (
        <div id='post-review-btn'>

            <Modal buttonText='Post Review' modalComponent={<ReviewModal />} />
        </div>
    );
    console.log(postReviewBtn)
    if (!hasReview && !isOwner && sessionUser) {
    } else {
        postReviewBtn = (<></>);
    }

    const fixDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    useEffect(() => {
        dispatch(fetchSpotDetails(spotId));
        dispatch(fetchSpotReviews(spotId));
    }, [dispatch, spotId]);

    return (

        <div className='spot-details-wrapper'>
            {spot && reviews && Array.isArray(reviews) && (
                <div className='spot-details-center'>

                    <div className='spot-details-heading'>{spot.name}</div>
                    <div className='spot-details-sub'>{spot.city}, {spot.state}, {spot.country}</div>

                    <div className='spot-images-wrapper'>
                        {spot.SpotImages?.map((image, index) => (
                            <img
                                key={index}
                                className={index === 0 ? "first-image" : ""}
                                src={image.url} alt={spot.name}></img>
                        ))}
                    </div>

                    <div className='description-heading'>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</div>
                    <div className='spot-description-wrapper'>

                        <div className='spot-details-description'>{spot.description}</div>
                        <div className='reserve-div'>


                            <div className='price-line'>
                                <p>
                                    <span className='price'>${spot.price.toLocaleString()}</span> /night

                                </p>
                                <p className='rating'>
                                    <p>
                                        <i class="fa-solid fa-star"></i>
                                        {spot.avgRating ? spot.avgRating : 'new'}
                                    </p>
                                    <p>

                                        {spot.numReviews} {spot.numReviews === 1 ? 'review' : 'reviews'}
                                    </p>
                                </p>


                            </div>

                            <button className='reserve-btn' onClick={() => alert('Feature Coming Soon...')}>Reserve</button>

                        </div>
                    </div>

                    <div className='num-of-reviews'>
                        <span>
                            <i class="fa-solid fa-star"></i>
                            {spot.avgRating ? spot.avgRating : 'new'}

                        </span>
                        ·
                        <span>{spot.numReviews} {spot.numReviews === 1 ? 'review' : 'reviews'}</span>
                    </div>


                    {postReviewBtn}

                    <div className='spot-reviews-wrapper'>

                        {Array.isArray(reviews) && reviews?.map((review) => (
                            <div className='review-wrapper'>

                                <div className='reveiw-name'>{review.User.firstName}</div>
                                <div className='review-date'>{fixDate(review.updatedAt)}</div>
                                <div className='review-review'>{review.review}</div>

                                {sessionUser && review.userId === sessionUser.id && (
                                    // <button id='delete-review-btn'>Delete Review</button>
                                    <div id='delete-review-modal-div'>

                                        <Modal modalComponent={<DeleteReviewModal reviewId={review.id} />} buttonText="Delete Review" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>



                </div>
            )}
        </div>
    )

}

export default SpotDetails;