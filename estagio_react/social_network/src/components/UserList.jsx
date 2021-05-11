import { Component } from "react"
import axios from "axios";

import UserCard from "./UserCard"

export default class UserList extends Component {
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
        <h1>Visualizar {this.props.title} do Usuário</h1>
        {this.state.userList.map((userData) => <UserCard data={userData} type={this.props.type} key={userData.id}/>)}
      </div>
    )
  };
};