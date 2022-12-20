import { contestPhases } from "../common/enums/contest.enum";

export const setContestPhase = (obj) => {
	if (
		obj.startPhaseOne >= Date.now() &&
		obj.startPhaseOne > Date.now() &&
		obj.startPhaseTwo > Date.now()
	) {
		obj.phaseStatus = contestPhases.UPCOMING;
	} else if (
		obj.startPhaseOne < Date.now() &&
		obj.startPhaseTwo >= Date.now() &&
		obj.startPhaseThree >= Date.now()
	) {
		obj.phaseStatus = contestPhases.PHASE_ONE;
	} else if (
		obj.startPhaseOne < Date.now() &&
		obj.startPhaseTwo < Date.now() &&
		obj.startPhaseThree >= Date.now()
	) {
		obj.phaseStatus = contestPhases.PHASE_TWO;
	} else if (
		obj.startPhaseOne < Date.now() &&
		obj.startPhaseTwo < Date.now() &&
		obj.startPhaseThree < Date.now()
	) {
		obj.phaseStatus = contestPhases.PHASE_THREE;
	}
	return obj;
};

// export const setContestPhase = (obj) => {
// 	if (obj.startPhaseOne >= Date.now()) {
// 		obj.phaseStatus = contestPhases.UPCOMING;
// 	} else if (
// 		obj.startPhaseOne < Date.now() &&
// 		obj.startPhaseTwo < Date.now() &&
// 		obj.startPhaseThree <= Date.now()
// 	) {
// 		obj.phaseStatus = contestPhases.PHASE_THREE;
// 	} else if (
// 		obj.startPhaseOne < Date.now() &&
// 		obj.startPhaseTwo >= Date.now()
// 	) {
// 		obj.phaseStatus = contestPhases.PHASE_ONE;
// 	} else if (
// 		obj.startPhaseOne < Date.now() &&
// 		obj.startPhaseTwo <= Date.now() &&
// 		obj.startPhaseThree > Date.now()
// 	) {
// 		obj.phaseStatus = contestPhases.PHASE_TWO;
// 	}
// 	return obj;
// };
