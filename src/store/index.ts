import { createStore, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import type { AnyAction, Reducer } from 'redux';
import { authReducer } from '../modules/auth/reducer';
import type { AuthState } from '../modules/auth/types';
import { assessmentConfiguratorReducer } from '../modules/assessmentConfigurator/reducer';
import type { AssessmentConfiguratorState } from '../modules/assessmentConfigurator/types';
import { navbarReducer } from '../modules/navbar/reducer';
import type { NavbarState } from '../modules/navbar/types';
import { adminDashboardReducer } from '../modules/adminDashboard/reducer';
import type { AdminDashboardState } from '../modules/adminDashboard/types';
import { teacherDashboardReducer } from '../modules/teacherDashboard/reducer';
import type { TeacherDashboardState } from '../modules/teacherDashboard/types';
import { studentDashboardReducer } from '../modules/studentDashboard/reducer';
import type { StudentDashboardState } from '../modules/studentDashboard/types';
import { assessmentBuilderReducer } from '../modules/assessmentBuilder/reducer';
import type { AssessmentBuilderState } from '../modules/assessmentBuilder/types';
import { remedialLabReducer } from '../modules/remedialLab/reducer';
import type { RemedialLabState } from '../modules/remedialLab/types';
import { adaptiveContentReducer } from '../modules/adaptiveContent/reducer';
import type { AdaptiveContentState } from '../modules/adaptiveContent/types';

// Root state shape
export interface RootState {
  auth: AuthState;
  assessmentConfigurator: AssessmentConfiguratorState;
  navbar: NavbarState;
  adminDashboard: AdminDashboardState;
  teacherDashboard: TeacherDashboardState;
  studentDashboard: StudentDashboardState;
  assessmentBuilder: AssessmentBuilderState;
  remedialLab: RemedialLabState;
  adaptiveContent: AdaptiveContentState;
}

// Create combined reducer
const rootReducer: Reducer<RootState, AnyAction> = (state, action) => {
  if (!state) {
    return {
      auth: authReducer(undefined, action as any),
      assessmentConfigurator: assessmentConfiguratorReducer(undefined, action as any),
      navbar: navbarReducer(undefined, action as any),
      adminDashboard: adminDashboardReducer(undefined, action as any),
      teacherDashboard: teacherDashboardReducer(undefined, action as any),
      studentDashboard: studentDashboardReducer(undefined, action as any),
      assessmentBuilder: assessmentBuilderReducer(undefined, action as any),
      remedialLab: remedialLabReducer(undefined, action as any),
      adaptiveContent: adaptiveContentReducer(undefined, action as any),
    };
  }
  return {
    auth: authReducer(state.auth, action as any),
    assessmentConfigurator: assessmentConfiguratorReducer(
      state.assessmentConfigurator,
      action as any
    ),
    navbar: navbarReducer(state.navbar, action as any),
    adminDashboard: adminDashboardReducer(state.adminDashboard, action as any),
    teacherDashboard: teacherDashboardReducer(state.teacherDashboard, action as any),
    studentDashboard: studentDashboardReducer(state.studentDashboard, action as any),
    assessmentBuilder: assessmentBuilderReducer(state.assessmentBuilder, action as any),
    remedialLab: remedialLabReducer(state.remedialLab, action as any),
    adaptiveContent: adaptiveContentReducer(state.adaptiveContent, action as any),
  };
};

// Enable Redux DevTools Extension
const composeEnhancers =
  (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// Create store with thunk middleware
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

// Export types
export type AppDispatch = typeof store.dispatch;
