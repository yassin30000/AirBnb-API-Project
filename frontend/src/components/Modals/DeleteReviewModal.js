import React from "react";
import '../Modals/ConfirmDelete.css'
import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/spots";

export default function DeleteReviewModal({ reviewId }) {

    const dispatch = useDispatch();
    const handleYesClick = async (e) => {

        dispatch(deleteReview(reviewId));
    }

    return (
        <div className="confirm-overlay">

            <div className="confirm-content">

                <div className="confirm-heading">Confirm Delete</div>

                <div className="confirm-sub">Are you sure you want to remove this review?</div>

                <div className="confirm-btns-div">

                    <button className="confirm-delete-btn" onClick={handleYesClick}>Yes (Delete Review)</button>
                    <button className="modal-close-btn">No (Keep Review)</button>
                </div>
            </div>

        </div>
    )
}