import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

function Authenticated({ children, user, loading }) {
	const location = useLocation();
	const [loadingStatus, setLoadingStatus] = useState(loading);

	useEffect(() => {
		setLoadingStatus(loading);
	}, [loading]);

	if (!loadingStatus && !user)
		return <Navigate to="/login" state={{ from: location }} />;

	return children;
}

export default Authenticated;
