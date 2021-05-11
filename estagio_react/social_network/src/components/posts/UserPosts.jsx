import { Component } from "react";
import axios from "axios";

import Post from "./Post";

export default class UserPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPostsList: [],
      userData: {}
    };
  }

  componentDidMount()
  {
    axios({
      url: `https://jsonplaceholder.typicode.com/users/${this.props.id}/posts`,
      method: "GET"
    })
    .then(response => this.setState({ userPostsList: response.data }));
    
    // TODO https://github.com/LucoEldritch/hiring/issues/6
    axios({
      url: `https://jsonplaceholder.typicode.com/users/${this.props.id}`,
      method: "GET"
    })
    .then(response => this.setState({ userData: response.data }));
  }

  render() {
    return (
      <div className="App">
        <h1>Posts de {this.state.userData.name}</h1>
        <div>
        {
          this.state.userPostsList
            .map((userPostData) => <Post {...userPostData} key={userPostData.id} />)
        }
        </div>
      </div>
    )
  };
};