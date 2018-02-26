export const UPLOAD_REQUESTED = 'UPLOAD_REQUESTED'
export const UPLOAD_PENDING = 'UPLOAD_PENDING'
export const UPLOAD_SUCCEEDED = 'UPLOAD_SUCCEEDED'
export const UPLOAD_FAILED = 'UPLOAD_FAILED'

export const uploadRequest = (file) => ({
    type: UPLOAD_REQUESTED,
    payload: file
})

export const uploadPending = () => ({
    type: UPLOAD_PENDING
})

export const uploadSuccess = () => ({
    type: UPLOAD_SUCCEEDED
})

export const uploadFail = (error) => ({
    type: UPLOAD_FAILED, 
    payload: error
})
