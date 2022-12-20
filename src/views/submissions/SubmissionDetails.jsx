import React from "react";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SubmissionReview from "../../components/submisions/SubmissionReview";
import { AppContext } from "../../context/app.context";
import { getSubmissionById } from "../../services/submission-services";
import SubmissionVotes from "./SubmissionVotes";
import VoteCard from "../../components/submisions/VoteCard";
import { useLocation } from "react-router-dom";
import { contestPhases } from "../../common/enums/contest.enum";

function SubmissionDetails() {
	const { addToast, userData } = useContext(AppContext);
	const { submissionId } = useParams();
	const location = useLocation();
	const contestPhase = location.state.phaseStatus;

	const [submission, setSubmission] = useState({
		submission: null,
		username: "",
		title: "",
		description: "",
		url: "",
		id: "",
		votes: null,
	});

	useEffect(() => {
		getSubmissionById(submissionId)
			.then((sub) => {
				setSubmission((submission) => ({
					...submission,
					username: sub.username,
					title: sub.title,
					description: sub.description,
					url: sub.url,
					id: submissionId,
					votes: sub.votes || null,
				}));
			})
			.catch((e) => addToast("error", e.message));
	}, [submissionId]);

	const votes = submission?.votes
		? Object.entries(submission?.votes).map(([key, value]) => ({
				...value,
				id: key,
		  }))
		: [];

	const myVote = votes.find((el) => el.id === userData?.username);

	return (
		<section className="">
			<div className="container px-6 py-10 mx-auto text-indigo-200">
				Author
				<div className="flex items-center mt-6">
					<div className="mx-4">
						<h1 className="text-lg text-white">{submission?.username}</h1>
					</div>
				</div>
				<br />
				Title
				<p className="text-3xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
					{submission?.title}
				</p>
				<br />
				Description
				<p
					className="text-lg font-semibold text-gray-800 capitalize lg:text-2xl dark:text-white"
					dangerouslySetInnerHTML={{ __html: submission?.description }}
				>
					{/* {submission?.description} */}
				</p>
				<div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
					<img
						className="object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96"
						src={submission?.url}
						alt=""
					/>

					<div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
						<div className="block mt-4 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
							{contestPhase == contestPhases.PHASE_TWO && !myVote && (
								<SubmissionReview userData={userData} id={submissionId} />
							)}
							{contestPhase == contestPhases.PHASE_TWO && myVote && (
								<VoteCard vote={myVote} />
							)}
							{contestPhase == contestPhases.PHASE_THREE && (
								<SubmissionVotes submissionId={submission.id} />
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default SubmissionDetails;
