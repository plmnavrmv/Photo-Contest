import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import PhotoJunkieCard from "../../components/users/PhotoJunkieCard";
import { getAllPhotoJunkies } from "../../services/users.services";
import SubMenuContests from "../../components/contests/SubMenuContests";

function UserLeaderboard() {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		getAllPhotoJunkies()
			.then((x) => setUsers(x))
			.catch(console.error);
	}, []);

	return (
		<div>
			<SubMenuContests />
			<br />
			<div className="flex justify-center overflow-x-auto w-full">
				<table className="table">
					<thead>
						<tr>
							<th>Name</th>
							<th>Rank</th>
							<th>Member Since</th>
						</tr>
					</thead>
					<tbody>
						{users?.map((x) => (
							<PhotoJunkieCard key={x.id} users={x} />
						))}
					</tbody>
					<tfoot>
						<tr>
							<th />
							<th />
							<th />
						</tr>
					</tfoot>
				</table>
			</div>
		</div>
	);
}

export default UserLeaderboard;
