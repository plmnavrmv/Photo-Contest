import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AppContext } from "../../context/app.context";
import { loginUser } from "../../services/auth.services";
import userValid from "../../common/enums/user-validation";

function Login() {
	const { addToast, setAppState, ...appState } = useContext(AppContext);
	const navigate = useNavigate();

	const [form, setForm] = useState({
		email: {
			value: "",
			touched: false,
			valid: false,
			error: "",
		},
		password: {
			value: "",
			touched: false,
			valid: false,
			error: "",
		},
	});

	const updateEmail = (value = "") => {
		setForm({
			...form,
			email: {
				value,
				touched: true,
				valid:
					value.length >= userValid.EMAIL_MIN_LENGTH &&
					value.length <= userValid.EMAIL_MAX_LENGTH,
				error:
					value.length < userValid.EMAIL_MIN_LENGTH
						? `Minimum email length: ${userValid.EMAIL_MIN_LENGTH}`
						: `Maximum email length: ${userValid.EMAIL_MAX_LENGTH}`,
			},
		});
	};

	const updatePassword = (value = "") => {
		setForm({
			...form,
			password: {
				value,
				touched: true,
				valid:
					value.length >= userValid.PASS_MIN_LENGTH &&
					value.length <= userValid.PASS_MAX_LENGTH,
				error:
					value.length < userValid.PASS_MIN_LENGTH
						? `Minimum password length: ${userValid.PASS_MIN_LENGTH}`
						: `Maximum password length: ${userValid.PASS_MAX_LENGTH}`,
			},
		});
	};

	const login = async (e) => {
		e.preventDefault();
		if (!form.email.valid) return addToast("error", "Invalid email");

		if (!form.password.valid) return addToast("error", "Invalid password");

		try {
			const credentials = await loginUser(
				form.email.value,
				form.password.value
			);

			setAppState({
				...appState,
				user: {
					email: credentials.user.email,
					uid: credentials.user.uid,
				},
			});

			addToast("success", "You have been logged!");
			navigate("/");
		} catch (error) {
			addToast("error", "Something went wrong");
		}
	};

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
			<div className="bg-gray-500 flex flex-col justify-center">
				<form className="max-w-[400px] w-full mx-auto bg-white-p-4" action="">
					<h2 className="text-4xl font-bold text-center py-6">25thFrame</h2>
					<div className="flex flex-col py-2">
						<label htmlFor="">Email</label>
						<input
							value={form.email.value}
							onChange={(e) => updateEmail(e.target.value)}
							className="border p-2 input input-primary "
							type="text"
						/>
					</div>
					<div className="flex flex-col py-2">
						<label htmlFor="">Password</label>
						<input
							value={form.password.value}
							onChange={(e) => updatePassword(e.target.value)}
							className="border p-2 input input-primary"
							type="password"
						/>
					</div>
					<button
						onClick={login}
						className=" input border w-full my-5 py-2 bg-violet-600 hover:bg-violet-500 text-white"
					>
						Sign in
					</button>
					<div className="flex justify-between">
						<p className="flex items-center mr-2">
							<input className="mr-2" type="checkbox" />
							Remember me
						</p>
						<Link to="/sign-up">Create an account</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
