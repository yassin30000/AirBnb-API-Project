import { csrfFetch } from "./csrf";

// loads all spots
const LOAD = 'spots/load';
const load = list => ({
    type: LOAD,
    list
});

export const fetchSpots = () => async dispatch => {
    const res = await fetch('/api/spots');

    if (res.ok) {
        const list = await res.json();
        dispatch(load(list))
    }
};


// loads all spot reviews
const LOAD_SPOT_REVIEWS = 'spot/reviews';
const loadSpotReviews = spotReviews => ({
    type: LOAD_SPOT_REVIEWS,
    spotReviews
})

export const fetchSpotReviews = (spotId) => async dispatch => {
    const res = await fetch(`/api/spots/${spotId}/reviews`);

    if (res.ok) {
        const spotReviews = await res.json();
        dispatch(loadSpotReviews(spotReviews));
    }
}


// loads specific spot details
const LOAD_SPOT_DETAILS = 'spotDetails/load';
const loadDetails = spotDetails => ({
    type: LOAD_SPOT_DETAILS,
    spotDetails
})

export const fetchSpotDetails = (spotId) => async dispatch => {
    const res = await fetch(`/api/spots/${spotId}`);

    if (res.ok) {
        const spotDetails = await res.json();
        dispatch(loadDetails(spotDetails))
    }
}

const CREATE_SPOT_IMAGE = 'spotImage/new';
const createImage = (spotId, imageUrl) => ({
    type: CREATE_SPOT_IMAGE,
    spotId, imageUrl
})

export const createSpotImage = (spotId, imageUrl) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(imageUrl), // Ensure imageUrl is correctly formatted
    });

    if (res.ok) {
        const spotImage = await res.json();
        dispatch(createImage(spotId, spotImage)); // Dispatch the createImage action to update the state with the new spot image
        return spotImage;
    } else {
        // Handle error cases here if needed
        console.log("Spot image creation failed:", res);
        return null;
    }
};


export const createSpot = (spotData) => async (dispatch) => {
    const res = await csrfFetch('/api/spots', {
        method: "POST",
        body: JSON.stringify(spotData),
    });

    if (res.ok) {
        const spot = await res.json();
        dispatch(load(spot)); // Dispatch the load action to update the state with the new spot
        return spot;
    } else {
        // Handle error cases here if needed
        console.log("Spot creation failed SPOTS.JS:", res);
        return null;
    }
};

// create new review

export const createSpotReview = (spotId, reviewData) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: "POST",
        body: JSON.stringify(reviewData),
    });

    if (res.ok) {
        const review = await res.json();
        dispatch(loadSpotReviews(review)); // Dispatch the load action to update the state with the new spot
        return review;
    } else {
        // Handle error cases here if needed
        console.log("Spot creation failed SPOTS.JS:", res);
        return null;
    }
};

// reducer

const initialState = { list: [] };

const spotsReducer = (state = initialState, action) => {

    switch (action.type) {
        case LOAD:
            return { ...state, list: action.list };
        case LOAD_SPOT_DETAILS:

            // newState[action.spotDetails.id] = action.spotDetails
            return { ...state, spotDetails: action.spotDetails }

        case LOAD_SPOT_REVIEWS:
            // newState[action.hello] = action.spotReviews
            return { ...state, spotReviews: action.spotReviews }
        default:
            return state;
    }
};

export default spotsReducer;