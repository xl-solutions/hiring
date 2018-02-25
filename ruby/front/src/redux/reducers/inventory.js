import { 
    INVENTORY_REFRESH_REQUESTED,
    INVENTORY_REFRESH_PENDING,
    INVENTORY_REFRESH_SUCCEEDED,
    INVENTORY_REFRESH_FAILED,
} from '../actions'

const initialState = {
    data: [],
    error: undefined,
}

export const inventoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case INVENTORY_REFRESH_REQUESTED:
        case INVENTORY_REFRESH_PENDING:
            return state

        case INVENTORY_REFRESH_SUCCEEDED:
            return {...state, data: action.payload, error: undefined}

        case INVENTORY_REFRESH_FAILED:
            return {...state, data: [], error: action.payload}
    }

    return state
}
