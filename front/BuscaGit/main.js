
    //Informações necessárias
    const clientsecret = '231d70570e7004070d31608f9b0d851574bc9021';
    const clientid = 'dbc6a57e2db115f77d48';
    const searchtext = document.getElementById('searchtext');
    const searchbutton = document.getElementById('searchbutton');
    const perfil = document.getElementById('perfil');
    const githubapi = 'https://api.github.com/users'

    async function searchUser(user){
        const perfilResponse = await fetch(`${githubapi}/${user}?client_id=${clientid}&client_secret=${clientsecret}`);
        const perfiljson = await perfilResponse.json();

        const repResponse = await fetch(`${githubapi}/${user}/repos?client_id=${clientid}&client_secret=${clientsecret}`);
        const repjson = await repResponse.json();

        return {perfiljson, repjson};
    }


    searchbutton.addEventListener('click', (ev)=>{
        const user = searchtext.value;
        if (user.length > 0) {
            searchUser(user).then(res => {
                console.log(res);
                if (res.message !== "Not Found"){
                showPerfil(res.perfiljson);
                showRep(res.repjson);
                }
            });
        }
       
    });


    var repcount = "";

    function countRep(user){
        var repcount = user.public_repos;
        return repcount;
    }

   function showPerfil(user){
        perfil.innerHTML = ` <div class="container card card-body mt-3">
        <div class="row">
            <div class="col-md-3 border-right">
                <div class="row">
                    <span class="fs-2 mb-3"> ${user.login}</span>
                </div>
                <div class="row">
                    <img class="img-fluid" src="${user.avatar_url}">
                </div>
            </div>
            <div class="col-md-9">
             <div id="repositorios"></div>
            </div>
        </div>
    </div>
    `;
   repcount = countRep(user);
   
    
    }


    function showRep(repjson){
        var reptmp = "";
       
        repjson.forEach(rep =>{
            
            reptmp += `<div class="row card card-board mb-4">
            <div>
                <span id="${rep.id}" class="repname"><b>Nome:</b> ${rep.name}</span>
            </div>
            <div>
                <span><b>Url para clonagem:</b> ${rep.clone_url}</span>
            </div>
            <div>
                <a href="${rep.html_url}">Acessar</a>
            </div>
            <div id="repurl${rep.id}" style="display:none;"> ${rep.url}</div>
            <div id="issuelist"></div>
        </div>
        `;

        });
        document.getElementById('repositorios').innerHTML = reptmp;
        // console.log(repcount);
        // var repnames = document.querySelectorAll('.repname');
        // for (var i=0; i<repnames.length; ++i) {
        //     repnames[i].addEventListener('click', clickFunc);
        }

        // function clickFunc() {
        //     // window.open('issues.html','_blank');
        //     var urlrep = document.getElementById(`repurl${this.id}`).innerHTML;
        //     console.log(urlrep);
        //     searchIssues(urlrep).then(res => {
        //         showIssues(res.issuejson);
        //     })
        //   }
        
        // }

        // async function searchIssues(urlrep){
        //     const issueResponse = await fetch(`${urlrep}/issues/1`);
        //     console.log(issueResponse);
        //     const issuejson = await issueResponse.json();
        //     console.log(issuejson);

        //     return issuejson;
        // }

       
            
        
     
    




