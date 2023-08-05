// // UpdateSpot.js
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory, useParams } from "react-router-dom";
// import { updateSpot } from "../../store/spots";
// import '../UpdateSpot/UpdateSpot.css'

// const UpdateSpot = () => {
//     const dispatch = useDispatch();
//     const history = useHistory();
//     const { spotId } = useParams();
//     const spot = useSelector((state) => state.spots.spotDetails);
//     const [errors, setErrors] = useState({});
//     const [validSubmit, setValidSubmit] = useState(false);

//     const [formData, setFormData] = useState({
//         name: spot?.name || "",
//         city: spot?.city || "",
//         state: spot?.state || "",
//         address: spot?.address || "",
//         country: spot?.country || "",
//         lat: spot?.lat || "",
//         lng: spot?.lng || "",
//         description: spot?.description || "",
//         price: spot?.price || ""
//     });

//     useEffect(() => {
//         if (spot) {
//             setFormData({
//                 name: spot.name,
//                 city: spot.city,
//                 state: spot.state,
//                 address: spot.address,
//                 country: spot.country,
//                 lat: spot.lat,
//                 lng: spot.lng,
//                 description: spot.description,
//                 price: spot.price
//             });
//         }
//     }, [spot]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevFormData) => ({
//             ...prevFormData,
//             [name]: value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const errors = {};
//         if (!formData.country) {
//             errors.country = "Country is required";
//         }
//         if (!formData.address) {
//             errors.address = "Street address is required"
//         }
//         if (!formData.city) {
//             errors.city = "City is required"
//         }
//         if (!formData.state) {
//             errors.state = "State is required"
//         }
//         if (!formData.lng) {
//             errors.lng = "Lng is required"
//         }
//         if (!formData.lat) {
//             errors.lat = "Lat is requried"
//         }
//         if (!formData.description || formData.description.length < 30) {
//             errors.description = "Description needs atleast 30 characters"
//         }
//         if (!formData.name) {
//             errors.name = "Name is required"
//         }
//         if (!formData.price) {
//             errors.price = "Price is required"
//         }

//         setErrors(errors)

//         if (Object.values(errors).length == 0) {
//             setValidSubmit(true);

//             try {
//                 await dispatch(updateSpot(spotId, formData));
//                 history.push(`/spots/${spotId}`);

//             } catch (error) {
//                 console.log("Spot update failed:", error);
//             }
//             setValidSubmit(false)
//         }
//     };

//     return (
//         <div id="update-spot-container">
//             <>
//                 <h2>Update Spot</h2>
//                 <form onSubmit={handleSubmit}>

//                     <div>
//                         <label>Name</label>
//                         <input
//                             type="text"
//                             name="name"
//                             value={formData.name}
//                             onChange={e => setFormData({name:spot.name})}
//                         />
//                         {errors.name && (
//                             <p className='error-create'>{errors.name}</p>
//                         )}
//                     </div>

//                     <div>
//                         <label>City</label>
//                         <input
//                             type="text"
//                             name="city"
//                             value={formData.city}
//                             onChange={handleChange}
//                         />
//                         {errors.city && (
//                             <p className='error-create'>{errors.city}</p>
//                         )}
//                     </div>

//                     <div>
//                         <label>State</label>
//                         <input
//                             type="text"
//                             name="state"
//                             value={formData.state}
//                             onChange={handleChange}
//                         />
//                         {errors.state && (
//                             <p className='error-create'>{errors.state}</p>
//                         )}
//                     </div>

//                     <div>
//                         <label>address</label>
//                         <input
//                             type="text"
//                             name="address"
//                             value={formData.address}
//                             onChange={handleChange}
//                         />
//                         {errors.address && (
//                             <p className='error-create'>{errors.address}</p>
//                         )}
//                     </div>
//                     <div>
//                         <label>country</label>
//                         <input
//                             type="text"
//                             name="country"
//                             value={formData.country}
//                             onChange={handleChange}
//                         />
//                         {errors.country && (
//                             <p className='error-create'>{errors.country}</p>
//                         )}
//                     </div>
//                     <div>
//                         <label>lat</label>
//                         <input
//                             type="number"
//                             name="lat"
//                             min="-90"
//                             max="90"
//                             value={formData.lat}
//                             onChange={handleChange}
//                         />
//                         {errors.lat && (
//                             <p className='error-create'>{errors.lat}</p>
//                         )}
//                     </div>
//                     <div>
//                         <label>lng</label>
//                         <input
//                             type="number"
//                             name="lng"
//                             min="-180"
//                             max="180"
//                             value={formData.lng}
//                             onChange={handleChange}
//                         />
//                         {errors.lng && (
//                             <p className='error-create'>{errors.lng}</p>
//                         )}
//                     </div>
//                     <div>
//                         <label>description</label>
//                         <input
//                             type="text"
//                             name="description"
//                             value={formData.description}
//                             onChange={handleChange}
//                         />
//                         {errors.description && (
//                             <p className='error-create'>{errors.description}</p>
//                         )}
//                     </div>
//                     <div>
//                         <label>price</label>
//                         <input
//                             type="number"
//                             name="price"
//                             value={formData.price}
//                             onChange={handleChange}
//                         />
//                         {errors.price && (
//                             <p className='error-create'>{errors.price}</p>
//                         )}
//                     </div>

