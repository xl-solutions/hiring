import { Component } from "react";

export default class Comment extends Component {
  render() {
    const data = this.props;
    return (
      <div className="comment">
          <h5>{data.name} <small className="email">({data.email})</small></h5>
          <p>{data.body}</p>
      </div>
    )
  };
};