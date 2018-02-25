import React, { Component } from 'react'
import { connect } from 'react-redux'
import { inventoryRefreshRequest } from '../redux/actions'
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';

const styles = {
    errorMsg: {
        color: "red"
    }
}

class InventoryListComponent extends Component {

    componentDidMount() {
        this.props.inventoryRefreshRequest(undefined)
    }

    render() {
        const {inventory, errorMsg} = this.props

        return (
            <div>
                {this.props.errorMsg && 
                    <p style={styles.errorMsg}>{this.props.errorMsg}</p>
                }

                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHeaderColumn>ID</TableHeaderColumn>
                            <TableHeaderColumn>Fabricante</TableHeaderColumn>
                            <TableHeaderColumn>Modelo</TableHeaderColumn>
                            <TableHeaderColumn>Cor</TableHeaderColumn>
                            <TableHeaderColumn>Plano</TableHeaderColumn>
                            <TableHeaderColumn>Preco</TableHeaderColumn>
                            <TableHeaderColumn>Quantidade</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {inventory.map((item, index) =>
                            <TableRow key={index} selectable={false}>           
                                <TableRowColumn>{item.id}</TableRowColumn>
                                <TableRowColumn>{item.manufacturer}</TableRowColumn>
                                <TableRowColumn>{item.model}</TableRowColumn>
                                <TableRowColumn>{item.color}</TableRowColumn>
                                <TableRowColumn>{item.carrier_plan_type}</TableRowColumn>
                                <TableRowColumn>{item.price}</TableRowColumn>
                                <TableRowColumn>{item.quantity}</TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>                
            </div>
        )
    }
}

export const InventoryList = connect(
    state => ({
        inventory: state.inventory,
        errorMsg: state.error
    }),
    {
        inventoryRefreshRequest
    }
)(InventoryListComponent)