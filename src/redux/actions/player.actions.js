import ActionTypes from "../constants/actions.types";

export const addVideo = (song_id, title) => {
  console.log("adding...");
  return { type: ActionTypes.ADD_VIDEO, song_id, title };
};

// export const validatingVideo = () => ({
//   type: ActionTypes.VALIDATE_URL
// });

export const validateVideo = url => {
  console.log("validating");

  return dispatch => {
    const checkRegex = /https?:\/\/www[.]youtube[.]com\/watch[?]v=[a-zA-Z0-9]+/;
    let isUrlValid = checkRegex.test(url);
    let id = "";
    if (isUrlValid) {
      const regex = /www[.]youtube[.]com\/watch[?]v=([a-zA-Z0-9]+)/;
      id = regex.exec(url);
      // fetch(
      //   `https://www.googleapis.com/youtube/v3/videos?part=id&id=${id}&key=AIzaSyCFRX6WxUf5LrOsJBWAe1lIpoT3WqAB9Xo`
      // )
      //   .then(res => res.json())
      //   .then(data => {
      //     console.log("validated");
      //     if (data.items.length > 0) {
      //       dispatch(addVideo(id[1]));
      //     }
      //   })
      //   .catch(err => console.log("no response yet"));
      fetch(
        `https://www.googleapis.com/youtube/v3/videos?id=${id}&key=AIzaSyCFRX6WxUf5LrOsJBWAe1lIpoT3WqAB9Xo&fields=items(id,snippet(channelId,title,categoryId),statistics)&part=snippet,statistics`
      )
        .then(res => res.json())
        .then(data => {
          console.log("validating...");
          if (data.items.length > 0) {
            console.log(data.items[0].id, data.items[0].snippet.title);
            dispatch(addVideo(data.items[0].id, data.items[0].snippet.title));
          }
        })
        .catch(e => console.log(e));
    }
  };
};

export const removeVideo = song_id => ({
  type: ActionTypes.REMOVE_VIDEO,
  song_id
});

export const moveUp = song_id => ({
  type: ActionTypes.MOVE_UP,
  song_id
});

export const moveDown = song_id => ({
  type: ActionTypes.MOVE_DOWN,
  song_id
});
