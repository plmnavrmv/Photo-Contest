import React from "react";
import { useState, useEffect } from "react";
import { getAllVotes } from "../../services/submission-services";
import VoteCard from "../../components/submisions/VoteCard";

function SubmissionVotes({ submissionId }) {
	const [allVotes, setAllVotes] = useState([]);

	useEffect(() => {
		getAllVotes(submissionId)
			.then((result) => setAllVotes(result))
			.catch((error) => addToast("error", error.message));
	}, [submissionId]);

	return (
		<div>
			<div className="card w-96 bg-neutral text-neutral-content">
				<div className="card-body items-center text-center">
					<h2 className="card-title text-indigo-200">Reviews</h2> <br />
					{allVotes?.map((el, index) => (
						<VoteCard key={index} vote={el} />
					))}
				</div>
			</div>
		</div>
	);
}

export default SubmissionVotes;
