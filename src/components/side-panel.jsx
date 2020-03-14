import React from "react";
import { connect } from "react-redux";
import Button from "./button";
import List from "./list";
import { validateVideo } from "../redux/actions/player.actions";

class SidePanel extends React.Component {
  constructor() {
    super();
    this.state = {
      url: ""
    };
  }
  /**Adding to list:
   * Check if link is valid
   * Check if video is available
   * Then add to list
   */
  handleAdd = e => {
    e.preventDefault();
    this.props.validateVideo(this.state.url);
    this.setState({ url: "" }, () => console.log("Input erased"));
  };

  //Input
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { title } = this.props;
    const { url } = this.state;
    return (
      <div className="side-panel">
        <h3>{title}</h3>
        <List />
        <input
          type="text"
          placeholder="Youtube URL"
          name="url"
          value={url}
          onChange={this.handleChange}
        />
        <Button handleChange={this.handleAdd}>ADD URL</Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  title: state.title,
  loader: state.loader
});

const mapDispatchToProps = dispatch => ({
  validateVideo: url => dispatch(validateVideo(url))
});
export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);
