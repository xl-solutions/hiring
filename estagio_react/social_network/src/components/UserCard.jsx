import { Component } from "react";
import { Link } from "react-router-dom";

export default class UserCard extends Component {
  render() {
    const {type, data} = this.props;
    return (
      <div>
        <Link to={`/${type}/${data.id}`}>
          <h2>{data.name} <small>@{data.username}</small></h2>
        </Link>
      </div>
    )
  };
};