/**
 * Assessment Builder Module Actions
 */

import {
  ASSESSMENT_BUILDER_LOAD_REQUEST,
  ASSESSMENT_BUILDER_LOAD_SUCCESS,
  ASSESSMENT_BUILDER_LOAD_FAILURE,
  ASSESSMENT_BUILDER_SET_ACTIVE_TAB,
} from './reducer';

export interface AssessmentBuilderLoadRequestAction {
  type: typeof ASSESSMENT_BUILDER_LOAD_REQUEST;
}

export interface AssessmentBuilderLoadSuccessAction {
  type: typeof ASSESSMENT_BUILDER_LOAD_SUCCESS;
}

export interface AssessmentBuilderLoadFailureAction {
  type: typeof ASSESSMENT_BUILDER_LOAD_FAILURE;
  payload: string;
}

export interface AssessmentBuilderSetActiveTabAction {
  type: typeof ASSESSMENT_BUILDER_SET_ACTIVE_TAB;
  payload: 'assessment' | 'revision' | 'lesson' | 'remedial';
}

export type AssessmentBuilderAction =
  | AssessmentBuilderLoadRequestAction
  | AssessmentBuilderLoadSuccessAction
  | AssessmentBuilderLoadFailureAction
  | AssessmentBuilderSetActiveTabAction;

export const assessmentBuilderLoadRequest = (): AssessmentBuilderLoadRequestAction => ({
  type: ASSESSMENT_BUILDER_LOAD_REQUEST,
});

export const assessmentBuilderLoadSuccess = (): AssessmentBuilderLoadSuccessAction => ({
  type: ASSESSMENT_BUILDER_LOAD_SUCCESS,
});

export const assessmentBuilderLoadFailure = (
  payload: string
): AssessmentBuilderLoadFailureAction => ({
  type: ASSESSMENT_BUILDER_LOAD_FAILURE,
  payload,
});

export const assessmentBuilderSetActiveTab = (
  payload: 'assessment' | 'revision' | 'lesson' | 'remedial'
): AssessmentBuilderSetActiveTabAction => ({
  type: ASSESSMENT_BUILDER_SET_ACTIVE_TAB,
  payload,
});
