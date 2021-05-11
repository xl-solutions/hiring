import { Component } from "react"
import axios from "axios";

import UserPostCard from "./UserPostCard"

export default class Posts extends Component {
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
    .then((response) => this.setState({ userList: response.data }));
  }

  render() {
    return (
      <div>
        <h1>Visualizar Posts do Usuário</h1>
        {this.state.userList.map((userData) => <UserPostCard data={userData} key={userData.id}/>)}
      </div>
    )
  };
};