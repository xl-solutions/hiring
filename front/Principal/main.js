const nome_usuario = document.getElementById('user_text').value
const perfil = document.getElementById('perfil')
const repos = document.getElementById('repos')
const issue = document.getElementById('issues_result')
let url =  "https://api.github.com/users/"
let urlrepos = "https://api.github.com/users/"
let urlissues = "https://api.github.com/repos/"
let captura = ""
let issues_texto = ""

async function GetUsuario(usuario){
    const perfilResponse = await fetch(url)
    const Dadosperfil = await perfilResponse.json()
    if(Dadosperfil.login == undefined){
        alert("Usuário não encontrado")
    }
    else{
        perfil.innerHTML = '<p class="user_name">Usuário: '+Dadosperfil.login+'</p><img src="'+Dadosperfil.avatar_url+'" width="265" height="265" class="img_conf"/>'
    }    
}

async function GetRepos(link){
    link += "/repos"
    const reposResponse = await fetch(link)
    const dadosRepos = await reposResponse.json()
    let saida = '<table class="table-dark table-hover table-striped"><thead><th>Repositórios do Usuário</th>'
    saida +=    '<th>Clonar Repositório</th><th>Link para o Repositório</th></thead><tbody>'
    dadosRepos.forEach(repo =>{
        saida += ('<tr><td><a href="../Issues/issues.html" target="_blank" id="'
                 +repo.name+'">'+repo.name+'</a></td><td>'+repo.clone_url+'</td><td><a href="'
                 +repo.html_url+'" target="_blank">Clique Aqui</td>')
    })    
    saida += '</tbody></table><center><div class="observacao">Obs: Vale lembrar que nesta tabela nem sempre consta todos os'
    saida += ' repositórios do usuário, caso tenha interesse nos demais repositórios e quiser ver mais detalhes do repositório,'
    saida += ' os links estão na tabela acima!</div></center>'
    repos.innerHTML = saida
}

repos.addEventListener("click", e =>{
    urlissues += captura
    const clicked = e.target.id;
    urlissues += "/"+clicked+"/issues"
    localStorage.setItem('chave', urlissues)
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
