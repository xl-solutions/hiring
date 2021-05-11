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
    /* vale citar que tem uma inconsistência aqui onde pode-se passar pela url por exemplo algo como /1/11, então
      ele vai mostrar os dados do usuário de id 1 e os dados do álbum de id 11, apesar do álbum de id 11
      pertencer a outro usuário
    */
    let curPhotoObj = null;
    if (this.state.photos.length)
    {
      let curPhoto = this.state.photos[this.state.curPhotoIndex];
      curPhotoObj = <img src={curPhoto.url} alt={curPhoto.title} className="album-cur-photo" />;
    }
    return (
      <div>
        <h1>Visualizador de Imagens</h1>
        <h2>Álbum {this.state.albumData.title} <small>por {this.state.userData.name}</small></h2>
        {curPhotoObj}
        <div className="thumbs">
        {
          this.state.photos
            .map((photoData, index) => <img key={photoData.id} src={photoData.thumbnailUrl} alt={photoData.title} onClick={() => this.handlePhotoClick(index)} className="album-thumb" />)
        }
        </div>
      </div>
    )
  };
};