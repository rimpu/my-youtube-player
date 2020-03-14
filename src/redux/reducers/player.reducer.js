import ActionTypes from "../constants/actions.types";

const INITIAL_STATE = {
  playlist: []
  //loader: false
};

const PlayerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ActionTypes.ADD_VIDEO:
      const foundItem = state.playlist.filter(elem => {
        return Object.keys(elem)[0] === action.song_id;
      });
      if (foundItem.length === 0)
        return {
          playlist: [...state.playlist, { [action.song_id]: action.title }]
        };
      else {
        return state;
      }
    case ActionTypes.MOVE_UP:
      let array = [...state.playlist];
      let temp = array[action.song_id - 1];
      array[action.song_id - 1] = array[action.song_id];
      array[action.song_id] = temp;
      return { playlist: [...array] };
    case ActionTypes.MOVE_DOWN:
      let array_down = [...state.playlist];
      let temp1 = array_down[action.song_id + 1];
      array_down[action.song_id + 1] = array_down[action.song_id];
      array_down[action.song_id] = temp1;
      return { playlist: [...array_down] };
    case ActionTypes.REMOVE_VIDEO:
      let updatedPlayList = "";
      if (action.song_id === 0 && state.playlist.length > 0) {
        state.playlist.shift();
        updatedPlayList = state.playlist;
      } else {
        updatedPlayList = state.playlist.filter(elem => {
          return Object.keys(elem)[0] !== action.song_id;
        });
      }
      return { playlist: [...updatedPlayList] };
    default:
      return state;
  }
};

export default PlayerReducer;
