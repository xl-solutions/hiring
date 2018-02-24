import { put, call, takeLatest} from 'redux-saga/effects'
import { 
    INVENTORY_REFRESH_REQUESTED,
    inventoryRefreshPending,
    inventoryRefreshSuccess,
    inventoryRefreshFail
} from './actions'
import { InventoryService } from '../services/InventoryService'

function* doInventoryRefresh(action) {
    
    yield put(inventoryRefreshPending()) 

    try {
        const data = yield call(InventoryService.get, action.filters)
        yield put(inventoryRefreshSuccess(data))
    } catch (error) {
        yield put(inventoryRefreshFail(error))
    }
}

export function* sagas() {
    yield takeLatest(INVENTORY_REFRESH_REQUESTED, doInventoryRefresh);
}