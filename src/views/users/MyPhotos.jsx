import React from "react";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { AppContext } from "../../context/app.context";
import { getMyPhotos } from "../../services/users.services";
import PhotoCard from "../../components/users/PhotoCard";

function MyPhotos() {
	const [photos, setPhotos] = useState([]);
	const { addToast, ...appState } = useContext(AppContext);
	const { userData } = appState;

	useEffect(() => {
		getMyPhotos(userData?.username)
			.then((result) => setPhotos(result))
			.catch((error) => addToast("error", error.message));
	}, [userData?.username]);

	return (
		<div>
			<h1 className="title">My photos</h1>
			<div className="flex flex-wrap justify-around">
				{photos?.map((photo, index) => (
					<PhotoCard key={index} photo={photo} />
				))}
			</div>
		</div>
	);
}

export default MyPhotos;
