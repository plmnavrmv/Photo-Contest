import React from "react";
import { useState } from "react";
import ReactStars from "react-rating-stars-component";
function Rating({ setReview }) {
	const stars = Array.from({ length: 10 });
	const [rating, setRating] = useState(0);

	const ratingChanged = (newRating) => {
		setReview((prev) => ({
			...prev,
			vote: +newRating,
		}));
	};
	return (
		<div className="rating">
			<ReactStars
				count={10}
				onChange={ratingChanged}
				size={24}
				activeColor="#ffd700"
			/>
		</div>
	);
}

export default Rating;
