const nome_usuario = document.getElementById('user_text').value
const perfil = document.getElementById('perfil')
var url =  "https://api.github.com/users/"
const token = '6e1ddbe52a47aeab7507a6cf03eda9aadf41f6ea'
var captura = ""

async function GetUsuario(usuario){
    const perfilResponse = await fetch(url)
    const Dadosperfil = await perfilResponse.json();
    console.log(Dadosperfil)
    perfil.innerHTML = '<p>'+Dadosperfil.login+'</p><img src="'+Dadosperfil.avatar_url+'"/>'
}

function mouseClicked(){
    captura = document.getElementById('user_text').value
    url += captura
    GetUsuario(captura)
    url = "https://api.github.com/users/"
}
