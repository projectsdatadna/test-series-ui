/**
 * Adaptive Content Module Actions
 */

import {
  ADAPTIVE_CONTENT_LOAD_REQUEST,
  ADAPTIVE_CONTENT_LOAD_SUCCESS,
  ADAPTIVE_CONTENT_LOAD_FAILURE,
  ADAPTIVE_CONTENT_UPDATE_CREDITS,
} from './reducer';

export interface AdaptiveContentLoadRequestAction {
  type: typeof ADAPTIVE_CONTENT_LOAD_REQUEST;
}

export interface AdaptiveContentLoadSuccessAction {
  type: typeof ADAPTIVE_CONTENT_LOAD_SUCCESS;
}

export interface AdaptiveContentLoadFailureAction {
  type: typeof ADAPTIVE_CONTENT_LOAD_FAILURE;
  payload: string;
}

export interface AdaptiveContentUpdateCreditsAction {
  type: typeof ADAPTIVE_CONTENT_UPDATE_CREDITS;
  payload: number;
}

export type AdaptiveContentAction =
  | AdaptiveContentLoadRequestAction
  | AdaptiveContentLoadSuccessAction
  | AdaptiveContentLoadFailureAction
  | AdaptiveContentUpdateCreditsAction;

export const adaptiveContentLoadRequest = (): AdaptiveContentLoadRequestAction => ({
  type: ADAPTIVE_CONTENT_LOAD_REQUEST,
});

export const adaptiveContentLoadSuccess = (): AdaptiveContentLoadSuccessAction => ({
  type: ADAPTIVE_CONTENT_LOAD_SUCCESS,
});

export const adaptiveContentLoadFailure = (payload: string): AdaptiveContentLoadFailureAction => ({
  type: ADAPTIVE_CONTENT_LOAD_FAILURE,
  payload,
});

export const adaptiveContentUpdateCredits = (
  payload: number
): AdaptiveContentUpdateCreditsAction => ({
  type: ADAPTIVE_CONTENT_UPDATE_CREDITS,
  payload,
});
