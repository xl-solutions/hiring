function alertAPP(params) {
    const icon = params.icon
    const action = params.action
    const title = params.title
    const text = params.text

    const body = document.getElementsByTagName('body')[0]
    
    let alert = document.createElement('div')
    
    alert.classList.add('content-alert-piske-app')
    alert.classList.toggle(`${action}-variables`) 
    alert.innerHTML = `
                        <span class="material-icons-sharp">${icon}</span>
                        <div class="content-alert-piske-app-text">
                            <h4>${title}</h4>
                            <span>${text}</span>
                        </div>
                    `
    body.appendChild(alert)
    
    window.setTimeout(() => {alert.style.opacity = '100'}, 5);
    window.setTimeout(() => {alert.style.opacity = '0'}, 4000);
}

// filtro selects
function filter(value, ps) {
    const table = document.querySelector('#tb')
    // console.log(table.children);
    for (linha of table.children) {
        if (linha.children[ps].innerText != value && value != 'Selecione'){
            
            linha.style.display = 'none'
        }else{
            linha.style.display = 'table-row'
        }
    }
}

function get_filtro() {
    axios.get('/get_filter').then(resp => {
        const select_modelo = document.getElementById('modelo')
        const select_fabricante = document.getElementById('fabricante')
        const select_plano = document.getElementById('plano')

        const modelos = resp.data.model
        const fabricantes = resp.data.manufacturer
        const planos = resp.data.plan

        let inner_modelos = "<option value=''>Selecione</option>"
        modelos.forEach(modelo => {
            inner_modelos +=   `<option value="">
                                    ${modelo[0]}
                                </option>`
        })
        select_modelo.innerHTML = inner_modelos

        let inner_fabricante = "<option value=''>Selecione</option>"
        fabricantes.forEach(fabricante => {
            inner_fabricante +=`<option value="">
                                    ${fabricante[0]}
                                </option>`
        })
        select_fabricante.innerHTML = inner_fabricante

        let inner_plano = "<option value=''>Selecione</option>"
        planos.forEach(plano => {
            inner_plano += `<option value="">
                                ${plano[0]}
                            </option>`
        })
        select_plano.innerHTML = inner_plano
        
        select_modelo.addEventListener('click', () =>{
            mod_value = select_modelo.options[select_modelo.selectedIndex].text
            filter(mod_value, 2)
            //console.log(mod_value);
        })
        
        select_fabricante.addEventListener('click', () =>{
            let fab_value = select_fabricante.options[select_fabricante.selectedIndex].text
            filter(fab_value, 1)
        })
        
        select_plano.addEventListener('click', () =>{
            let pla_value = select_plano.options[select_plano.selectedIndex].text
            filter(pla_value, 4)
        })
    })
}
get_filtro()

// get itens
function get_table() {
    axios.get('/get_itens').then(resp => {
        const list = resp.data.itens;
        console.log(list);
        if (list.length === 0){
            document.querySelector('.table').innerHTML = "<h3>Você não tem itens cadastrados, pode imputar seu csv</h3>"
        }else{
            let html = ''

            list.forEach(item => {
                html += `
                        <tr>
                            <td style="display:none;">${item[0]}</td>
                            <td>${item[1]}</td>
                            <td>${item[2]}</td>
                            <td>${item[3]}</td>
                            <td>${item[4]}</td>
                            <td>${item[5]}</td>
                            <td>${item[6]}</td>
                        </tr>
                        `
            })
            document.querySelector('.table')
            .innerHTML =`<thead><tr>
                                    <th>Manufacturer</th>
                                    <th>Model</th>
                                    <th>Color</th>
                                    <th>Carrier Plan</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                        </thead>
                        <tbody id="tb">
                            ${html}
                        </tbody>`
        }

        //alertAPP({action: 'succes', title: 'Titulo do alerta', text: 'Texto de descrição do alerta em questão', icon: 'check_circle'})
    });
}
get_table()

// import csv
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    axios.post("/create", formData, {
        headers: {
        "Content-Type": "multipart/form-data",
        },
    })
    .then((res) => {
        console.log(res.status);
        switch (res.status) {
            case 201:
                alertAPP({
                    action: 'succes',
                    title: 'Dados Inseridos!',
                    text: `${res.data.num} foram inseridos no banco`,
                    icon: 'check_circle'
                })
            default:
                break;
        }
        
        get_table()
        get_filtro()
    })
    .catch((e) => {
        switch (e.response.status) {
            case 400:
                alertAPP({
                    action: 'warning',
                    title: 'Selecione um arquivo valido!',
                    text: 'Erro ao ler arquivo, por favor selecione um CSV como foi especificado',
                    icon: 'warning'
                })
            case 409:
                alertAPP({
                    action: 'warning',
                    title: 'Selecione um arquivo CSV!',
                    text: 'Erro ao ler arquivo, por favor selecione um CSV como foi especificado',
                    icon: 'warning'
                })
                break;
            case 500:
                alertAPP({
                    action: 'danger',
                    title: 'Erro ao processar CSV',
                    text: 'Por favor verifique se seu CSV está no padrão especificado',
                    icon: 'dangerous'
                })
            default:
                
                break;
        }
        console.log(e);
    });
    
});
