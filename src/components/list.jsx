import React from "react";
import ListItem from "./list-item";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure({
  autoClose: 2000,
  draggable: false
});

class List extends React.Component {
  notify = () =>
    toast("Video Added", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  // componentDidUpdate() {
  //   this.notify();
  // }
  render() {
    const { playlist } = this.props;
    return (
      <div className="list">
        {playlist &&
          playlist.map((song, index) => (
            <ListItem
              index={index}
              title={Object.values(song)[0]}
              key={index}
            />
          ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  playlist: state.playlist
});

export default connect(mapStateToProps)(List);
