import * as fromUi from './shared/ui.reducer';
import { ActionReducerMap, createFeatureSelector,createSelector } from '@ngrx/store'
import { UIActions } from './shared/ui.actions';
import * as fromAuth from './auth/auth.reducer';
import { AuthActions } from './auth/auth.actions';

export interface State {
    ui:fromUi.State;
    auth: fromAuth.State
}

export const reducers: ActionReducerMap<any ,any> = {
    ui: fromUi.uiReducer,
    auth: fromAuth.authReducer
};


export const getUiState = createFeatureSelector<fromUi.State>('ui');
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);