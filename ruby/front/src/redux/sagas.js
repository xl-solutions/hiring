import { put, call, takeLatest} from 'redux-saga/effects'
import { 
    INVENTORY_REFRESH_REQUESTED,
    inventoryRefreshRequest,
    inventoryRefreshPending,
    inventoryRefreshSuccess,
    inventoryRefreshFail,

    UPLOAD_REQUESTED,
    uploadPending,
    uploadSuccess,
    uploadFail,    
} from './actions'
import { InventoryService } from '../services/InventoryService'

function* doInventoryRefresh(action) {
    
    yield put(inventoryRefreshPending()) 

    try {
        const data = yield call(InventoryService.get, action.payload)        
        yield put(inventoryRefreshSuccess(data))
    } catch (error) {
        yield put(inventoryRefreshFail(error))
    }
}

function* doUpload(action) {
    
    yield put(uploadPending()) 

    try {
        yield call(InventoryService.upload, action.payload)        
        
        yield put(uploadSuccess())
        yield put(inventoryRefreshRequest())        
    } catch (error) {
        yield put(uploadFail(error))
    }
}


export function* sagas() {
    yield takeLatest(INVENTORY_REFRESH_REQUESTED, doInventoryRefresh);
    yield takeLatest(UPLOAD_REQUESTED, doUpload);
}