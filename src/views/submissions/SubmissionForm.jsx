import React from "react";
import { useState, useEffect } from "react";
import { validation } from "../../common/enums/submission.enum";
import { createSubmission } from "../../services/submission-services";
import { v4 } from "uuid";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase/config.js";
import { useContext } from "react";
import { AppContext } from "../../context/app.context";
import InputField from "../../components/submisions/SubmissionsInput";
import Image from "../../components/submisions/SubmissionImage";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import { modules, formats } from "../../react-quill/react-quill.config";

import "react-quill/dist/quill.snow.css";

function SubmissionForm({ contestId }) {
	const navigate = useNavigate();
	const { addToast, userData, user } = useContext(AppContext);
	const [title, setTitle] = useState("");
	const [titleValidator, setTitleValidator] = useState(false);
	const [coverPhoto, setCoverPhoto] = useState("");
	const [imageUrl, setImageUrl] = useState("");
	const [description, setDescription] = useState("");
	const [descriptionValidator, setDescriptionValidator] = useState(false);
	const username = userData?.username;

	const showOpenContests = () => {
		navigate("/open-contests/");
	};
	useEffect(() => {
		if (
			title.length > validation.MIN_LENGTH_TITLE &&
			title.length < validation.MAX_LENGTH_TITLE
		) {
			setTitleValidator(true);
		} else {
			setTitleValidator(false);
		}
		if (
			description.length > validation.MIN_LENGTH_DESCRIPTION &&
			description.length < validation.MAX_LENGTH_DESCRIPTION
		) {
			setDescriptionValidator(true);
		} else {
			setDescriptionValidator(false);
		}
	}, [title, description]);

	const sendData = async (e) => {
		e.preventDefault();
		const id = v4();
		const imageRef = ref(storage, `submission/${id}`);
		const file = coverPhoto;
		if (!titleValidator)
			addToast("error", "Title must between 2 - 30 characters");
		if (!file) addToast("error", "Choose a photo");
		if (file.type.includes("gif") || !file.type.includes("image")) {
			return addToast("error", "Please select an image");
		}
		if (titleValidator) {
			try {
				const result = await uploadBytes(imageRef, file);
				const url = await getDownloadURL(result.ref);
				// const imagePath = "submissions/" + id;
				// const contestIdVal = contestId;
				setCoverPhoto(url);
				// const submission = await createSubmission(
				// 	title,
				// 	description,
				// 	url,
				// 	imagePath,
				// 	contestIdVal,
				// 	username
				// );
				showOpenContests();
				addToast("success", "Your submission was successful!");
			} catch (error) {
				addToast("error", error.message);
			}
		}
	};

	return (
		<div className="submission-form">
			<div className="flex flex-wrap justify-around">
				<div className="card lg:card-side bg-base-100 shadow-xl">
					{!coverPhoto && (
						<InputField
							setCoverPhoto={setCoverPhoto}
							setImageUrl={setImageUrl}
						/>
					)}
					{coverPhoto && <Image imageUrl={imageUrl} />}
					<div className="card-body">
						<label className="label">Title</label>
						<input
							className="input input-bordered border-white w-full max-w-full mb-6"
							placeholder="Type here"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							type="text"
						/>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							type="text"
							placeholder="Your story"
							className="textarea textarea-primary w-full max-w-xs text-white"
						/>
						{/* <ReactQuill
							theme="snow"
							value={description}
							onChange={setDescription}
						/> */}
						<br />
						<br />
						<br />
						<br />
						<label htmlFor="my-modal-5" className="btn">
							Submit
						</label>
						<input type="checkbox" id="my-modal-5" className="modal-toggle" />
						<div className="modal">
							<div className="modal-box w-11/12 max-w-5xl">
								<p className="py-4">
									After you make your submission, you are not going to be able
									to edit it ! <br />
									Do you want to continue ?
								</p>
								<div className="modal-action">
									<label
										htmlFor="my-modal-5"
										className="btn"
										onClick={sendData}
									>
										Yes
									</label>
									<label htmlFor="my-modal-5" className="btn">
										no
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SubmissionForm;
