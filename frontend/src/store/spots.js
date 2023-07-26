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

const initialState = { list: [] };

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            return { ...state, list: action.list };
        default:
            return state;
    }
};

export default spotsReducer;