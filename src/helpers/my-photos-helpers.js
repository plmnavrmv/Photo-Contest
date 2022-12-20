import { storage } from "../firebase/config";
import { ref as refStorage, getDownloadURL } from "firebase/storage";

export const getImage = async (location) => {
	const ImageURL = await getDownloadURL(refStorage(storage, location));
	return ImageURL;
};
