import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as actions from './redux/actions'
import {inventoryReducer, uploadReducer} from './redux/reducers'


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

//**
//** ACTION CREATORS
//**

describe('inventory action creators', () => {
  it('inventoryRefreshRequest', () => {
    const fakeFilters = {a:1, b:2}
    expect(actions.inventoryRefreshRequest(fakeFilters)).toEqual({
      type: actions.INVENTORY_REFRESH_REQUESTED,
      payload: fakeFilters
    })
  })

  it('inventoryRefreshPending', () => {    
    expect(actions.inventoryRefreshPending()).toEqual({
      type: actions.INVENTORY_REFRESH_PENDING
    })
  })  

  it('inventoryRefreshSucceess', () => {    
    const fakeData = 'FAKEDATA'
    expect(actions.inventoryRefreshSuccess(fakeData)).toEqual({
      type: actions.INVENTORY_REFRESH_SUCCEEDED,
      payload: fakeData
    })
  })

  it('inventoryRefreshFailed', () => {    
    const fakeError = 'FAKEERROR'
    expect(actions.inventoryRefreshFail(fakeError)).toEqual({
      type: actions.INVENTORY_REFRESH_FAILED,
      payload: fakeError
    })
  })
})

describe('upload action creators', () => {
  it('uploadRequest', () => {
    const fakeFile = 'FAKEFILE'
    expect(actions.uploadRequest(fakeFile)).toEqual({
      type: actions.UPLOAD_REQUESTED,
      payload: fakeFile
    })
  })

  it('uploadPending', () => {    
    expect(actions.uploadPending()).toEqual({
      type: actions.UPLOAD_PENDING
    })
  })  

  it('uploadSuccess', () => {    
    expect(actions.uploadSuccess()).toEqual({
      type: actions.UPLOAD_SUCCEEDED,
    })
  })

  it('uploadFail', () => {    
    const fakeError = 'FAKEERROR'
    expect(actions.uploadFail(fakeError)).toEqual({
      type: actions.UPLOAD_FAILED,
      payload: fakeError
    })
  })
})

//**
//** REDUCERS */

describe('inventory reducer', () => {

  it('initial state', () => {
    expect(inventoryReducer(undefined, {}))
      .toEqual({
        data: [],
        error: undefined,
      })
  })  

  it('inventory requested', () => {
    const state = inventoryReducer(
      undefined, 
      {type: actions.INVENTORY_REFRESH_REQUESTED, payload: undefined}
    )

    expect(state).toEqual({
      data: [],
      error: undefined
    })
  })

  it('inventory request succeedded', () => {
    const fakeData = "FAKEDATA"

    const state = inventoryReducer(
      undefined, 
      {type: actions.INVENTORY_REFRESH_SUCCEEDED, payload: fakeData}
    )

    expect(state).toEqual({
      data: fakeData,
      error: undefined
    })
  })

  it('inventory request failed', () => {
    const fakeError = "FAKEERROR"

    const state = inventoryReducer(
      undefined, 
      {type: actions.INVENTORY_REFRESH_FAILED, payload: fakeError}
    )

    expect(state).toEqual({
      data: [],
      error: fakeError
    })
  })

})

describe('upload reducer', () => {

  it('initial state', () => {
    expect(uploadReducer(undefined, {}))
      .toEqual({
        uploading: false,
        error: undefined,
      })
  })  

  it('upload request', () => {
    const state = uploadReducer(
      undefined, 
      {type: actions.UPLOAD_REQUESTED}
    )

    expect(state).toEqual({
      uploading: true,
      error: undefined
    })
  })

  it('upload request succeeded', () => {
    const state = uploadReducer(
      undefined, 
      {type: actions.UPLOAD_SUCCEEDED}
    )

    expect(state).toEqual({
      uploading: false,
      error: undefined
    })
  })  

  it('upload request failed', () => {
    const fakeError = 'FAKEERROR'

    const state = uploadReducer(
      undefined, 
      {type: actions.UPLOAD_FAILED, payload: fakeError}
    )

    expect(state).toEqual({
      uploading: false,
      error: fakeError
    })
  })    

})