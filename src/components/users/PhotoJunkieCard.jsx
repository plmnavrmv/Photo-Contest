import React from "react";

function PhotoJunkieCard({ users }) {
	return (
		<tr>
			<td>
				<div className="flex items-center space-x-3">
					<div className="avatar">
						<div className="mask mask-squircle w-12 h-12">
							<img
								src="https://i.pinimg.com/236x/18/b9/ff/18b9ffb2a8a791d50213a9d595c4dd52.jpg"
								alt="avatar"
							/>
						</div>
					</div>
					<div>
						<div className="font-bold">
							{users?.firstName} {users?.lastName}
						</div>
					</div>
				</div>
			</td>
			<td>
				<span className="badge badge-accent badge-sm">Photo Junkie</span>
			</td>
			<th>
				<span className="text">
					{new Date(users?.registeredOn).toLocaleDateString()}
				</span>
			</th>
		</tr>
	);
}

export default PhotoJunkieCard;
