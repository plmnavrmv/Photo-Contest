import { ref, push, get, update } from "firebase/database";
import { db } from "../firebase/config";
import { setContestPhase } from "../helpers/contests-helpers";

// https://codetheweb.blog/javascript-dates-and-times/
export const createContest = async ({
	title,
	category,
	startPhaseOne,
	startPhaseTwo,
	startPhaseThree,
	imagePath,
	url,
	username,
}) => {
	const contestObj = {
		title,
		category,
		startPhaseOne: startPhaseOne.getTime(),
		startPhaseTwo: startPhaseTwo.getTime(),
		startPhaseThree: startPhaseThree.getTime(),
		url,
		author: username,
		addedOn: Date.now(),
	};

	const { key } = await push(ref(db, "contests"), contestObj);

	return update(ref(db), {
		[`users/${username}/created-contests/${key}`]: true,
		[`users/${username}/my-pictures/${key}`]: imagePath,
	});
};

export const getContests = async (target) => {
	const result = await get(ref(db, "contests"));
	if (!result.exists()) {
		return [];
	}

	return Object.entries(result.val())
		.map(([key, value]) => ({
			...value,
			id: key,
		}))
		.map(setContestPhase)
		.filter((el) => el.phaseStatus === target);
};

export const getContesById = async (contestId) => {
	const snapshot = await get(ref(db, `contests/${contestId}`));

	if (!snapshot.exists()) throw new Error("Contest doesn't exist!");
	const result = setContestPhase(snapshot.val());

	return {
		...result,
		contestId,
	};
};

export const getContestByUsername = async (username) => {
	const snapshot = await get(ref(db, `users/${username}/created-contests`));

	if (!snapshot.exists()) {
		return [];
	}

	const mySubmissions = Object.keys(snapshot.val());
	return Promise.all(mySubmissions.map(getContesById));
};

export const addJuryToContest = async (username, contestId) => {
	const snapshot = await get(ref(db, `contests/${contestId}/jury/${username}`));
	if (!snapshot.exists()) {
		// await push(ref(db, `contests/${contestId}/jury/${username}`), true)
		// await push(ref(db, `users/${username}/jury/${contestId}`), true)
		await update(ref(db), {
			[`contests/${contestId}/jury/${username}`]: true,
			[`users/${username}/jury/${contestId}`]: true,
		});
		return true;
	} else {
		await update(ref(db), {
			[`contests/${contestId}/jury/${username}`]: null,
			[`users/${username}/jury/${contestId}`]: null,
		});
		return false;
	}
};
