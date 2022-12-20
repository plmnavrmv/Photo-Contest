import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import useCountdown from "./CountDown";
import { userRole } from "../../common/enums/user-role.enum";
import { AppContext } from "../../context/app.context";
import { contestPhases } from "../../common/enums/contest.enum";

function ContestCard({ contest }) {
	const { userData } = useContext(AppContext);
	const navigate = useNavigate();
	const redirectToDetails = () => {
		navigate(`/contest-details/${contest.id}`);
	};
	const [timeLeft, setEndTime] = useCountdown(() => {
		if (contest.phaseStatus == 0) return contest.startPhaseOne;
		if (contest.phaseStatus == 1) return contest.startPhaseTwo;
		if (contest.phaseStatus == 2) return contest.startPhaseThree;
	});

	const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
	const hours = Math.floor(timeLeft / (1000 * 60 * 60)) % 24;
	const minutes = Math.floor(timeLeft / 60000) % 60;
	const seconds = Math.floor(timeLeft / 1000) % 60;

	return (
		<div>
			<div className="card w-56 bg-base-300 shadow-xl mb-8 mr-5">
				<figure>
					<img
						className="object-cover h-48 w-96"
						src={contest.url}
						alt="Shoes"
					/>
				</figure>
				<div className="card-body">
					<h2 className="card-title">Title: {contest.title}</h2>
					<p>Category: {contest.category}</p>
					<div className="card-actions justify-end">
						{contest.phaseStatus !== contestPhases.PHASE_THREE && (
							<div className="flex gap-3">
								<div>
									<span className="countdown font-mono text-2xl">
										<span style={{ "--value": days }} />
									</span>
									days
								</div>
								<div>
									<span className="countdown font-mono text-2xl">
										<span style={{ "--value": hours }} />
									</span>
									hours
								</div>
								<div>
									<span className="countdown font-mono text-2xl">
										<span style={{ "--value": minutes }} />
									</span>
									min
								</div>
								<div>
									<span className="countdown font-mono text-2xl">
										<span style={{ "--value": seconds }} />
									</span>
									sec
								</div>
							</div>
						)}
					</div>
					<div className="card-actions">
						{(userData?.role === userRole.PHOTO_JUNKIES &&
							contest?.phaseStatus === contestPhases.PHASE_ONE) ||
						contest?.phaseStatus === contestPhases.PHASE_THREE ? (
							<button className="btn btn-primary" onClick={redirectToDetails}>
								View
							</button>
						) : null}

						{userData?.role === userRole.ORGANIZER &&
							contest?.phaseStatus !== contestPhases.PHASE_THREE && (
								<button className="btn btn-primary" onClick={redirectToDetails}>
									View
								</button>
							)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ContestCard;
