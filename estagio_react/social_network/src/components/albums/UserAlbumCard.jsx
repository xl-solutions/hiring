import { Component } from "react";
import { Link } from "react-router-dom";

export default class UserAlbumCard extends Component {
  render() {
    const {data} = this.props;
    return (
      <div>
        <Link to={`/album/${data.id}`}>
          <h2>{data.name} <small>@{data.username}</small></h2>
        </Link>
      </div>
    )
  };
};