import {
	ref,
	push,
	get,
	set,
	update,
	query,
	equalTo,
	orderByChild,
	orderByKey,
} from "firebase/database";
import { db } from "../firebase/config";
import { storage } from "../firebase/config";
import { ref as refStorage, getDownloadURL } from "firebase/storage";

export const getImage = async (location) => {
	const ImageURL = await getDownloadURL(refStorage(storage, location));
	return ImageURL;
};

export const usersCount = async () => {
	const snapshot = await get(ref(db, "users"));
	const value = snapshot.val();
	if (!snapshot.exists()) {
		return [];
	}
	const usersNum = Object.keys(value);
	return usersNum.length;
};

export const contestsCount = async () => {
	const snapshot = await get(ref(db, "contests"));
	const value = snapshot.val();
	if (!snapshot.exists()) {
		return [];
	}
	const postsNum = Object.keys(value);
	return postsNum.length;
};
export const submissionsCount = async () => {
	const snapshot = await get(ref(db, "submissions"));
	const value = snapshot.val();
	if (!snapshot.exists()) {
		return [];
	}
	const postsNum = Object.keys(value);
	return postsNum.length;
};
