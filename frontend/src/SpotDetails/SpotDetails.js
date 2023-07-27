import React from 'react';
import './SpotDetails.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { fetchSpotDetails, fetchSpotReviews, fetchSpots } from '../store/spots';

const SpotDetails = ({ isLoaded }) => {

    const dispatch = useDispatch();
    const { spotId } = useParams();

    const spot = useSelector((state) => state.spots.spotDetails);

    const reviewsObj = useSelector(state => state.spots.spotReviews);
    const reviewsObjAgain = reviewsObj ? Object.values(reviewsObj) : [];
    const reviews = reviewsObjAgain[0];

    useEffect(() => {
        dispatch(fetchSpotDetails(spotId));
        dispatch(fetchSpotReviews(spotId));
    }, [dispatch]);

    return (

        <div className='spot-details-wrapper'>
            {spot && (
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
                    </div>

                    <div className='num-of-reviews'>
                        <i class="fa-solid fa-star"></i>
                        {spot.avgRating ? spot.avgRating : 'new'}

                        {spot.numReviews} reviews
                    </div>

                    {reviews && (
                        <div className='spot-reviews-wrapper'>
                            {reviews?.map((review) => (
                                <div>{review.review}</div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    )

}

export default SpotDetails;