const urlissues = localStorage.getItem('chave')
const id = localStorage.getItem('key')
const issues_desc = document.getElementById('issues_desc')

async function GetIssuesDesc(){
    const issuesResponse = await fetch(urlissues+"?state=all")
    const dadosIssues = await issuesResponse.json()
    let issues_text = ""
    dadosIssues.forEach(element => {
        if (element.id == id){
            issues_text = '<p>'+element.id+'</p><p>'+element.title+'</p><p>'+element.created_at+'</p><p>'+element.body+'</p>'
        }
    });
    issues_desc.innerHTML = issues_text
}



GetIssuesDesc()