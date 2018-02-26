import { 
    UPLOAD_REQUESTED,
    UPLOAD_PENDING,
    UPLOAD_SUCCEEDED,
    UPLOAD_FAILED    
} from '../actions'

const initialState = {
    uploading: false,
    error: undefined
}

export const uploadReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPLOAD_REQUESTED:
        case UPLOAD_PENDING:
            return {...state, uploading: true, error: undefined}
            
        case UPLOAD_SUCCEEDED:
            return {...state, uploading: false, error: undefined}

        case UPLOAD_FAILED:
            return {...state, uploading: false, error: action.payload}
    }

    return state
}
