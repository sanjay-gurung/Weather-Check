import * as Actions from './spinner.action';

export function reducer(state = { isOn: false }, action: Actions.SpinnerActions) {
    switch (action.type) {
      // case 'startSpinner': {
      case Actions.START_SPINNER: {
        return {
          isOn: true
        };
      }
      // case 'stopSpinner': {
      case Actions.STOP_SPINNER: {
        return {
          isOn: false
        };
      }
  
      default:
        return state;
    }
  }