import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import type { AnyAction, Reducer } from 'redux';
import { authReducer } from '../modules/auth/reducer';
import type { AuthState } from '../modules/auth/types';
import { assessmentConfiguratorReducer } from '../modules/assessmentConfigurator/reducer';
import type { AssessmentConfiguratorState } from '../modules/assessmentConfigurator/types';

// Root state shape
export interface RootState {
  auth: AuthState;
  assessmentConfigurator: AssessmentConfiguratorState;
}

// Create combined reducer
const rootReducer: Reducer<RootState, AnyAction> = (state, action) => {
  if (!state) {
    return {
      auth: authReducer(undefined, action as any),
      assessmentConfigurator: assessmentConfiguratorReducer(undefined, action as any),
    };
  }
  return {
    auth: authReducer(state.auth, action as any),
    assessmentConfigurator: assessmentConfiguratorReducer(state.assessmentConfigurator, action as any),
  };
};

// Enable Redux DevTools Extension
const composeEnhancers = 
  (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// Create store with thunk middleware
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

// Export types
export type AppDispatch = typeof store.dispatch;

