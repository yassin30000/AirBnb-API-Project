import React from "react";
import '../Modals/ConfirmDelete.css'
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { fetchSpots, removeSpot } from "../../store/spots";
import { useDispatch } from "react-redux";

export default function ConfirmDelete({ spotId }) {

    const history = useHistory();
    const dispatch = useDispatch();

    const handleYesClick = async (e) => {

        const deletedSpot = await dispatch(removeSpot(spotId))
        console.log("Deleted Spot:", deletedSpot);


        if (deletedSpot) {
            console.log("Spot deleted successfully");

            window.location.reload();
            history.push('/spots/current')
            return;
        }
        console.log("Spot deletion failed");

    }

    return (
        <div className="confirm-overlay">

            <div className="confirm-content">

                <div className="confirm-heading">Confirm Delete</div>

                <div className="confirm-sub">Are you sure you want to remove this spot from the listings?</div>

                <div className="confirm-btns-div">

                    <button className="confirm-delete-btn" onClick={handleYesClick}>Yes (Delete Spot)</button>
                    <button className="modal-close-btn">No (Keep Spot)</button>
                </div>
            </div>

        </div>
    )
}