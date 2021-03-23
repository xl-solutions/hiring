import React, { Component } from 'react'
import axios from 'axios';
import Main from '../templates/Main'

const headerProps ={
    icon: 'users',
    title: 'Cadastro de postagem',
    subtitle: 'Cadastro de usuarios: Crud'
}


const baseUrl = 'http://localhost:3001/posts'

const initialState ={
    blog:{titulo:'', desc: '', comentario:''},
    list:[]
}


export default class UserCrud extends Component {
    state = {...initialState}
    //Carregar a lista de postagens
    componentWillMount(){
        axios(baseUrl).then(resp =>{
            this.setState({list:resp.data})

        })
    }
    clear(){
        this.setState({blog: initialState.blog})
    }
    getUpdateList(blog, add=true){
        const list = this.state.list.filter(u=>u.id !== blog.id)
        if(add) list.unshift(blog) //se usuario estiver setado, ai adiciona na lista, senao remova
        return list
    }

    save(){
        const blog = this.state.blog
        const method = blog.id ? 'put' : 'post'
        const url = blog.id ? `${baseUrl}/${blog.id}`: baseUrl
        axios[method](url,blog)
        .then (resp =>{
            const list = this.getUpdateList(resp.data)
            this.setState({blog: initialState.blog, list})

        })
    }

   

    updateField(event) {
        const blog = {...this.state.blog}
        blog [event.target.name] = event.target.value
        this.setState({blog})
    }

    renderForm(){
        return( <div className="form">
        <div className="row">
            <div className="col-12 col-md-6">
                <div className="form-group">
                    <label> Titulo  </label>
                    <input type="text" className="form-control"
                    name="titulo" 
                    value={this.state.blog.titulo}
                    onChange={e=>this.updateField(e)}
                    placeholder = "digite o titulo"/>
                </div>
            </div>

            <div className="col-12 col-md-7">
                <div className="form-group">
                    <label for="exampleFormControlTextarea1">Descrição</label>
                    <textarea class="form-control" 
                        name="desc" 
                        value={this.state.blog.desc} 
                        onChange={e=>this.updateField(e)} className="form-control"
                         placeholder="Descrição do blog" rows="3">
                    </textarea>
                </div>
            </div>

            <div className="col-12 col-md-7">
                <div className="form-group">
                    <label for="exampleFormControlTextarea1">Comentario</label>
                    <textarea class="form-control" 
                        name="comentario" 
                        value={this.state.blog.comentario} 
                        onChange={e=>this.updateField(e)} className="form-control"
                         placeholder="Comentario" rows="2">
                    </textarea>
                </div>
            </div>
            
            
        </div>
    <hr/>
    <div className="row">
        <div className="col-12 d-flex-justify-content-end">
            <button className="btn btn-primary"
                onClick={e=>this.save(e)}>
                salvar
            </button>
            <button className="btn btn-secondary ml-3"
                onClick = {e=>this.clear(e)}>
                Cancelar
            </button>
        </div>
    </div>
    </div>
)
   
    }
    //Carrega postagem
    load(blog){
            this.setState({blog})
    }

    remove(blog){
        axios.delete(`${baseUrl}/${blog.id}`).then(resp =>{
            const list = this.getUpdateList(blog, false) 
            this.setState({list})
        })
    }

   

    renderTable(){
        return(
            <table className  = "table mt-4">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Titulo</th>
                        <th>Descriçao</th>
                        <th>Comentario</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows(){
        return this.state.list.map(blog => {
            return(
                <tr key = {blog.id}>
                     <td>
                        {blog.id}
                    </td>
                    <td>
                        {blog.titulo}
                    </td>
                    <td>
                        {blog.desc}
                    </td>
                    <td>
                        {blog.comentario}
                    </td>
                    <td>
                        <button className="btn btn-warning"
                            onClick={() => this.load(blog)}>
                            <i className="fa fa-pencil"></i>
                        </button>
                    </td>
                    <td>
                        <button className="btn btn-danger "
                            onClick={() => this.remove(blog)}>
                            <i className="fa fa-trash"></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }


    render(){
        return(
            <Main {... headerProps} >

                {this.renderForm()}
                {this.renderTable()}
            </Main>
        )
    }
}