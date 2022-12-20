import React from "react";
import ProfileCard from "../../components/users/ProfileCard";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../../context/app.context";
import MyContests from "../contests/MyContests";
import { userRole } from "../../common/enums/user-role.enum";

function Profile() {
	const { addToast, ...appState } = useContext(AppContext);
	const { userData } = appState;

	return (
		<div>
			<h1 className="title">Profile</h1>
			<ProfileCard userData={userData} />
			{userData?.role === userRole.ORGANIZER && <MyContests />}
		</div>
	);
}

export default Profile;
