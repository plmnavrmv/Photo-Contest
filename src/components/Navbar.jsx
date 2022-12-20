import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/app.context";
import { defaultPicture } from "../common/constants";

const Navbar = function () {
	const { user, userData } = useContext(AppContext);

	return (
		<div className="navbar bg-base-100 ">
			<div className="flex-1">
				<NavLink to="/">
					<p className="btn btn-ghost normal-case text-xl">25thFrame</p>
				</NavLink>
			</div>

			<div className="flex-none">
				<ul className="menu menu-horizontal p-0">
					<li className="menu-item mr-5">
						<Link to="/up-coming-contests">Dashboard</Link>
					</li>
				</ul>
			</div>

			<div className="flex-none gap-2">
				{user === null ? (
					<ul className="menu menu-horizontal p-0">
						<li>
							{" "}
							<Link to="/login">Login</Link>{" "}
						</li>
						<li>
							{" "}
							<Link to="/sign-up">Register</Link>{" "}
						</li>
					</ul>
				) : (
					<div className="dropdown dropdown-end">
						<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
							<div className="w-10 rounded-full">
								<img
									src={userData?.photoURL ? userData?.photoURL : defaultPicture}
								/>
							</div>
						</label>
						<ul
							tabIndex={0}
							className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 z-10"
						>
							<li>
								<Link to="/profile" className="justify-between">
									Profile
								</Link>
							</li>
							<li>
								<Link to="/edit-profile">Settings</Link>
							</li>
							<li>
								<Link to="/logout">Logout</Link>
							</li>
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default Navbar;
