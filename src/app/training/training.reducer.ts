import { TrainingActions, SET_AVAILABLE_TRAININGS,SET_FINISHED_TRAININGS,START_TRAINING,STOP_TRAINING } from "./training.actions";
import { IExercise } from "./exercise.model";
import * as fromRoot from '../app.reducer';
import { Action ,createFeatureSelector, createSelector} from '@ngrx/store'

export interface TrainingState {
    availableExercises: IExercise[];
    finishedExercises: IExercise[];
    activeTraining: IExercise[];
}

export interface State extends fromRoot.State {
    training: TrainingState;
}

const initialState: TrainingState = {
    availableExercises: [],
    finishedExercises: [],
    activeTraining: []
};

export function trainingReducer(state=initialState, action: TrainingActions) {
  
    switch(action.type) {
        case SET_AVAILABLE_TRAININGS:
            return {
                ...state,
                availableExercises: action.payload
            };
        case SET_FINISHED_TRAININGS:
            return {
                ...state,
                finishedExercises: action.payload
        };
        case START_TRAINING:
            return {
                ...state,
                activeTraining: {...state.availableExercises.find(ex => ex.id === action.payload)}
        };
        case STOP_TRAINING:
            return {
                ...state,
                activeTraining: null
        };
        default: {
            return state;
        }
    

    }
}


export const getTrainingState = createFeatureSelector<any>('training');

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinishedExercises = createSelector(getTrainingState,(state: TrainingState) => state.finishedExercises);
export const getActiveTraining = createSelector(getTrainingState,(state: TrainingState) => state.activeTraining);
export const getIsTraining = createSelector(getTrainingState,(state: TrainingState) => state.activeTraining != null);