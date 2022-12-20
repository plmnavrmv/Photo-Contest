import React from "react";

function SliderCard({ submission }) {
	return (
		<div className="card w-96 bg-base-300 shadow-xl mb-8 mr-5 rounded">
			<figure>
				<img
					className="object-cover h-48 w-96"
					src={submission?.url}
					alt="photo"
				/>
			</figure>
		</div>
	);
}

export default SliderCard;
