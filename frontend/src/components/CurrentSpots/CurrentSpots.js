import { useDispatch } from 'react-redux';
import '../CurrentSpots/CurrentSpots.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchSpots, removeSpot } from '../../store/spots';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import Modal from '../Modals/Modal';
import ConfirmDelete from '../Modals/ConfirmDelete';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';


function CurrentSpots() {
    const dispatch = useDispatch();
    const spotsObject = useSelector((state) => state.spots.list);
    const sessionUser = useSelector(state => state.session.user);
    const oldSpots = spotsObject ? Object.values(spotsObject) : [];
    const spots = oldSpots[0] ? oldSpots[0] : [];
    const userSpots = Array.isArray(spots) ? spots?.filter(spot => spot.ownerId === sessionUser.id) : [];

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchSpots());
        };
        fetchData();
    }, [dispatch]);

    return (
        <div className='current-spots-wrapper'>

            <h1>Manage Your Spots</h1>

            <div className='create-spot-btn'>
                <NavLink to='/spots/new'>
                    Create a New Spot

                </NavLink>
            </div>

            <div className='spots-list'>

                {Array.isArray(userSpots) && userSpots?.map(spot => (



                    <div key={spot.id} className='spot-tile'>

                        <NavLink to={`/spots/${spot.id}`} title={spot.name}>
                            <div>

                                <img src={spot.previewImage} alt='Spot Preview' className='spot-image' />
                            </div>

                        </NavLink>

                        <div className='spot-name'>{spot?.city}, {spot?.state}
                            <span className='stars'>
                                <i class="fa-solid fa-star"></i>
                                {spot.avgRating ? spot.avgRating : 'new'}
                            </span>

                        </div>


                        <p>{spot?.name}</p>

                        <span className='priceDiv'>${spot?.price.toLocaleString()}
                            <span>/night</span>

                        </span>

                        <div className='update-delete-div'>

                            <div className='update-spot-btn'>
                                <NavLink to={`/spots/${spot.id}/edit`}>Update</NavLink>
                            </div>

                            <div className='delete-spot-btn'>
                                <Modal modalComponent={<ConfirmDelete spotId={spot.id} />} buttonText='Delete' />
                            </div>

                        </div>

                    </div>

                ))}
            </div>
        </div>
    )
}

export default CurrentSpots;