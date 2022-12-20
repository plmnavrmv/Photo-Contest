import React from "react";
import Star from "./Star";
function VoteCard({ vote }) {
	return (
		<div>
			<div className="card w-95 bg-base-100 shadow-xl">
				<div className="card-body w-80">
					<h2 className="card-title text-lg text-indigo-200">{vote.id}</h2>
					<div className="text text-lg text-white">{vote.comment}</div>
					<div className="card-actions justify-end text-yellow-500">
						<button className="btn btn-ghost btn-xs">
							{[...Array(vote.vote)].map((e, i) => (
								<Star key={i} />
							))}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default VoteCard;
