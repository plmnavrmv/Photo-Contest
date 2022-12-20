import React from "react";

export default function SubmissionsImage({ imageUrl }) {
	return (
		<figure className="mt-8">
			<img src={imageUrl} className="h-[350px]" alt="Album" />
		</figure>
	);
}
