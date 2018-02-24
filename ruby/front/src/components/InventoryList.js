import React, { Component } from 'react'
import { connect } from 'react-redux'
import { inventoryRefreshRequest } from '../redux/actions'

class InventoryListComponent extends Component {

    componentDidMount() {
        console.log(this.props)
        this.props.inventoryRefreshRequest(undefined)
    }

    render() {

        const items = this.props.inventory.map(
            item =>
                <p>{`${item.manufacturer} - ${item.model}`}</p>
        )

        return (
            <div>
                {this.props.errorMsg}
                {items}
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