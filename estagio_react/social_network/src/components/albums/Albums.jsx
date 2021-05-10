import { Component } from "react";
import axios from "axios";
import UserAlbumCard from "./UserAlbumCard";

export default class Albums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userList: []
    };
  }

  componentDidMount()
  {
    axios({
      url: "https://jsonplaceholder.typicode.com/users/",
      method: "GET"
    })
    .then((response) => this.setState({userList: response.data}));
  }

  render() {
    return (
      <div>
        <h1>Visualizar Álbums do Usuário</h1>
        {this.state.userList.map((userData) => <UserAlbumCard data={userData} key={userData.id}/>)}
      </div>
    )
  };
};