import React from "react";
import { useState } from "react";
import { AppContext } from "../../context/app.context";
import userValid from "../../common/enums/user-validation";
import { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUser, getUser } from "../../services/users.services";
import { registerUser, loginUser } from "../../services/auth.services";

function Signup() {
	const { addToast, setAppState, ...appState } = useContext(AppContext);
	const navigate = useNavigate();

	const [form, setForm] = useState({
		username: {
			value: "",
			touched: false,
			valid: false,
			error: "",
		},
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
		confirmPassword: {
			value: "",
			touched: false,
			valid: false,
			error: "",
		},
		firstName: {
			value: "",
			touched: false,
			valid: false,
			error: "",
		},
		lastName: {
			value: "",
			touched: false,
			valid: false,
			error: "",
		},
		phone: {
			value: "",
			touched: false,
			valid: false,
			error: "",
		},
	});

	const updateUsername = (value = "") => {
		setForm({
			...form,
			username: {
				value,
				touched: true,
				valid:
					value.length >= userValid.USERNAME_MIN_LENGTH &&
					value.length <= userValid.USERNAME_MAX_LENGTH,
				error:
					value.length < userValid.USERNAME_MIN_LENGTH
						? `Minimum username length:
                ${userValid.USERNAME_MIN_LENGTH}`
						: `Maximum username length: ${userValid.USERNAME_MAX_LENGTH}`,
			},
		});
	};
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
						? `Minimum email length:
                ${userValid.EMAIL_MIN_LENGTH}`
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
						? `Minimum password length:
                ${userValid.PASS_MIN_LENGTH}`
						: `Maximum password length: ${userValid.PASS_MAX_LENGTH}`,
			},
		});
	};

	const confirmPassword = (value = "") => {
		setForm({
			...form,
			confirmPassword: {
				value,
				touched: true,
				valid:
					value.length >= userValid.PASS_MIN_LENGTH &&
					value.length <= value.length <= userValid.PASS_MAX_LENGTH &&
					value === form.password.value,
				error:
					value.length < userValid.PASS_MIN_LENGTH
						? `Minimum password length:
                ${userValid.PASS_MIN_LENGTH}`
						: `Maximum password length: ${userValid.PASS_MAX_LENGTH}`,
			},
		});
	};
	const updateFirstName = (value = "") => {
		setForm({
			...form,
			firstName: {
				value,
				touched: true,
				valid:
					value.length >= userValid.FIRST_NAME_MIN_LENGTH &&
					value.length <= userValid.FIRST_NAME_MAX_LENGTH &&
					!/[^a-zA-Z]/.test(value),
				error:
					value.length < userValid.FIRST_NAME_MIN_LENGTH
						? `Minimum name length:
                ${userValid.FIRST_NAME_MIN_LENGTH} `
						: /[^a-zA-Z]/.test(value)
						? "Your name must contain only letters!"
						: `Maximum name length:${userValid.FIRST_NAME_MAX_LENGTH} `,
			},
		});
	};

	const updateLastName = (value = "") => {
		setForm({
			...form,
			lastName: {
				value,
				touched: true,
				valid:
					value.length >= userValid.LAST_NAME_MIN_LENGTH &&
					value.length <= userValid.LAST_NAME_MAX_LENGTH &&
					!/[^a-zA-Z]/.test(value),
				error:
					value.length < userValid.LAST_NAME_MIN_LENGTH
						? `Minimum  last name length:
                ${userValid.LAST_NAME_MIN_LENGTH} `
						: /[^a-zA-Z]/.test(value)
						? "Your last name must contain only letters!"
						: `Maximum last name length:${userValid.LAST_NAME_MAX_LENGTH} `,
			},
		});
	};
	const updatePhone = (value = "") => {
		setForm({
			...form,
			phone: {
				value,
				touched: true,
				valid:
					value.length === userValid.PHONE_NUMBER_LENGTH && /^\d+$/.test(value),
				error:
					value.length !== userValid.PHONE_NUMBER_LENGTH
						? `Phone number must contain ${userValid.PHONE_NUMBER_LENGTH} symbols!`
						: "Phone number must contain digits only 0-9!",
			},
		});
	};

	const register = async (e) => {
		e.preventDefault();

		if (!form.username.valid)
			return addToast("error", "Invalid username! " + form.username.error);
		if (!form.email.valid)
			return addToast("error", "Invalid email! " + form.email.error);
		if (!form.password.valid)
			return addToast("error", "Invalid password !" + form.password.error);
		if (!form.confirmPassword.valid)
			return addToast("error", "Password does not match");
		if (!form.firstName.valid)
			return addToast("error", "Invalid first name! " + form.firstName.error);
		if (!form.lastName.valid)
			return addToast("error", "Invalid last name! " + form.lastName.error);
		if (!form.phone.valid) return addToast("error", form.phone.error);
		try {
			const user = await getUser(form.username.value);

			if (user !== null)
				return addToast(
					"error",
					`User with username ${form.username.value} already exists!`
				);

			const credentials = await registerUser(
				form.email.value,
				form.password.value
			);

			try {
				const userData = await createUser(
					credentials.user.uid,
					form.username.value,
					form.email.value,
					form.firstName.value,
					form.lastName.value,
					form.phone.value
				);

				setAppState({
					...appState,
					userData,
				});
			} catch (e) {
				return addToast("error", e.message);
			}

			try {
				await loginUser(form.email.value, form.password.value);

				setAppState({
					...appState,
					user: {
						...user,
						email: credentials.user.email,
						uid: credentials.user.uid,
					},
				});

				addToast("success", "You have been logged!");
				addToast("success", "Please upload profile pic");
				navigate("/");
			} catch (error) {
				addToast("error", "Something went wrong");
				console.log(error);
			}
		} catch (error) {
			if (error.message.includes("auth/email-already-in-use")) {
				return addToast("error", "This email has already been registered!");
			}

			addToast("error", "Something went wrong");
		}
	};

	return (
		<div className="">
			<div className="grid grid-cols-1 sm:grid-cols-2 h-screen w-full">
				<div className="bg-gray-500 flex flex-col justify-center">
					<form className="max-w-[400px] w-full mx-auto bg-white-p-4" action="">
						<h2 className="text-4xl font-bold text-center py-6">25thFrame</h2>

						<p className="mb-4">Please login to your account</p>
						<div className="mb-4">
							<input
								value={form.username.value}
								onChange={(e) => updateUsername(e.target.value)}
								type="text"
								className="form-control block w-full 
                                px-3 py-1.5 text-base font-normal text-gray-700
                                 bg-white bg-clip-padding border border-solid border-gray-300
                                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white
                                  focus:border-violet-600 focus:outline-none"
								id="username"
								placeholder="Username"
							/>
						</div>
						<div className="mb-4">
							<input
								value={form.email.value}
								onChange={(e) => updateEmail(e.target.value)}
								type="email"
								className="form-control block w-full
                                 px-3 py-1.5 text-base font-normal text-gray-700 bg-white 
                                 bg-clip-padding border border-solid border-gray-300 rounded transition 
                                 ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-violet-600 focus:outline-none"
								id="email"
								placeholder="Email"
							/>
						</div>
						<div className="mb-4">
							<input
								value={form.firstName.value}
								onChange={(e) => updateFirstName(e.target.value)}
								type="text"
								className="form-control block w-full px-3 py-1.5 text-base font-normal
                                 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
                                  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-violet-600 focus:outline-none"
								id="name"
								placeholder="Name"
							/>
						</div>
						<div className="mb-4">
							<input
								value={form.lastName.value}
								onChange={(e) => updateLastName(e.target.value)}
								type="text"
								className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding 
                                border border-solid border-gray-300 rounded transition ease-in-out m-0
                                 focus:text-gray-700 focus:bg-white focus:border-violet-600 
                                focus:outline-none"
								id="lastname"
								placeholder="Last Name"
							/>
						</div>
						<div className="mb-4">
							<input
								value={form.password.value}
								onChange={(e) => updatePassword(e.target.value)}
								type="password"
								className="form-control block w-full px-3 py-1.5
                                 text-base font-normal text-gray-700 bg-white
                                  bg-clip-padding border border-solid border-gray-300
                                   rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-violet-600 focus:outline-none"
								id="password"
								placeholder="Password"
							/>
						</div>
						<div className="mb-4">
							<input
								value={form.confirmPassword.value}
								onChange={(e) => confirmPassword(e.target.value)}
								type="password"
								className="form-control block w-full px-3 py-1.5
                                 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid
                                  border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700
                                   focus:bg-white focus:border-violet-600 focus:outline-none"
								id="passwordConfirm"
								placeholder="Repeat password"
							/>
						</div>
						<div className="mb-4">
							<input
								value={form.phone.value}
								onChange={(e) => updatePhone(e.target.value)}
								type="text"
								className="form-control block w-full px-3 py-1.5
                                 text-base font-normal text-gray-700 bg-white
                                  bg-clip-padding border border-solid border-gray-300
                                   rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-violet-600 focus:outline-none"
								id="phone"
								placeholder="Phone number"
							/>
						</div>
						<div className="text-center pt-1 mb-12 pb-1">
							<button
								className="inline-block px-6 py-2.5 text-white font-medium text-xs
                                 leading-tight uppercase rounded shadow-md hover:bg-violet-700 hover:shadow-lg
                                  focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition duration-150 ease-in-out w-full mb-3"
								type="submit"
								onClick={register}
								data-mdb-ripple="true"
								data-mdb-ripple-color="light"
							>
								Register
							</button>
							<a className="text-gray-500" href="#!">
								Forgot password?
							</a>
						</div>
						<div className="flex items-center justify-between pb-6">
							<p className="mb-0 mr-2">You have an account?</p>
							<button
								type="button"
								className="inline-block px-6 py-2 border-2 border-red-600 text-red-600
                                 font-medium text-xs leading-tight uppercase rounded hover:bg-black
                                  hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out"
								data-mdb-ripple="true"
								data-mdb-ripple-color="light"
							>
								<Link to="/login">Log In</Link>
							</button>
						</div>
					</form>

					<div className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none" />
				</div>
			</div>
		</div>
	);
}
export default Signup;
