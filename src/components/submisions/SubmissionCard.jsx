import React from "react";
import { useNavigate } from "react-router-dom";
import { contestPhases } from "../../common/enums/contest.enum";
import { useContext } from "react";
import { AppContext } from "../../context/app.context";
import { userRole } from "../../common/enums/user-role.enum";

function SubmissionCard({ submission, phaseStatus, jury }) {
	const navigate = useNavigate();
	const { addToast, ...appState } = useContext(AppContext);
	const { userData } = appState;

	const showSubmission = () => {
		navigate(`/submission/${submission.id}`, { state: { phaseStatus } });
	};

	return (
		<div>
			<div className="card w-96 bg-base-300 shadow-xl mb-8 mr-5">
				<figure>
					<img
						className="object-cover h-48 w-96"
						src={submission?.url}
						alt="photo"
					/>
				</figure>
				<div className="card-body">
					<h2 className="card-title text-indigo-200">
						{submission.title} <br />
					</h2>
					{phaseStatus === contestPhases.PHASE_THREE && (
						<span className="badge badge-accent">
							Score: {submission.score}
						</span>
					)}
				</div>
				{phaseStatus === contestPhases.PHASE_TWO &&
					userData?.role === userRole.ORGANIZER &&
					jury === true && (
						<div className="btn btn-primary" onClick={showSubmission}>
							View
						</div>
					)}
				{phaseStatus === contestPhases.PHASE_THREE && (
					<div className="btn btn-primary" onClick={showSubmission}>
						View
					</div>
				)}
			</div>
		</div>
	);
}

export default SubmissionCard;
