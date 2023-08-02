import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { createSpot, createSpotImage } from "../../store/spots";
import "./NewSpot.css"

const NewSpot = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [country, setCountry] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [previewImage, setPreviewImage] = useState("");
    // const [lat, setLat] = useState(0);
    // const [lng, setLng] = useState(0);
    const [urls, setUrls] = useState(["", "", "", ""]);
    const [preview, setPreview] = useState('')
    const [errors, setErrors] = useState({});
    const [validSubmit, setValidSubmit] = useState(false);

    const updateAddress = (e) => setAddress(e.target.value);
    const updateCity = (e) => setCity(e.target.value);
    const updateState = (e) => setState(e.target.value);
    const updateCountry = (e) => setCountry(e.target.value);
    // const updateLat = (e) => setLat(e.target.value);
    // const updateLng = (e) => setLng(e.target.value);
    const updateName = (e) => setName(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updatePreviewImage = (e) => {
        setPreviewImage(e.target.value)
        setPreview(true);
    };


    const handleNewSpot = async (e) => {
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
        // if (!lng) {
        //     errors.lng = "Lng is required"
        // }
        // if (!lat) {
        //     errors.lat = "Lat is requried"
        // }
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
        if (!urls) {
            errors.url = "Urls need to be a png, jpg, or a jpeg"
        }

        setErrors(errors)

        if (Object.values(errors).length == 0) {
            setValidSubmit(true);

            const safeSpot = {
                address,
                city,
                state,
                country,
                // lat,
                // lng,
                name,
                description,
                price
            };

            try {
                const createdSpot = await dispatch(createSpot(safeSpot));

                await dispatch(
                    createSpotImage(createdSpot.spot.id, { preview: true, url: previewImage })
                );

                urls.forEach(async (url) => {
                    if (url) {
                        await dispatch(createSpotImage(createdSpot.spot.id, { preview: false, url: url }));
                    }
                });

                history.push(`/spots/${createdSpot.spot.id}`);
            } catch (error) {
                console.log("Spot creation failed NEWSPOT.JS:", error);
            }
            setValidSubmit(false)
        }
    }


    return (
        <section className="create-spot-form-wrapper">
            <form onSubmit={handleNewSpot} className="new-spot-form">
                <div>
                    <h1>Create a new Spot</h1>
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
                        placeholder="Country"
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
                {/* <div>
                    <input
                        type="number"
                        placeholder="Latitutde"
                        min="-90"
                        max="90"
                        value={lat}
                        onChange={updateLat} />
                    {errors.lat && (
                        <p className='error-create'>{errors.lat}</p>
                    )}
                </div> */}
                {/* <div>
                    <input
                        type="number"
                        placeholder="Longitude"
                        min="-180"
                        max="180"
                        value={lng}
                        onChange={updateLng} />
                    {errors.lng && (
                        <p className='error-create'>{errors.lng}</p>
                    )}
                </div> */}
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
                <div>
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
                </div>
                <hr></hr>
                <button type="submit" className="create-spot-btn" disabled={validSubmit}>Create Spot</button>
            </form>
        </section>
    );
}

export default NewSpot;