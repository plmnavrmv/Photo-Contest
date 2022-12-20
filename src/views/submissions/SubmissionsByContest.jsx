import React from "react";
import SubmissionCard from "../../components/submisions/SubmissionCard";

function SubmissionsByContest({ jury, photos, phaseStatus }) {
	return (
		<div>
			<h2 className="title">All Submissions</h2>
			<div className="flex flex-wrap justify-around">
				{photos
					?.sort((a, b) => b.score - a.score)
					.map((x) => (
						<SubmissionCard
							key={x.id}
							submission={x}
							phaseStatus={phaseStatus}
							jury={jury}
						/>
					))}
			</div>
		</div>
	);
}
export default SubmissionsByContest;