//                     <button type="submit" disabled={validSubmit}>Update</button>
//                 </form>
//             </>
//         </div>
//     );
// };


// export default UpdateSpot;


import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { createSpot, createSpotImage } from "../../store/spots";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
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
    const [previewImage, setPreviewImage] = useState(spot.previewImage);

    const [errors, setErrors] = useState({});
    const [validSubmit, setValidSubmit] = useState(false);

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateLat = (e) => setLat(e.target.value);
    const updateLng = (e) => setLng(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updatePreviewImage = (e) => { setPreviewImage(e.target.value) };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = {};
        if (!country) {
            errors.country = "Country is required";
        }
        if (!address) {
            errors.address = "Street address is required"
        }
        if (!city) {
            errors.city = "City is required"
        }
        if (!state) {
            errors.state = "State is required"
        }

        if (!lng) {
            errors.lng = "Lng is required"
        }
        if (!lat) {
            errors.lat = "Lat is requried"
        }

        if (!description || description.length < 30) {
            errors.description = "Description needs a minimum of 30 characters"
        }
        if (!name) {
            errors.name = "Name is required"
        }
        if (!price) {
            errors.price = "Price is required"
        }
        if (!previewImage) {
            errors.previewImage = "Preview Image is required"
        }
        // if (!urls) {
        //     errors.url = "Urls need to be a png, jpg, or a jpeg"
        // }

        setErrors(errors)

        if (Object.values(errors).length == 0) {
            setValidSubmit(true);

            const spotData = {
                address,
                city,
                state,
                lng,
                lat,
                country,
                name,
                description,
                price
            };

            try {
                await dispatch(updateSpot(spotId, spotData));
                history.push(`/spots/${spotId}`);

            } catch (error) {
                console.log("Spot update failed:", error);
            }
            setValidSubmit(false)
        }
    };

    return (
        <section className="create-spot-form-wrapper">

            <form className="new-spot-form" onSubmit={handleSubmit}>
                <div>
                    <h1>Update Spot</h1>
                    <h2>Where's your place located?</h2>
                    <p className="create-spot-descriptions">Guests will only get your exact address once they booked a
                        reservation.</p>
                    <span>
                        <label>Country
                            {errors.country && (
                                <p className='error-create'>{errors.country}</p>
                            )}
                        </label>
                    </span>

                    <input
                        type="string"
                        placeholder="country"
                        value={country}
                        onChange={updateCountry} />

                </div>
                <div>
                    <span>
                        <label>Street Address {errors.address && (
                            <p className='error-create'>{errors.address}</p>
                        )}</label>

                    </span>
                    <input
                        type="string"
                        placeholder="Address"
                        value={address}
                        onChange={updateAddress} />

                </div>

                <div>
                    <span>
                        <label>City
                            {errors.city && (
                                <p className='error-create'>{errors.city}</p>
                            )}
                        </label>

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
                <div>
                    <h2>Liven up your spot with photos</h2>
                    <p className="create-spot-descriptions">Submit a link to at least one photo to publish your spot.</p>
                    <input
                        type="string"
                        placeholder="Preview Image Url"
                        value={previewImage}
                        onChange={updatePreviewImage} />
                    {errors.previewImage && (
                        <p className='error-create-under'>{errors.previewImage}</p>
                    )}
                </div>
                {/* <div>
                    {urls.map((url, index) => (
                        <div key={index}>
                            <input
                                type="string"
                                placeholder="Image Url"
                                value={url}
                                onChange={(e) => {
                                    const newUrls = [...urls];
                                    newUrls[index] = e.target.value;
                                    setUrls(newUrls)
                                }} />
                        </div>
                    ))}
                    {errors.url && (
                        <p className='error-create-under'>{errors.url}</p>
                    )}
                </div> */}
                <hr></hr>
                <button type="submit" className="create-spot-btn" disabled={validSubmit}>Update Spot</button>
            </form>


        </section>
    );
}

export default UpdateSpot;