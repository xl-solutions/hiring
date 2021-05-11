import { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class UserAlbums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userAlbumsList: [],
      userData: {}
    };
  }

  componentDidMount()
  {
    axios({
      url: `https://jsonplaceholder.typicode.com/users/${this.props.id}/albums`,
      method: "GET"
    })
    .then(response => this.setState({ userAlbumsList: response.data }));
    
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
        <h1>Álbums de {this.state.userData.name}</h1>
        <ul>
        {
          this.state.userAlbumsList
            .map((userAlbumData) => 
            <li>
              <Link to={`/album/${this.props.id}/${userAlbumData.id}`} key={userAlbumData.id}>{userAlbumData.title}</Link>
            </li>)
        }
        </ul>
      </div>
    )
  };
};