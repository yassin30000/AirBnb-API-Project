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
        body: JSON.stringify(imageUrl)
    });

    if (res.ok) {
        const spotImage = await res.json();
        dispatch(createImage(spotId, spotImage));
    } else {

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
        dispatch(load(spot));
        return spot;
    } else {

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
        dispatch(loadSpotReviews(review));
        return review;
    } else {

        console.log("Spot creation failed SPOTS.JS:", res);
        return null;
    }
};

// delete a spot

export const removeSpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        const list = await res.json();
        return dispatch(load(list));

    } else {
        console.log("Spot deletion failed:", res);
        return null;
    }
};


const UPDATE_SPOT = "spots/UPDATE_SPOT";

const updateSpotAction = (spot) => ({
    type: UPDATE_SPOT,
    spot,
});

export const updateSpot = (spotId, spotData) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/spots/${spotId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(spotData),
        });

        if (response.ok) {
            const updatedSpot = await response.json();
            dispatch(updateSpotAction(updatedSpot));
            return updatedSpot;
        } else {
            console.log("Spot update failed:", response);
        }
    } catch (error) {
        console.log("Spot update failed:", error);
    }
};


// delete a review
const DELETE_REVIEW = "spots/DELETE_REVIEW";
const deleteReviewAction = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId,
});

export const deleteReview = (reviewId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/reviews/${reviewId}`, {
            method: "DELETE",
        });

        if (response.ok) {
            dispatch(deleteReviewAction(reviewId));
        } else {
            console.log("Review deletion failed:", response);
        }
    } catch (error) {
        console.log("Review deletion failed:", error);
    }
};


// reducer

const initialState = { list: [] };

const spotsReducer = (state = initialState, action) => {

    switch (action.type) {

        case LOAD:

            return { ...state, list: action.list };
        case LOAD_SPOT_DETAILS:

            return { ...state, spotDetails: action.spotDetails }

        case LOAD_SPOT_REVIEWS:
            return { ...state, spotReviews: action.spotReviews }

        case UPDATE_SPOT:
            return { ...state, spotDetails: action.spotDetails }

        case DELETE_REVIEW:
            return { ...state, spotReviews: action.spotReviews }

        default:
            return state;
    }
};

export default spotsReducer;