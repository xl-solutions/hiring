import React, { Component } from 'react'
import { connect } from 'react-redux'
import { uploadRequest } from '../redux/actions'
import FlatButton from 'material-ui/FlatButton'
import Subheader from 'material-ui/Subheader';

const styles = {
    div: {
        display: "flex",
        flexDirection: "column"
    }
}

class UploadButtonComponent extends Component {

    handleFileChange = (event) => {
        console.log(event.target.value)
        this.props.uploadRequest(event.target.files[0])
    }

    render() {
        return (
            <div style={styles.div}>
                {this.props.uploading 
                    ?
                    <span>Enviando inventário...</span>
                    : 
                    <div>                        
                        {this.props.error && 
                            <span>{this.props.error}</span> ||
                            <span>Enviar Inventário</span>
                        }
                        <br/>
                        <FlatButton
                            >
                            <input 
                                type="file" 
                                onChange={this.handleFileChange}
                                />
                        </FlatButton> 
                    </div>
                }
            </div>
        )
    }
}

export const UploadButton = connect(
    state => ({
        uploading: state.upload.uploading,
        error: state.upload.error
    }),
    {
        uploadRequest
    }
)(UploadButtonComponent)