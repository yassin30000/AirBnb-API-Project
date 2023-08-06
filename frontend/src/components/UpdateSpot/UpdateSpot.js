import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { updateSpot } from "../../store/spots";

const UpdateSpot = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();

    const spots = useSelector((state) => state.spots.list.Spots);
    const spot = spots ? spots.find(spot => spotId == spot.id) : [];

    const [country, setCountry] = useState(spot.country);
    const [address, setAddress] = useState(spot.address);
    const [city, setCity] = useState(spot.city);
    const [state, setState] = useState(spot.state);
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [description, setDescription] = useState(spot.description);
    const [name, setName] = useState(spot.name);
    const [price, setPrice] = useState(spot.price);
    const [errors, setErrors] = useState({});

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateLat = (e) => setLat(e.target.value);
    const updateLng = (e) => setLng(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);

    const valid = !address || !city || !state || !lat || !lng || !country || !name || !description || !price;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = {};

        if (!country) errors.country = "Country is required";
        if (!address) errors.address = "Street address is required"
        if (!city) errors.city = "City is required"
        if (!state) errors.state = "State is required"
        if (!lng) errors.lng = "Lng is required"
        if (!lat) errors.lat = "Lat is requried"
        if (!description || description.length < 30) errors.description = "Description needs a minimum of 30 characters"
        if (!name) errors.name = "Name is required"
        if (!price) errors.price = "Price is required"

        setErrors(errors)

        if (Object.values(errors).length === 0) {
            const spotData = { address, city, state, lng, lat, country, name, description, price };
            await dispatch(updateSpot(spotId, spotData));
            history.push(`/spots/${spotId}`);
        }

    };

    return (
        <section className="create-spot-form-wrapper">
            <form className="new-spot-form" onSubmit={handleSubmit}>
                <div>
                    <h1>Update Spot</h1>
                    <h2>Where's your place located?</h2>
                    <p className="create-spot-descriptions">Guests will only get your exact address once they booked a reservation.</p>
                    <span>
                        <label> Country {errors.country && (<p className='error-create'>{errors.country}</p>)} </label>
                    </span>
                    <input
                        type="string"
                        placeholder="country"
                        value={country}
                        onChange={updateCountry} />
                </div>

                <div>
                    <span>
                        <label>Street Address {errors.address && (<p className='error-create'>{errors.address}</p>)}</label>
                    </span>
                    <input
                        type="string"
                        placeholder="Address"
                        value={address}
                        onChange={updateAddress}
                    />

                </div>

                <div>
                    <span>
                        <label>City {errors.city && (<p className='error-create'>{errors.city}</p>)}</label>
                    </span>
                    <input
                        type="string"
                        placeholder="City"
                        value={city}
                        onChange={updateCity} />

                </div>

                <div>
                    <span>
                        <label>State
                            {errors.state && (
                                <p className='error-create'>{errors.state}</p>
                            )}
                        </label>

                    </span>
                    <input
                        type="string"
                        placeholder="State"
                        value={state}
                        onChange={updateState} />

                </div>

                <div>
                    <span><label>Lat {errors.lat && (
                        <p className='error-create'>{errors.lat}</p>
                    )}</label></span>
                    <input
                        type="number"
                        placeholder="Latitutde"
                        min="-90"
                        max="90"
                        value={lat}
                        onChange={updateLat} />
                </div>

                <div>
                    <span><label>Lng {errors.lng && (
                        <p className='error-create'>{errors.lng}</p>
                    )}</label></span>
                    <input
                        type="number"
                        placeholder="Longitude"
                        min="-180"
                        max="180"
                        value={lng}
                        onChange={updateLng} />
                </div>

                <div>
                    <h2>Describe your place to guests</h2>
                    <p className="create-spot-descriptions">Mention the best features of your space, any special amentities like
                        fast wif or parking, and what you love about the neighborhood.</p>
                    <textarea
                        type="string"
                        placeholder="Please write at least 30 characters"
                        value={description}
                        onChange={updateDescription}
                        style={{ height: 200 }}
                    />
                    {errors.description && (
                        <p className='error-create-under'>{errors.description}</p>
                    )}
                </div>

                <hr></hr>

                <div>
                    <h2>Create a title for your spot</h2>
                    <p className="create-spot-descriptions">Catch guests' attention with a spot title that highlights what makes
                        your place special.</p>
                    <input
                        type="string"
                        placeholder="Name of your spot"
                        value={name}
                        onChange={updateName} />
                    {errors.name && (
                        <p className='error-create-under'>{errors.name}</p>
                    )}

                </div>

                <hr></hr>

                <div>
                    <h2>Set a base price for your spot</h2>
                    <p className="create-spot-descriptions">Competitive pricing can help your listing stand out and rank higher
                        in search results.</p>
                    <span>
                        $
                        <input
                            id="create-spot-price-input"
                            type="number"
                            placeholder="Price per Night (USD)"
                            min="0"
                            value={price}
                            onChange={updatePrice} />

                    </span>
                    {errors.price && (
                        <p className='error-create-under'>{errors.price}</p>
                    )}
                </div>
                <hr></hr>
                <button type="submit" className="create-spot-btn" disabled={valid}>Update Spot</button>
            </form>
        </section>
    );
}

export default UpdateSpot;