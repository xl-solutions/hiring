import { Component } from "react";
import axios from "axios";


export default class PhotoViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      userData: {},
      albumData: {},
      curPhotoIndex: 0
    };
  }

  componentDidMount()
  {
    // fotos do álbum
    axios({
      url: `https://jsonplaceholder.typicode.com/albums/${this.props.id}/photos`,
      method: "GET"
    })
    .then(response => this.setState({ photos: response.data}));
  
    // dados do usuário
    /// TODO https://github.com/LucoEldritch/hiring/issues/6
    axios({
      url: `https://jsonplaceholder.typicode.com/users/${this.props.idUser}`,
      method: "GET"
    })
    .then(response => this.setState({ userData: response.data}));

    // dados do álbum
    axios({
      url: `https://jsonplaceholder.typicode.com/albums/${this.props.id}`,
      method: "GET"
    })
    .then(response => this.setState({ albumData: response.data }));
  }

  handlePhotoClick = idx => this.setState({ curPhotoIndex: idx });

  render() {
    let curPhotoObj = null;
    if (this.state.photos.length)
    {
      let curPhoto = this.state.photos[this.state.curPhotoIndex];
      curPhotoObj = <img src={curPhoto.url} alt={curPhoto.title} />;
    }
    return (
      <div className="App">
        <h1>Visualizador de Imagens</h1>
        <h2>Álbum {this.state.albumData.title} <small>por {this.state.userData.name}</small></h2>
        {curPhotoObj}
        {
          this.state.photos
            .map((photoData, index) => <img key={photoData.id} src={photoData.thumbnailUrl} alt={photoData.title} onClick={() => this.handlePhotoClick(index)}/>)
        }
      </div>
    )
  };
};