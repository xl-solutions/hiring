import { 
    INVENTORY_REFRESH_REQUESTED,
    INVENTORY_REFRESH_PENDING,
    INVENTORY_REFRESH_SUCCEEDED,
    INVENTORY_REFRESH_FAILED
} from './actions'

const initialState = {
    inventory: [],
    error: undefined,
    filters: {},
    loading: false
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case INVENTORY_REFRESH_REQUESTED:
            break

        case INVENTORY_REFRESH_PENDING:
            return {...state, loading: true}

        case INVENTORY_REFRESH_SUCCEEDED:
            return {...state, inventory: action.payload, error: undefined, loading: false}

        case INVENTORY_REFRESH_FAILED:
            return {...state, inventory: [], error: action.payload, loading: false}
    }

    return state
}
