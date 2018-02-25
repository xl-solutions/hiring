import queryString from 'query-string'

export class InventoryService {

    static get(filters) {
        const params = {
            manufacturer__contains: filters && filters.manufacturer,
            model__contains: filters && filters.model,
            carrier_plan_type: filters && filters.carrier_plan_type
        }

        const url = 
            'http://localhost:8000/api/product?' + 
            queryString.stringify(params)

        return fetch(url)
            .then(response => {
                if (response.status != 200) 
                    return Promise.reject(response.body)

                return response.json()
            })           
            .catch(error => {
                throw(error.message)
            })
    }

    static upload(file) {
        const formData = new FormData()
        formData.append('file', file)

        const url = 'http://localhost:8000/api/upload/'

        return fetch(
            url, {
                method: 'PUT',
                body: formData
            }
        ).then(response => {
            console.log(response.body)
            if (response.status != 201)
                throw({message: "Dados inválidos"})
        }).catch(error => {
            throw(error.message)
        })

    }
}