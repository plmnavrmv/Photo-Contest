import "./App.css";
import { useState, useEffect } from "react";
import { AppContext } from "./context/app.context";
import { Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import ContestForm from "./views/contests/ContestForm";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/config";
import Signup from "./views/users/Signup";
import { userDataRealTime } from "./services/users.services";
import Navbar from "./components/Navbar";
import Login from "./views/users/Login";
import Logout from "./views/users/Logout";
import SubmissionDetails from "./views/submissions/SubmissionDetails";
import SubmissionsByContest from "./views/submissions/SubmissionsByContest";
import Authenticated from "./hoc/Authenticated";
import Profile from "./views/users/Profile";
import EditProfile from "./views/users/EditProfile";
import UpComingContests from "./views/contests/UpComingContests";
import PhaseOneContests from "./views/contests/PhaseOneContests";
import PhaseTwoContests from "./views/contests/PhaseTwoContests";
import PhaseThreeContests from "./views/contests/PhaseThreeContests";
import DetailsContest from "./views/contests/DetailsContest";
import MyPhotos from "./views/users/MyPhotos";
import UserLeaderboard from "./views/users/UserLeaderboard";
import JuryContestsTable from "./components/contests/JuryContestsTable";

function App() {
	const [user, loading] = useAuthState(auth);
	const [appState, setAppState] = useState({
		user: user ? { email: user?.email, uid: user?.uid } : null,
		userData: null,
	});
	const [toasts, setToasts] = useState([]);

	useEffect(() => {
		if (user !== null) {
			setAppState({
				...appState,
				user: user ? { email: user.email, uid: user.uid } : null,
			});
			return userDataRealTime(appState, setAppState, addToast, user);
		}
	}, [user]);

	useEffect(() => {
		if (!loading) {
			return userDataRealTime(appState, setAppState, addToast, user);
		}
	}, [appState.user]);

	const addToast = (type, message) => {
		const toast = {
			class: type === "error" ? "alert-error" : "alert-success",
			message,
		};

		setToasts((toasts) => [...toasts, toast]);

		setTimeout(
			() => setToasts((toasts) => toasts.filter((t) => t !== toast)),
			7000
		);
	};

	return (
		<AppContext.Provider value={{ ...appState, setAppState, user, addToast }}>
			<div className="App">
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route
						path="/create-contest"
						element={
							<Authenticated user={appState.user} loading={loading}>
								<ContestForm />
							</Authenticated>
						}
					/>
					<Route
						path="/contest-jury"
						element={
							<Authenticated user={appState.user} loading={loading}>
								<JuryContestsTable />
							</Authenticated>
						}
					/>
					<Route path="/sign-up" element={<Signup />} />
					<Route
						path="/submission/:submissionId"
						element={
							<Authenticated user={appState.user} loading={loading}>
								<SubmissionDetails />
							</Authenticated>
						}
					/>
					<Route
						path="/contest-submissions"
						element={
							<Authenticated user={appState.user} loading={loading}>
								<SubmissionsByContest />
							</Authenticated>
						}
					/>

					<Route
						path="contest-details/:contestId"
						element={
							<Authenticated user={appState.user} loading={loading}>
								<DetailsContest />
							</Authenticated>
						}
					/>
					<Route
						path="/up-coming-contests"
						element={
							<Authenticated user={appState.user} loading={loading}>
								<UpComingContests />
							</Authenticated>
						}
					/>
					<Route
						path="/open-contests"
						element={
							<Authenticated user={appState.user} loading={loading}>
								<PhaseOneContests />
							</Authenticated>
						}
					/>
					<Route
						path="/open-jury-contests"
						element={
							<Authenticated user={appState.user} loading={loading}>
								<PhaseTwoContests />
							</Authenticated>
						}
					/>
					<Route
						path="/closed-contests"
						element={
							<Authenticated user={appState.user} loading={loading}>
								<PhaseThreeContests />
							</Authenticated>
						}
					/>
					<Route
						path="/profile"
						element={
							<Authenticated user={appState.user} loading={loading}>
								<Profile />
							</Authenticated>
						}
					/>
					<Route
						path="/edit-profile"
						element={
							<Authenticated user={appState.user} loading={loading}>
								<EditProfile />
							</Authenticated>
						}
					/>
					<Route path="/login" element={<Login />} />
					<Route
						path="/logout"
						element={
							<Authenticated user={appState.user} loading={loading}>
								<Logout />
							</Authenticated>
						}
					/>
					<Route
						path="/my-photos"
						element={
							<Authenticated user={appState.user} loading={loading}>
								<MyPhotos />
							</Authenticated>
						}
					/>
					<Route
						path="/user-leaderboard"
						element={
							<Authenticated user={appState.user} loading={loading}>
								<UserLeaderboard />
							</Authenticated>
						}
					/>
				</Routes>
				<div className="toast">
					{toasts.map((t, i) => (
						<div key={i} className={`alert ${t.class}`}>
							<div>
								<span>{t.message}</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</AppContext.Provider>
	);
}

export default App;
