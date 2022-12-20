import React from "react";

function PhotoCard({ photo }) {
	return (
		<div>
			<div className="card w-96 bg-base-100 shadow-xl">
				<figure>
					<img src={photo} alt="my-photo" />
				</figure>
			</div>
		</div>
	);
}

export default PhotoCard;
