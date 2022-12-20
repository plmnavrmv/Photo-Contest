import { ref, push, get, update } from "firebase/database";
import { db } from "../firebase/config";
import { initialScore } from "../common/constants";
import { async } from "@firebase/util";
export const createSubmission = async (
	title,
	description,
	url,
	imagePath,
	contestId,
	username
) => {
	const submissionObj = {
		title,
		description,
		url,
		contestId,
		username,
		score: initialScore,
		addedOn: Date.now(),
	};
	const { key } = await push(ref(db, "submissions"), submissionObj);

	return update(ref(db), {
		[`users/${username}/submissions/${key}`]: true,
		[`contests/${submissionObj.contestId}/submissions/${key}`]: submissionObj,
		[`users/${username}/my-pictures/${key}`]: imagePath,
		key,
	});
};

export const getSubmissionById = async (id) => {
	const snapshot = await get(ref(db, `submissions/${id}`));
	if (!snapshot.exists()) throw new Error("Content doesn't exist!");

	return {
		...snapshot.val(),
		id,
	};
};

export const getSubmissionsByContest = async (contestId) => {
	const snapshot = await get(ref(db, `contests/${contestId}/submissions`));

	if (!snapshot.exists()) {
		return [];
	}
	const submissions = Object.keys(snapshot.val()).map(getSubmissionById);
	return Promise.all(submissions);
};

export const updateSubmission = async (submissionObj, review, username) => {
	const currentScore = await get(
		ref(db, `submissions/${submissionObj.id}/score`)
	);
	const result = +currentScore.val();

	await update(ref(db), {
		[`submissions/${submissionObj.id}/votes/${username}`]: review,
		[`contests/${submissionObj.contestId}/submissions/${submissionObj.id}/votes/${username}`]:
			review,
		[`contests/${submissionObj.contestId}/submissions/${submissionObj.id}/score`]:
			result + +review.vote,
		[`submissions/${submissionObj.id}/score`]: result + +review.vote,
	});
};

export const getAllVotes = async (submissionID) => {
	const snapshot = await get(ref(db, `submissions/${submissionID}/votes`));

	if (!snapshot.exists()) {
		return [];
	}
	return Object.keys(snapshot.val()).map((key) => ({
		...snapshot.val()[key],
		id: key,
	}));
};

export const getAllSubmissions = async () => {
	const snapshot = await get(ref(db, "submissions"));

	if (!snapshot.exists()) {
		return [];
	}

	return Object.keys(snapshot.val())
		.map((key) => ({
			...snapshot.val()[key],
			id: key,
		}))
		.slice(0, 9);
};
