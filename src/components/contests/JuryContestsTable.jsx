import React from "react";
import { useState, useEffect } from "react";
import JuryContestRow from "./JuryContestRow";
import { getJuryUsers } from "../../services/users.services";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function JuryContestsTable() {
	const [jury, setJury] = useState([]);
	const location = useLocation();
	const contestId = location.state.contest.contestId;
	const contest = location.state.contest;

	const navigate = useNavigate();

	const backToMyContests = () => {
		navigate("/profile");
	};

	useEffect(() => {
		getJuryUsers()
			.then((result) => setJury(result))
			.catch((error) => addToast("error", error.message));
	}, []);

	return (
		<div>
			<h1 className="title">{contest.title} Jury</h1>
			<div className="flex items-center justify-center">
				<table className="table w-62 h-12">
					<thead>
						<tr>
							<th />

							<th>Name</th>
							<th>Role</th>
						</tr>
					</thead>

					<tbody>
						{jury.map((el) => (
							<JuryContestRow key={el.uid} object={el} contestId={contestId} />
						))}
					</tbody>

					<tfoot>
						<tr />
					</tfoot>
				</table>
			</div>
			<div className="flex items-center justify-center">
				<button className="btn btn-primary" onClick={backToMyContests}>
					Back to my contests
				</button>
			</div>
		</div>
	);
}

export default JuryContestsTable;
