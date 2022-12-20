import React from "react";
import { defaultPicture } from "/src/common/constants";
import { Link } from "react-router-dom";
import { userRole } from "../../common/enums/user-role.enum";

function ProfileCard({ userData }) {
	return (
		<div className="flex items-center justify-center">
			<div className="card card-side bg-base-100 shadow-xl ">
				<figure>
					<img
						max-width="150px"
						max-height="150px"
						className="w-72"
						src={userData?.photoURL ? userData?.photoURL : defaultPicture}
						alt=""
					/>
				</figure>
				<div className="card-body">
					<h2 className="card-title"> Hello {userData?.username}</h2>
					<p>
						<span className="badge badge-accent">Email:</span> {userData?.email}
					</p>
					<p>
						<span className="badge badge-accent">First name:</span>{" "}
						{userData?.firstName}
					</p>
					<p>
						<span className="badge badge-accent">Last name:</span>{" "}
						{userData?.lastName}
					</p>
					<p>
						<span className="badge badge-accent">Role:</span>
						{userData?.role === userRole.ORGANIZER && " Organizer"}
						{userData?.role === userRole.PHOTO_JUNKIES && " Photographer"}
					</p>

					<div className="card-actions justify-end">
						{userData?.role === userRole.ORGANIZER && (
							<>
								<Link to="/create-contest" className="btn btn-primary">
									Create contest
								</Link>
								<Link to="/open-jury-contests" className="btn btn-primary">
									Open for voting
								</Link>
							</>
						)}
						{userData?.role === userRole.PHOTO_JUNKIES && (
							<Link to="/open-contests" className="btn btn-primary">
								Open contests
							</Link>
						)}

						<Link to="/edit-profile" className="btn btn-primary">
							Edit Info
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProfileCard;
