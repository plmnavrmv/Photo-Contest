import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	updateProfile,
} from "firebase/auth";
import { auth, storage } from "../firebase/config";
import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const registerUser = (email, password) =>
	createUserWithEmailAndPassword(auth, email, password);

export const loginUser = (email, password) =>
	signInWithEmailAndPassword(auth, email, password);

export const logoutUser = () => signOut(auth);

export function useAuth() {
	const [currentUser, setCurrentUser] = useState();

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
		return unsub;
	}, []);

	return currentUser;
}

export async function upload(file, currentUser, setLoading) {
	const fileRef = ref(storage, "profiles/" + currentUser.uid + ".png");

	setLoading(true);

	const snapshot = await uploadBytes(fileRef, file);
	const photoURL = await getDownloadURL(fileRef);

	updateProfile(currentUser, { photoURL });

	setLoading(false);
	return photoURL;
}
