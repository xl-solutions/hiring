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