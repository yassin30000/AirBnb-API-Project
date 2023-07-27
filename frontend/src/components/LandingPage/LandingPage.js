import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpots } from '../../store/spots';
import './LandingPage.css'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';


const LandingPage = () => {

    const dispatch = useDispatch();
    const spotsObject = useSelector((state) => state.spots.list);
    const spots = spotsObject ? Object.values(spotsObject) : [];

    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch]);

    return (
        <div className='home-wrapper'>
            <div className='spots-list'>
                {spots[0]?.map(spot => (
                    <NavLink to={`spots/${spot.id}`} >

                        <div key={spot.id} className='spot-tile'>

                            <img src={spot.previewImage} />

                            <div className='spot-name'>{spot?.city}, {spot?.state}
                                <span className='stars'>
                                    <i class="fa-solid fa-star"></i>
                                    {spot.avgRating ? spot.avgRating : 'new'}
                                </span>

                            </div>


                            <p>{spot?.name}</p>

                            <span className='priceDiv'>${spot?.price}
                                <span>/night</span>

                            </span>

                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    )
};

export default LandingPage;
