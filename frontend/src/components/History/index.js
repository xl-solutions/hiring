import React from 'react'
import { DataGrid } from '@material-ui/data-grid';





export default function History(props){
    //Data Grid
    const columns = [
        { field: 'id',       headerName: 'ID', width: 70},
        { field: 'pricedAt', headerName: 'Date', width: 120},
        { field: 'open',     headerName: 'Open',type: 'number',  width: 90},
        { field: 'low',      headerName: 'Low', type: 'number', width: 90},
        { field: 'high',     headerName: 'High',  type: 'number',  width: 90},
        { field: 'close',    headerName: 'Close',  type: 'number',  width: 90},
      ];


      return(
            <div className="divHistory">
                <h3> HISTÓRICO</h3>
                <div style={{ height: 400, width: '100%'}}>
                  <DataGrid  rows={props.datasrow} columns={columns} pageSize={5} checkboxSelection />
                </div>
            </div>
      );
}