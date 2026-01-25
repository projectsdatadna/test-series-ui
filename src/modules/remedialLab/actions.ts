/**
 * Remedial Lab Module Actions
 */

import {
  REMEDIAL_LAB_LOAD_REQUEST,
  REMEDIAL_LAB_LOAD_SUCCESS,
  REMEDIAL_LAB_LOAD_FAILURE,
  REMEDIAL_LAB_SET_SELECTED_STUDENT,
  REMEDIAL_LAB_SET_ACTIVE_TAB,
} from './reducer';
import type { StudentConceptGap, RemedialLabState } from './types';

export interface RemedialLabLoadRequestAction {
  type: typeof REMEDIAL_LAB_LOAD_REQUEST;
}

export interface RemedialLabLoadSuccessAction {
  type: typeof REMEDIAL_LAB_LOAD_SUCCESS;
}

export interface RemedialLabLoadFailureAction {
  type: typeof REMEDIAL_LAB_LOAD_FAILURE;
  payload: string;
}

export interface RemedialLabSetSelectedStudentAction {
  type: typeof REMEDIAL_LAB_SET_SELECTED_STUDENT;
  payload: StudentConceptGap | null;
}

export interface RemedialLabSetActiveTabAction {
  type: typeof REMEDIAL_LAB_SET_ACTIVE_TAB;
  payload: RemedialLabState['activeTab'];
}

export type RemedialLabAction =
  | RemedialLabLoadRequestAction
  | RemedialLabLoadSuccessAction
  | RemedialLabLoadFailureAction
  | RemedialLabSetSelectedStudentAction
  | RemedialLabSetActiveTabAction;

export const remedialLabLoadRequest = (): RemedialLabLoadRequestAction => ({
  type: REMEDIAL_LAB_LOAD_REQUEST,
});

export const remedialLabLoadSuccess = (): RemedialLabLoadSuccessAction => ({
  type: REMEDIAL_LAB_LOAD_SUCCESS,
});

export const remedialLabLoadFailure = (payload: string): RemedialLabLoadFailureAction => ({
  type: REMEDIAL_LAB_LOAD_FAILURE,
  payload,
});

export const remedialLabSetSelectedStudent = (
  payload: StudentConceptGap | null
): RemedialLabSetSelectedStudentAction => ({
  type: REMEDIAL_LAB_SET_SELECTED_STUDENT,
  payload,
});

export const remedialLabSetActiveTab = (
  payload: RemedialLabState['activeTab']
): RemedialLabSetActiveTabAction => ({
  type: REMEDIAL_LAB_SET_ACTIVE_TAB,
  payload,
});
