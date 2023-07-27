import React from 'react';
import './SpotDetails.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchSpotDetails, fetchSpotReviews, fetchSpots } from '../../store/spots';

const SpotDetails = ({ isLoaded }) => {

    const dispatch = useDispatch();
    const { spotId } = useParams();

    const spot = useSelector((state) => state.spots.spotDetails);

    const reviewsObj = useSelector(state => state.spots.spotReviews);
    const reviewsObjAgain = reviewsObj ? Object.values(reviewsObj) : [];
    const reviews = reviewsObjAgain[0];

    const sessionUser = useSelector(state => state.session.user);

    const postReviewBtn = sessionUser ? (<button className='post-review-btn'>Post Review</button>) : (<></>)

    //2023-07-26T07:16:40.000Z

    // fixing date
    const months = {
        1: 'January',
        2: 'February',
        3: 'March',
        4: 'April',
        5: 'May',
        6: 'June',
        7: 'July',
        8: 'August',
        9: 'September',
        10: 'October',
        11: 'November',
        12: 'December',
    }

    const fixDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" }
        return new Date(dateString).toLocaleDateString(undefined, options)
    }

    useEffect(() => {
        dispatch(fetchSpotDetails(spotId));
        dispatch(fetchSpotReviews(spotId));
    }, [dispatch]);

    return (

        <div className='spot-details-wrapper'>
            {spot && reviews && (
                <div className='spot-details-center'>

                    <div className='spot-details-heading'>{spot.name}</div>
                    <div className='spot-details-sub'>{spot.city}, {spot.state}, {spot.country}</div>

                    <div className='spot-images-wrapper'>
                        {spot.SpotImages?.map((image) => (
                            <img src={image.url} alt={spot.name}></img>
                        ))}
                    </div>

                    <div className='spot-description-wrapper'>

                        <div className='description-heading'>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</div>
                        <div className='spot-details-description'>{spot.description}</div>
                        <div className='reserve-div'>


                            <div className='price-line'>
                                ${spot.price} /night
                                <i class="fa-solid fa-star"></i>
                                {spot.avgRating ? spot.avgRating : 'new'}
                                {spot.numReviews} reviews

                            </div>

                            <button className='reserve-btn' onClick={() => alert('Feature Coming Soon...')}>Reserve</button>

                        </div>
                    </div>

                    <div className='num-of-reviews'>
                        <i class="fa-solid fa-star"></i>
                        {spot.avgRating ? spot.avgRating : 'new'}

                        {spot.numReviews} reviews
                    </div>

                    {postReviewBtn}

                    <div className='spot-reviews-wrapper'>

                        {reviews?.map((review) => (
                            <div className='review-wrapper'>

                                <div className='reveiw-name'>{review.User.firstName}</div>
                                <div className='review-date'>{fixDate(review.updatedAt)}</div>
                                <div className='review-review'>{review.review}</div>
                            </div>
                        ))}
                    </div>

                </div>
            )}
        </div>
    )

}

export default SpotDetails;