import React from "react";
import { useState, useEffect } from "react";
import { getContests } from "../../services/contests-services";
import ContestCard from "../../components/contests/ContestCard";
import { useContext } from "react";
import { AppContext } from "../../context/app.context";
import { contestPhases } from "../../common/enums/contest.enum";
import SubMenuContests from "../../components/contests/SubMenuContests";

function PhaseOneContests() {
	const [contestsComing, setContestsComing] = useState([]);
	const { addToast } = useContext(AppContext);

	useEffect(() => {
		getContests(contestPhases.PHASE_ONE)
			.then((result) => {
				setContestsComing(result);
			})
			.catch((e) => addToast("error", e.message));
	}, []);

	return (
		<div>
			<SubMenuContests />
			<h1 className="title">Open Contests for yours photos</h1>
			<div className="flex flex-wrap justify-around">
				{contestsComing?.map((c) => (
					<ContestCard key={c.id} contest={c} />
				))}
			</div>
		</div>
	);
}

export default PhaseOneContests;
