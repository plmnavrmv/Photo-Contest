import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import addDays from "date-fns/addDays";
import { contestValidation } from "../../common/enums/contest.enum";
import "react-datepicker/dist/react-datepicker.css";

//https://reactdatepicker.com/#example-date-range-for-one-datepicker-with-disabled-dates-highlighted
function CustomDate({
	startPhaseOne,
	setStartPhaseOne,
	startPhaseTwo,
	setStartPhaseTwo,
}) {
	const onChange = (dates) => {
		const [start, end] = dates;
		console.log(start, end);
		setStartPhaseOne(start);
		setStartPhaseTwo(end);
	};

	return (
		<DatePicker
			selected={startPhaseOne}
			onChange={onChange}
			startDate={startPhaseOne}
			endDate={startPhaseTwo}
			minDate={new Date()}
			maxDate={addDays(startPhaseOne, contestValidation.MAX_DURATION_PHASE_ONE)}
			isClearable={true}
			dateFormat="yyyy:mm:dd hh:mm:ss.msmsms"
			placeholderText="Calendar"
			selectsRange
			selectsDisabledDaysInRange
			withPortal
		/>
	);
}

export default CustomDate;
