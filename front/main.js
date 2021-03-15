const nome_usuario = document.getElementById('user_text').value
const perfil = document.getElementById('perfil')
const repos = document.getElementById('repos')
var url =  "https://api.github.com/users/"
var urlrepos = "https://api.github.com/users/"
var urlissues = "https://api.github.com/repos/"
const token = '6e1ddbe52a47aeab7507a6cf03eda9aadf41f6ea'
var captura = ""

async function GetUsuario(usuario){
    const perfilResponse = await fetch(url)
    const Dadosperfil = await perfilResponse.json()
    console.log(Dadosperfil)
    perfil.innerHTML = '<p>'+Dadosperfil.login+'</p><img src="'+Dadosperfil.avatar_url+'" width="124" height="124"/>'
}

async function GetRepos(link){
    link += "/repos"
    const reposResponse = await fetch(link)
    const dadosRepos = await reposResponse.json()
    let saida = '<table><thead class="head_table"><th>Repositórios do Usuário</th><th>Clonar Repositório</th><th>Link para o Repositório</th></thead><tbody>'
    dadosRepos.forEach(repo =>{
        saida += '<tr><td><a href="issues.html" target="_blank" id="'+repo.name+'">'+repo.name+'</a></td><td>'+repo.clone_url+'</td><td><a href="'+repo.html_url+'">Clique Aqui</td>'
    })    
    repos.innerHTML = saida
}

repos.addEventListener("click", e =>{
    urlissues += captura
    const clicked = e.target.id;
    urlissues += "/"+clicked+"/issues"
    const issuesResponse = await fetch(urlissues)
    const dadosIssues = await issuesResponse.json()
    console.log(urlissues)
    urlissues = "https://api.github.com/repos/"
 
})


function mouseClicked(){
    captura = document.getElementById('user_text').value
    url += captura
    urlrepos += captura
    GetUsuario(captura)
    GetRepos(urlrepos)
    url = "https://api.github.com/users/"
    urlrepos = "https://api.github.com/users/"
}
