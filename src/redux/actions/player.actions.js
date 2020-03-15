import actionTypes from "../constants/actions.types";
import API_KEY from "../../config/config";

export const addPlayListToStore = playlist => {
  return {
    type: actionTypes.ADD_PLAYLIST,
    playlist
  };
};

export const addVideo = (song_id, title) => {
  return { type: actionTypes.ADD_VIDEO, song_id, title };
};

export const validateVideo = url => {
  return dispatch => {
    dispatch(invalidVideo("")); //Empty
    const checkRegex = /https?:\/\/www[.]youtube[.]com\/watch[?]v=([_!@#$()\-`\^+a-zA-Z0-9]+)&?([[_!@#$()\-`\^+a-zA-Z0-9]+)?/;
    let isUrlValid = checkRegex.test(url);
    let id = "";
    if (isUrlValid) {
      const regex = /www[.]youtube[.]com\/watch[?]v=([_!@#$&()\-`\^+a-zA-Z0-9]+)&?([[_!@#$()\-`\^+a-zA-Z0-9]+)?/;
      id = regex.exec(url);
      //Use your own YouTube Data API key
      fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${id[1]}&key=${API_KEY.API_KEY}&fields=items(id,snippet(channelId,title,categoryId),statistics)&part=snippet,statistics`
      )
        .then(res => res.json())
        .then(data => {
          if (data.items.length > 0) {
            dispatch(addVideo(data.items[0].id, data.items[0].snippet.title));
          } else {
            dispatch(invalidVideo("Invalid video URL"));
          }
        })
        .catch(e => dispatch(invalidVideo("Invalid video URL")));
    } else {
      dispatch(invalidVideo("Invalid video URL"));
    }
  };
};

export const removeVideo = song_id => {
  return dispatch => {
    dispatch(invalidVideo("")); //Empty
    dispatch(deleteVideo(song_id));
  };
};

export const deleteVideo = song_id => {
  return {
    type: actionTypes.REMOVE_VIDEO,
    song_id
  };
};

export const moveUp = song_id => ({
  type: actionTypes.MOVE_UP,
  song_id
});

export const moveDown = song_id => ({
  type: actionTypes.MOVE_DOWN,
  song_id
});

export const invalidVideo = error => ({
  type: actionTypes.VIDEO_ERROR,
  error
});
