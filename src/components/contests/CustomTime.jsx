import React from "react";
import DatePicker from "react-datepicker";
import addDays from "date-fns/addDays";
import { contestValidation } from "../../common/enums/contest.enum";

import "react-datepicker/dist/react-datepicker.css";

// https://reactdatepicker.com/#example-date-range-for-one-datepicker-with-disabled-dates-highlighted
function CustomTime({ startPhaseTwo, setStartPhaseThree }) {
	const transition = startPhaseTwo
		? addDays(startPhaseTwo, contestValidation.MAX_DURATION_PHASE_TWO)
		: null;

	return (
		<DatePicker
			selected={transition}
			onChange={(date) => setStartPhaseThree(date)}
			minDate={new Date()}
			maxDate={new Date()}
			showTimeSelect
			timeFormat="HH:mm"
			timeIntervals={contestValidation.TIME_INTERVAL}
			timeCaption="time"
			dateFormat="yyyy:mm:dd hh:mm:ss.msmsms"
			placeholderText="Calendar"
			withPortal
		/>
	);
}

export default CustomTime;
