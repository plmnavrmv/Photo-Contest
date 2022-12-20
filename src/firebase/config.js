import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyAyXNRgLLreQWxvDqmWQ6UCvWiPFaY4SS0",
	authDomain: "photo-contest-27363.firebaseapp.com",
	projectId: "photo-contest-27363",
	storageBucket: "gs://photo-contest-27363.appspot.com",
	messagingSenderId: "687478915222",
	appId: "1:687478915222:web:a105938b270037baf682b7",
	databaseURL:
		"https://photo-contest-27363-default-rtdb.europe-west1.firebasedatabase.app/",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const storage = getStorage(app);
