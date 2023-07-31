import { useDispatch } from 'react-redux';
import '../CurrentSpots/CurrentSpots.css';
import React from 'react';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchSpots } from '../../store/spots';
import { NavLink } from 'react-router-dom';


function CurrentSpots() {

    const dispatch = useDispatch();
    const spotsObject = useSelector((state) => state.spots.list);
    const sessionUser = useSelector(state => state.session.user);

    const oldSpots = spotsObject ? Object.values(spotsObject) : [];
    const spots = oldSpots[0] ? oldSpots[0] : [];
    const userSpots = [];



    for (let spot of spots) {

        if (spot.OwnerId == sessionUser.id) {
            userSpots.push(spot);
        }
    }


    useEffect(() => {
        dispatch(fetchSpots());

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

                {spots?.map(spot => (

                    <NavLink to={`/spots/${spot.id}`} title={spot.name} >

                        <div key={spot.id} className='spot-tile'>

                            <img src={spot.previewImage} />

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
                                    delete
                                </div>
                            </div>

                        </div>
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default CurrentSpots;