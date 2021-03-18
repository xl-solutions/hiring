(function(){
    const url = "https://api.github.com";
    const client_id ="Iv1.3d74fc6eb1f738cd";
    const client_secret = "4d8f63824216a5f165bedf8404bf8d0d6d3326e4";

    let value = JSON.parse(sessionStorage.getItem("value"));

    let repository = value[sessionStorage.getItem("position")]
    let user = sessionStorage.getItem("user")

    async function getIssues(){
        const issuesResponse = await fetch(`${url}/repos/${user}/${repository}/issues?client_id=${client_id}&client_secret=${client_secret}`);

        const issues = await issuesResponse.json();

        return issues;
    }

    function showIssues(issues){
        let number = []
        let output = "";
        
        for (let i = 0; i < issues.length; i++) {
            output += `
            <div class="row">
                <div class="card mb-3">
                    <div class="card-body">
                        <button id="linkBody" onclick="clickIssues(${i})">${issues[i].title}</button>
                    </div>
                </div>
            </div>`;
            number.push(issues[i].number)
        };

        sessionStorage.setItem("number", JSON.stringify(number));

        document.getElementById("issues").innerHTML = output;

        if (number.length == 0){
            document.getElementById("issues").innerHTML=`
            <p class="notify">Não existe issues neste repositório</p>`;
        }
    }

    getIssues().then(res => {showIssues(res)})
})();

function clickIssues(position){
    console.log(position)
    sessionStorage.setItem("positionIssue", position)
    window.location.assign("description.html")
}