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
}