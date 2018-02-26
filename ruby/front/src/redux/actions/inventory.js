export const INVENTORY_REFRESH_REQUESTED = 'INVENTORY_REFRESH_REQUESTED'
export const INVENTORY_REFRESH_PENDING = 'INVENTORY_REFRESH_PENDING'
export const INVENTORY_REFRESH_SUCCEEDED = 'INVENTORY_REFRESH_SUCCEEDED'
export const INVENTORY_REFRESH_FAILED = 'INVENTORY_REFRESH_FAILED'

export const inventoryRefreshRequest = (filters) => ({
    type: INVENTORY_REFRESH_REQUESTED,
    payload: filters
})

export const inventoryRefreshPending = () => ({
    type: INVENTORY_REFRESH_PENDING
})

export const inventoryRefreshSuccess = (data) => ({
    type: INVENTORY_REFRESH_SUCCEEDED,
    payload: data
})

export const inventoryRefreshFail = (error) => ({
    type: INVENTORY_REFRESH_FAILED, 
    payload: error
})