import {TOGGLE_ACTIVITY, ADD_ACTIVITY} from '~/redux/actions/activity';

const INITIAL_STATE = {
  history: [],
};

export default function activity(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_ACTIVITY:
      return {
        ...state,
        selectedActivity: action.payload.selectedActivity,
      };

    case ADD_ACTIVITY:
      return {
        ...state,
        history: [
          ...state.history,
          {
            activity: {
              description: action.payload.activity,
              checkinStatus: action.payload.status,
              checkinDate: action.payload.date,
            },
            gym: action.payload.gym,
          },
        ],
      };

    default:
      return state;
  }
}
console.tron.log(activity);
