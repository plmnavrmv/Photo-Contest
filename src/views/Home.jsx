import React from "react";
import { getAllSubmissions } from "../services/submission-services";
import { useState, useEffect } from "react";
import SliderCard from "../components/submisions/SliderCard";
import {
	getImage,
	usersCount,
	contestsCount,
	submissionsCount,
} from "../services/home.services";
import NumbersShuffle from "../react-spring/NumbersShuffle";
import { useNavigate } from "react-router-dom";

function Home() {
	const [submissions, setSubmission] = useState([]);
	const [submissionsNum, setSubmissionsNum] = useState(0);
	const [mainImage, setMainImage] = useState("");
	const [evgenImage, setEvgeniImage] = useState("");
	const [avramovImage, setAvramovImage] = useState("");
	const [ivanImage, setIvanImage] = useState("");
	const [usersNum, setUsersNum] = useState(0);
	const [contestNum, setContestNum] = useState(0);

	const navigate = useNavigate();

	const showAllContests = () => {
		navigate("/up-coming-contests");
	};

	useEffect(() => {
		usersCount;
		getAllSubmissions()
			.then((result) => {
				setSubmission(result);
			})
			.catch((e) => addToast("error", e.message));

		getImage("static/25thFrame.jpg").then((res) => setMainImage(res));
		getImage("static/Pic.jpg").then((res) => setEvgeniImage(res));
		getImage("static/avramov.jpg").then((res) => setAvramovImage(res));
		getImage("static/ivan.png").then((res) => setIvanImage(res));
		usersCount().then((res) => setUsersNum(res));
		contestsCount().then((res) => setContestNum(res));
		submissionsCount().then((res) => setSubmissionsNum(res));
	}, []);

	return (
		<div>
			<div className="header">
				<img className="main-image" src={mainImage} alt="" />
			</div>
			<h2 className="header-statistics">Welcome to world of photos</h2>
			<div className="forum-statistics">
				<div className="card w-96 bg-neutral text-neutral-content ml-3">
					<div className="card-body items-center text-center">
						<h2 className="card-title-statistics">
							<NumbersShuffle n={usersNum} />
						</h2>
						<p className="card-paragraph-statistics">Users</p>
					</div>
				</div>
				<div className="card w-96 bg-neutral text-neutral-content ml-3">
					<div className="card-body items-center text-center">
						<h2 className="card-title-statistics">
							<NumbersShuffle n={contestNum} />
						</h2>
						<p className="card-paragraph-statistics">Contests</p>
					</div>
				</div>
				<div className="card w-96 bg-neutral text-neutral-content ml-3">
					<div className="card-body items-center text-center">
						<h2 className="card-title-statistics">
							<NumbersShuffle n={submissionsNum} />
						</h2>
						<p className="card-paragraph-statistics">Photos</p>
					</div>
				</div>
			</div>
			<h2 className="header-statistics">Top 10</h2>
			<br />
			<div className="flex flex-wrap justify-around">
				{submissions?.map((x) => (
					<SliderCard key={x.id} submission={x} />
				))}
			</div>

			<h2 className="developers-header">Developers</h2>
			<div className="forum-developers">
				<div className="card w-96 bg-base-100 shadow-xl ml-8">
					<figure className="px-10 pt-10">
						<img
							src={evgenImage}
							alt="Shoes"
							className="rounded-xl w-62  h-96"
						/>
					</figure>
					<div className="card-body items-center text-center">
						<h2 className="card-title">Evgeni</h2>
						<div className="card-actions">
							<button className="btn btn-primary">Contacts</button>
						</div>
					</div>
				</div>
				<div className="card w-96 bg-base-100 shadow-xl ml-4">
					<figure className="px-10 pt-10">
						<img
							src={avramovImage}
							alt="Shoes"
							className=" h-96 w-62 rounded-xl "
						/>
					</figure>
					<div className="card-body items-center text-center">
						<h2 className="card-title">Plamen</h2>
						<div className="card-actions">
							<button className="btn btn-primary">Contacts</button>
						</div>
					</div>
				</div>
				<div className="card w-96 bg-base-100 shadow-xl ml-4">
					<figure className="px-10 pt-10">
						<img
							src={ivanImage}
							alt="Shoes"
							className=" h-96 w-62 rounded-xl "
						/>
					</figure>
					<div className="card-body items-center text-center">
						<h2 className="card-title">Ivan</h2>
						<div className="card-actions">
							<button className="btn btn-primary">Contacts</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Home;
