import React from "react";
import { logoutUser } from "../../services/auth.services";
import { useNavigate } from "react-router-dom";
function Logout() {
	const navigate = useNavigate();

	const logOut = () => {
		logoutUser();
		navigate("/");
	};

	const home = () => {
		navigate("/");
	};

	return (
		<div className="flex items-center justify-center">
			<div className="card w-96 bg-primary text-primary-content">
				<div className="card-body">
					<h2 className="card-title">You are about to Logout</h2>
					<p>Are you sure you want to log out</p>
					<div className="card-actions justify-end">
						<button className="btn" onClick={logOut}>
							Logout
						</button>
						<button className="btn" onClick={home}>
							No
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Logout;
