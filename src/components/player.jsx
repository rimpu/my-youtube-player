import React from "react";
import YouTube from "react-youtube";
import { connect } from "react-redux";
import { removeVideo } from "../redux/actions/player.actions";

//playlist: ["909NfO1St0A", "7fa0DiTHIGg", "3qX8gWpR3bY"],

class MyYouTubePlayer extends React.Component {
  /**Player methods */
  stateChange = e => {
    console.log("state changed");
    // let { title } = e.target.l.videoData;
    // this.setState({
    //   title
    // });
  };

  _onEnd = e => {
    console.log("ended");
    this.props.removeVideo(0);
    // const [, ...rest] = this.state.playlist;
    // console.log(rest);
    // this.setState({
    //   playlist: rest
    // });
  };

  _onReady = e => {
    console.log("ready", e.target.l);
    e.target.pauseVideo();
  };

  render() {
    const { playlist } = this.props;
    const [play] = playlist;
    let videoId = "";
    if (play) {
      videoId = Object.keys(play)[0];
    }
    console.log(videoId);
    const opts = {
      height: "300",
      width: "500",

      playerVars: {
        autoplay: 1,
        showRelatedVideos: false
      }
    };

    return (
      <div>
        <YouTube
          videoId={videoId}
          opts={opts}
          onEnd={this._onEnd}
          className="player"
          onStateChange={this.stateChange}
          onReady={this._onReady}
          showRelatedVideo={false}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  playlist: state.playlist
});

const mapDispatchToProps = dispatch => ({
  removeVideo: song_id => dispatch(removeVideo(song_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(MyYouTubePlayer);
