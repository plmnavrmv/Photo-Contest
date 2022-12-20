import React from "react";
import { useState } from "react";
import {
	getSubmissionById,
	updateSubmission,
} from "../../services/submission-services";
import Rating from "../../components/rating/Rating";
import { useNavigate } from "react-router-dom";

function SubmissionReview({ userData, id }) {
	const [review, setReview] = useState({
		comment: "",
		vote: 0,
		username: userData?.username,
	});
	const navigate = useNavigate();
	function handleOnChange(e) {
		setReview((prev) => ({
			...prev,
			comment: e.target.value,
		}));
	}
	async function handleOnClick() {
		const res = await getSubmissionById(id);
		await updateSubmission(res, review, userData?.username);
		navigate(`/contest-details/${res.contestId}`);
	}

	return (
		<div className="card w-96 bg-neutral text-neutral-content">
			<Rating setReview={setReview} />
			<div className="card-body">
				<textarea
					value={review.comment}
					className="textarea textarea-primary"
					placeholder="Write your review"
					onChange={handleOnChange}
				/>
				<button className="btn btn-active btn-primary" onClick={handleOnClick}>
					Submit
				</button>
			</div>
		</div>
	);
}

export default SubmissionReview;
