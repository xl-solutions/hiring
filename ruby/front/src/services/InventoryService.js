import queryString from 'query-string'

export class InventoryService {

    static get(filters) {
        const url = 
            'http://localhost:8000/api/product?' + 
            queryString.stringify(filters)

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
}