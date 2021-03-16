const urlissues = localStorage.getItem('chave')
const id = localStorage.getItem('key')
const issues_desc = document.getElementById('issues_desc')

async function GetIssuesDesc(){
    const issuesResponse = await fetch(urlissues+"?state=all")
    const dadosIssues = await issuesResponse.json()
    let issues_text = ""
    dadosIssues.forEach(element => {
        if (element.id == id){
            issues_text = ('<p class="descissue">ID da issue: '+element.id+'</p><p class="descissue">Título da issue: '
                          +element.title+'</p><p class="descissue">Data de Criação: '+element.created_at+'</p><p class="descissue">Descrição do Problema: '
                          +element.body+'</p><p class="descissue">Status: '+element.state+'</p>')
        }
    });
    issues_desc.innerHTML = issues_text
}

GetIssuesDesc()