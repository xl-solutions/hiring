import { Component } from "react";
import axios from "axios";

import Comment from "./Comment";

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // vou ignorar atualizações das propriedades, já que quero poder editar/excluir sem atualizar a lista externa
      postData: props,
      commentsData: [],
      isCommentsVisible: false,
      isEditing: false
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
    console.log(postData);
    if (Object.keys(postData).length === 0)  // caso tenha sido deletado
    {
      return null;
    }
    if (this.state.isCommentsVisible)
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

    let titleBox = <h3>{postData.title}</h3>;
    let postBody = <p>{postData.body}</p>;
    let editPostButton = <button onClick={this.editPostButtonAction}>Editar Comentário</button>;
    if (this.state.isEditing)
    {

      titleBox = <label>Título: <input type="text" defaultValue={postData.title} onChange={this.titleChange} /></label>;
      postBody = <label>Post: <textarea defaultValue={postData.body} onChange={this.postChange} /></label>;
      editPostButton = <button onClick={this.editPostSubmit}>Salvar Edição</button>;
    }
    
    return (
      <div className="post">
        {titleBox}
        {postBody}
        {editPostButton}
        <button onClick={this.toggleCommentsAction}>
          {
            this.state.isCommentsVisible
              ? "Esconder Comentários"
              : "Mostrar Comentários"
          }
        </button>
        <button onClick={this.deletePostSubmit}>Deletar</button>
        {commentsBox}
      </div>
    )
  };

  toggleCommentsAction = () => this.setState({ isCommentsVisible: !this.state.isCommentsVisible });

  editPostButtonAction = () => this.setState({ isEditing: true });

  titleChange = e => this.setState({ inputTitle: e.target.value });

  postChange = e => this.setState({ inputText: e.target.value });

  editPostSubmit = () => axios({
    url: `https://jsonplaceholder.typicode.com/posts/${this.props.id}/`,
    method: "PATCH",
    data: {
      title: this.state.inputTitle,
      body: this.state.inputText
    }
  })
  .then(response => this.setState({ postData: response.data, isEditing: false }));

  deletePostSubmit = () => axios({
    url: `https://jsonplaceholder.typicode.com/posts/${this.props.id}/`,
    method: "DELETE"
  })
  .then(response => this.setState({ postData: response.data }));
};