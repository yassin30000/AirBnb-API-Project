// UpdateSpot.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { updateSpot } from "../../store/spots";
import '../UpdateSpot/UpdateSpot.css'

const UpdateSpot = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { spotId } = useParams();
    const spot = useSelector((state) => state.spots.spotDetails);
    const [errors, setErrors] = useState({});
    const [validSubmit, setValidSubmit] = useState(false);

    const [formData, setFormData] = useState({
        name: spot?.name || "",
        city: spot?.city || "",
        state: spot?.state || "",
        address: spot?.address || "",
        country: spot?.country || "",
        lat: spot?.lat || "",
        lng: spot?.lng || "",
        description: spot?.description || "",
        price: spot?.price || ""
    });

    useEffect(() => {
        if (spot) {
            setFormData({
                name: spot.name,
                city: spot.city,
                state: spot.state,
                address: spot.address,
                country: spot.country,
                lat: spot.lat,
                lng: spot.lng,
                description: spot.description,
                price: spot.price
            });
        }
    }, [spot]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        if (!formData.country) {
            errors.country = "Country is required";
        }
        if (!formData.address) {
            errors.address = "Street address is required"
        }
        if (!formData.city) {
            errors.city = "City is required"
        }
        if (!formData.state) {
            errors.state = "State is required"
        }
        if (!formData.lng) {
            errors.lng = "Lng is required"
        }
        if (!formData.lat) {
            errors.lat = "Lat is requried"
        }
        if (!formData.description || formData.description.length < 30) {
            errors.description = "Description needs atleast 30 characters"
        }
        if (!formData.name) {
            errors.name = "Name is required"
        }
        if (!formData.price) {
            errors.price = "Price is required"
        }

        setErrors(errors)

        if (Object.values(errors).length == 0) {
            setValidSubmit(true);

            try {
                await dispatch(updateSpot(spotId, formData));
                history.push(`/spots/${spotId}`);

            } catch (error) {
                console.log("Spot update failed:", error);
            }
            setValidSubmit(false)
        }
    };

    return (
        <div id="update-spot-container">
            <>
                <h2>Update Spot</h2>
                <form onSubmit={handleSubmit}>

                    <div>
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={e => setFormData({name:spot.name})}
                        />
                        {errors.name && (
                            <p className='error-create'>{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label>City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                        />
                        {errors.city && (
                            <p className='error-create'>{errors.city}</p>
                        )}
                    </div>

                    <div>
                        <label>State</label>
                        <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                        />
                        {errors.state && (
                            <p className='error-create'>{errors.state}</p>
                        )}
                    </div>

                    <div>
                        <label>address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                        {errors.address && (
                            <p className='error-create'>{errors.address}</p>
                        )}
                    </div>
                    <div>
                        <label>country</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                        />
                        {errors.country && (
                            <p className='error-create'>{errors.country}</p>
                        )}
                    </div>
                    <div>
                        <label>lat</label>
                        <input
                            type="number"
                            name="lat"
                            min="-90"
                            max="90"
                            value={formData.lat}
                            onChange={handleChange}
                        />
                        {errors.lat && (
                            <p className='error-create'>{errors.lat}</p>
                        )}
                    </div>
                    <div>
                        <label>lng</label>
                        <input
                            type="number"
                            name="lng"
                            min="-180"
                            max="180"
                            value={formData.lng}
                            onChange={handleChange}
                        />
                        {errors.lng && (
                            <p className='error-create'>{errors.lng}</p>
                        )}
                    </div>
                    <div>
                        <label>description</label>
                        <input
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                        {errors.description && (
                            <p className='error-create'>{errors.description}</p>
                        )}
                    </div>
                    <div>
                        <label>price</label>
                        <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                        {errors.price && (
                            <p className='error-create'>{errors.price}</p>
                        )}
                    </div>

                    <button type="submit" disabled={validSubmit}>Update</button>
                </form>
            </>
        </div>
    );
};


export default UpdateSpot;
