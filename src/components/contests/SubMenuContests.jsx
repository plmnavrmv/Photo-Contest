import React from "react";
import { useContext } from "react";
import { AppContext } from "../../context/app.context";
import { Link } from "react-router-dom";
import { userRole } from "../../common/enums/user-role.enum";

function SubMenuContests() {
	const { addToast, ...appState } = useContext(AppContext);
	const { userData } = appState;
	return (
		<div className="navbar bg-base-100">
			<div className="navbar-start">
				<div className="dropdown">
					<label tabIndex={0} className="btn btn-ghost lg:hidden">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h8m-8 6h16"
							/>
						</svg>
					</label>
					<ul
						tabIndex={0}
						className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
					>
						<Link to="/up-coming-contests" className="btn">
							Upcoming
						</Link>

						<Link to="/open-contests" className="btn">
							Open
						</Link>

						<Link to="/open-jury-contests" className="btn">
							In review
						</Link>

						<Link to="/closed-contests" className="btn">
							Finished
						</Link>

						{userData?.role === userRole.ORGANIZER && (
							<Link to="/user-leaderboard" className="btn">
								Leaderboard
							</Link>
						)}
					</ul>
				</div>
			</div>
			<div className="navbar-center hidden lg:flex">
				<ul className="menu menu-horizontal p-0">
					<li className="mr-5">
						<Link to="/up-coming-contests" className="btn">
							Upcoming
						</Link>
					</li>
					<li className="mr-5">
						<Link to="/open-contests" className="btn">
							Open
						</Link>
					</li>
					<li className="mr-5">
						<Link to="/open-jury-contests" className="btn">
							In review
						</Link>
					</li>
					<li className="mr-5">
						<Link to="/closed-contests" className="btn">
							Finished
						</Link>
					</li>
					<li className="mr-5">
						{userData?.role === userRole.ORGANIZER && (
							<Link to="/user-leaderboard" className="btn">
								Leaderboard
							</Link>
						)}
					</li>
				</ul>
			</div>
			<div className="navbar-end">
				{userData?.role === userRole.ORGANIZER && (
					<Link to="/create-contest/">
						<p className="btn btn-primary">Create Contest</p>
					</Link>
				)}
			</div>
		</div>
	);
}

export default SubMenuContests;
