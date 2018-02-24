import { 
    INVENTORY_REFRESH_REQUESTED,
    INVENTORY_REFRESH_PENDING,
    INVENTORY_REFRESH_SUCCEEDED,
    INVENTORY_REFRESH_FAILED,
    FILTERS_SET
} from './actions'

const initialState = {
    inventory: [],
    error: undefined,
    filters: {}
}

export const reducer = (state = initialState, action) => {
    console.log(action)

    switch (action.type) {
        case INVENTORY_REFRESH_REQUESTED:
        case INVENTORY_REFRESH_PENDING:
            break;

        case INVENTORY_REFRESH_SUCCEEDED:
            return {...state, inventory: action.payload, error: undefined}

        case INVENTORY_REFRESH_FAILED:
            return {...state, inventory: [], error: action.payload}

        case FILTERS_SET:
            return {...state, filters: action.payload}
    }

    return state
}
