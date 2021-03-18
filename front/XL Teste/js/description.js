(function(){
    const url = "https://api.github.com";
    const client_id ="Iv1.3d74fc6eb1f738cd";
    const client_secret = "4d8f63824216a5f165bedf8404bf8d0d6d3326e4";
    const descrip = document.getElementById("descrip");

    let value = JSON.parse(sessionStorage.getItem("value"));
    let number = JSON.parse(sessionStorage.getItem("number"));

    let positionIssue = number[sessionStorage.getItem("positionIssue")]
    let repository = value[sessionStorage.getItem("position")]

    let user = sessionStorage.getItem("user")

    async function getIssuesBody(){
        const descriptionResponse = await fetch(`${url}/repos/${user}/${repository}/issues/${positionIssue}?client_id=${client_id}&client_secret=${client_secret}`);

        const description = await descriptionResponse.json();
        console.log(description)

        return description;
    }

    function showBody(description){
        descrip.innerHTML = `
        <div class="row">
            <h1 class="title">${description.title}</h1>
            <div class="card">
                <div class="card-body">
                    <p>${description.body}</p>
                </div>
            </div>
        </div>`;
    }

    getIssuesBody().then(res => {showBody(res)})
})();