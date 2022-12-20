import { createContext } from "react";

export const AppContext = createContext({
	addToast() {},
	setAppState() {},
	user: null,
	userData: null,
});
