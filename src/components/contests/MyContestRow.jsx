import React from "react";
import { contestPhases } from "../../common/enums/contest.enum";
import { useNavigate } from "react-router-dom";

function MyContestRow({ contest }) {
	const navigate = useNavigate();
	const showJury = () => {
		navigate("/contest-jury", { state: { contest } });
	};

	return (
		<tr>
			<td>
				<div className="flex items-center space-x-3">
					<div className="avatar">
						<div className="mask mask-squircle w-12 h-12">
							<img src={contest?.url} alt="Avatar Tailwind CSS Component" />
						</div>
					</div>
				</div>
			</td>
			<td>
				{contest?.title}
				<br />
			</td>
			<td>{contest?.category}</td>
			<td>
				{contest?.phaseStatus === contestPhases.UPCOMING && "Upcoming"}
				{contest?.phaseStatus === contestPhases.PHASE_ONE && "Open"}
				{contest?.phaseStatus === contestPhases.PHASE_TWO && "Voting"}
				{contest?.phaseStatus === contestPhases.PHASE_THREE && "Finished"}
			</td>

			<th>
				{contest?.phaseStatus === contestPhases.PHASE_ONE && (
					<div className="btn btn-primary" onClick={showJury}>
						Invite Jury
					</div>
				)}
			</th>
		</tr>
	);
}

export default MyContestRow;
