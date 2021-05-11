import { Component } from "react";
import axios from "axios";

import Comment from "./Comment";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postData: props,
      commentsData: [],
      commentsVisible: false
    };
  }

  componentDidMount()
  {
    // https://github.com/LucoEldritch/hiring/issues/6 - na verdade não se aplica aqui (a menos que saia e volte pra tela)
    axios({
      url: `https://jsonplaceholder.typicode.com/posts/${this.props.id}/comments`,
      method: "GET"
    })
    .then(response => this.setState({ commentsData: response.data }));
  }

  render() {
    let commentsBox = null;
    let {postData} = this.state;
    if (postData === undefined) // caso tenha sido deletado
    {
      return null;
    }
    if (this.state.commentsVisible)
    {
      commentsBox =
      <div>
        {
        this.state.commentsData
          .map((commentData) => <Comment {...commentData} key={commentData.id} />
          )
        }
      </div>
    }

    return (
      <div className="post">
        <h3>{postData.title}</h3>
        <p>
          {postData.body}
        </p>
        <button onClick={this.toggleComments}>
          {
            this.state.commentsVisible
              ? "Esconder Comentários"
              : "Mostrar Comentários"
          }
        </button>
        <button onClick={this.deletePostSubmit}>Deletar</button>
        {commentsBox}
      </div>
    )
  };

  toggleComments = () => this.setState({ commentsVisible: !this.state.commentsVisible });

  // TODO
  // editPostButton = id => 

  editPostSubmit = (title, text) => axios({
    url: `https://jsonplaceholder.typicode.com/posts/${this.props.id}/`,
    method: "PATCH",
    body: {
      title: title,
      body: text
    }
  })
  .then(response => this.setState({ postData: response.Data }));

  deletePostSubmit = () => axios({
    url: `https://jsonplaceholder.typicode.com/posts/${this.props.id}/`,
    method: "DELETE"
  })
  .then(response => this.setState({ postData: response.Data }));
};