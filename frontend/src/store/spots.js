const LOAD = 'spots/load';
const LOAD_SPOT_DETAILS = 'spotDetails/load';
const LOAD_SPOT_REVIEWS = 'spot/reviews'

const load = list => ({
    type: LOAD,
    list
});

const loadSpotReviews = spotReviews => ({
    type: LOAD_SPOT_REVIEWS,
    spotReviews
})

const loadDetails = spotDetails => ({
    type: LOAD_SPOT_DETAILS,
    spotDetails
})

export const fetchSpotReviews = (spotId) => async dispatch => {
    const res = await fetch(`/api/spots/${spotId}/reviews`);

    if (res.ok) {
        const spotReviews = await res.json();
        dispatch(loadSpotReviews(spotReviews));
    }
}

export const fetchSpotDetails = (spotId) => async dispatch => {
    const res = await fetch(`/api/spots/${spotId}`);

    if (res.ok) {
        const spotDetails = await res.json();
        dispatch(loadDetails(spotDetails))
    }
}

export const fetchSpots = () => async dispatch => {
    const res = await fetch('/api/spots');

    if (res.ok) {
        const list = await res.json();
        dispatch(load(list))
    }
};



const initialState = { list: [] };

const spotsReducer = (state = initialState, action) => {

    let newState = {};

    switch (action.type) {
        case LOAD:
            return { ...state, list: action.list };
        case LOAD_SPOT_DETAILS:

            // newState[action.spotDetails.id] = action.spotDetails
            return { ...state, spotDetails: action.spotDetails}

        case LOAD_SPOT_REVIEWS:
            // newState[action.hello] = action.spotReviews
            return { ...state, spotReviews: action.spotReviews}
        default:
            return state;
    }
};

export default spotsReducer;