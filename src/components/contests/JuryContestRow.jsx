import React from "react";
import { addJuryToContest } from "../../services/contests-services";
import { useContext } from "react";
import { AppContext } from "../../context/app.context";
import { useState, useEffect } from "react";
import { getUser } from "../../services/users.services";
import { userRole } from "../../common/enums/user-role.enum";

function JuryContestRow({ object, contestId }) {
	const { addToast, userData, ...appState } = useContext(AppContext);
	const username = object.username;
	const [addAsJury, setAddAssJury] = useState(() => {
		Object.keys(object).includes(contestId);
	});

	const addJury = (username, contestId) => {
		addJuryToContest(username, contestId)
			.then((result) => setAddAssJury(result))
			.catch((error) => addToast("error", error.message));
	};
	useEffect(() => {
		getUser(username).then((result) => {
			setAddAssJury(Object.keys(result.jury).includes(contestId));
		});
	}, [contestId]);
	return (
		<tr>
			<th />
			<td>
				<div className="flex items-center space-x-3">
					<div className="avatar">
						<div className="mask mask-squircle w-12 h-12">
							<img src={object?.photoURL} alt={object.username} />
						</div>
					</div>
					<div>
						<div className="font-bold">
							{object.firstName} {object.lastName}
						</div>
					</div>
				</div>
			</td>
			<td>
				{object.role === userRole.ORGANIZER && "Organizer"}
				<br />
			</td>
			<td>{object.registerOn}</td>
			<th>
				<button
					className="btn btn-xs"
					style={{ backgroundColor: addAsJury ? "red" : "green" }}
					onClick={() => addJury(username, contestId)}
				>
					{addAsJury == true ? "Remove" : "Invite"}
				</button>
			</th>
		</tr>
	);
}

export default JuryContestRow;
