import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spots';
import './LandingPage.css'

const LandingPage = () => {

    const dispatch = useDispatch();

    const spotsObject = useSelector((state) => state.spots.list);
    const spots = Object.values(spotsObject);

    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch]);

    return (
        <div className='home-wrapper'>
            <div className='spots-list'>
                {spots[0]?.map(spot => (
                    <div key={spot.id} className='spot-tile'>

                        <img src={spot.previewImage} />

                        <div className='spot-name'>{spot?.name}
                            <span className='stars'>
                                <i class="fa-solid fa-star"></i>
                                {spot.avgRating}
                            </span>

                        </div>


                        <p>{spot?.description}</p>
                        <span className='priceDiv'>${spot?.price}
                            <span>/night</span>

                        </span>

                    </div>
                ))}
            </div>
        </div>
    )
};

export default LandingPage;
