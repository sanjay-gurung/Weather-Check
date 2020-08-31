import { Action } from '@ngrx/store';

export const START_SPINNER = 'START_SPINNER';
export const STOP_SPINNER = 'STOP_SPINNER';

export class StartSpinner implements Action {
    type: string = START_SPINNER;    
}

export class StopSpinner implements Action {
    type: string = STOP_SPINNER;
}

export type SpinnerActions = StartSpinner | StopSpinner