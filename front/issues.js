
const issues = document.getElementById('issues_result')
const urlissues = localStorage.getItem('chave')
console.log(urlissues)
async function GetIssues(){
    const issuesResponse = await fetch(urlissues+"?state=all")
    const dadosIssues = await issuesResponse.json()
    let issues_texto = '<table><thead class="head_table"><th>Título da Issue</th><th>ID da Issue</th><th>Link para Issue</th></thead><tbody>'
    dadosIssues.forEach(issues =>{
        issues_texto += '<tr><td><a href="issuesdesc.html" target="_blank" id="'+issues.id+'">'+issues.title+'</a></td><td>'+issues.id+'</td><td><a href="'+issues.html_url+'">Clique Aqui</td>'
    })
    issues.innerHTML = issues_texto
    issues.addEventListener("click", e =>{
        const clicked = e.target.id;
        localStorage.setItem('key', clicked)              
    })
}



GetIssues()
