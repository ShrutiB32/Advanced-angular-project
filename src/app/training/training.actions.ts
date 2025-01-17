import { Action } from "@ngrx/store";
import { IExercise } from "./exercise.model";

export const SET_AVAILABLE_TRAININGS = '[Training] Set Available Trainings';
export const SET_FINISHED_TRAININGS = '[Training] Set Finished Trainings';
export const START_TRAINING = '[Training] Start Trainings';
export const STOP_TRAINING = '[Training] Stop Trainings';

export class SetAvailableTrainings implements Action {
    readonly type = SET_AVAILABLE_TRAININGS;
    constructor(public payload: IExercise[]){

    }
}

export class SetFinishedTrainings implements Action {
    readonly type = SET_FINISHED_TRAININGS;
    constructor(public payload: IExercise[]){
        
    }
}

export class StartTraining implements Action {
    readonly type = START_TRAINING;
    constructor(public payload: string){
    }
}

export class StopTraining implements Action {
    readonly type = STOP_TRAINING;
}


export type TrainingActions = SetAvailableTrainings | SetFinishedTrainings | StartTraining | StopTraining;