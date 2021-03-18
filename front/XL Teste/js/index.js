(function(){
    const search = document.getElementById("search");
    const profile = document.getElementById("profile");
    const url = "https://api.github.com/users";
    const client_id ="Iv1.3d74fc6eb1f738cd";
    const client_secret = "4d8f63824216a5f165bedf8404bf8d0d6d3326e4";

    async function getUser(user){
        const profileResponse = await fetch(`${url}/${user}?client_id=${client_id}&client_secret=${client_secret}`);

        const reposResponse = await fetch(`${url}/${user}/repos?client_id=${client_id}&client_secret=${client_secret}`);

        const profile = await profileResponse.json();
        const repos = await reposResponse.json();

        return {profile, repos};

    }

    function showProfile(user){
        profile.innerHTML = `
        <div class="container">
            <div class="row">
                <div class="col-md-3 margin">
                    <div class="image">
                        <img src="${user.avatar_url}" class="card-img-top">
                        <div>
                            <h5 class="card-title">${user.name}</h5>
                            <h4 class="card-text">${user.login}</h4>
                        </div>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="row" id="repos"></div>
                </div>
            </div>
        </div>`;
    }

    function showRepos(repos){
        let output = "";
        let value = []
        
        for (let i = 0; i < repos.length; i++) {
            
            output += `
            <div class="col-md-6">
                <div class="card mb-3">
                    <div class="card-body repos">
                        <button id="linkIssues" onclick="clickRepos(${i})">${repos[i].name}</button>
                        <div class="span-repos">
                        <span">${repos[i].clone_url}</span>
                        </div>
                        <div class="link">
                            <a class="link-repos" href="${repos[i].html_url}">Acessar repositório</a>
                        </div>
                    </div>
                </div>
            </div>`;
            value.push(repos[i].name)
        }
       sessionStorage.setItem("value", JSON.stringify(value));

        document.getElementById("repos").innerHTML = output;
    }

    search.addEventListener("keyup", e => {
        const user = e.target.value;
        sessionStorage.setItem("user", user)

        if(user.length > 0){
            getUser(user).then(res => {
                showProfile(res.profile);
                showRepos(res.repos);
            });
        }
    });
    
})();

function clickRepos(position){
    sessionStorage.setItem("position", position)
    window.location.assign("issues.html")
}