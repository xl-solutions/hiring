import React, { Component } from 'react'
import { connect } from 'react-redux'
import { inventoryRefreshRequest } from '../redux/actions'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import FlatButton from 'material-ui/FlatButton'

const styles = {
    panel: {
        display: "flex",
        alignItems: "flex-end"
    },

    filter: {
        marginRight: "1em"
    }
}

const PLAN_TODOS = "todos"

class FiltersPanelComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            manufacturer: "",
            model: "",
            carrier_plan_type: PLAN_TODOS
        }
    }

    handleManufacturerChange = (event, value) => 
        this.setState({manufacturer: value}, () => this.doFilter())

    handleModelChange = (event, value) =>
        this.setState({model: value}, () => this.doFilter())

    handlePlanChange = (event, index, value) => 
        this.setState({carrier_plan_type: value}, () => this.doFilter())

    getCarrierPlanType = () => ({
        carrier_plan_type: 
            this.state.carrier_plan_type == PLAN_TODOS ? 
            undefined :
            this.state.carrier_plan_type
    })

    doFilter = () => {
        this.props.inventoryRefreshRequest(
            {...this.state, ...this.getCarrierPlanType()}
        )
    }

    render() {
        return (
            <div key="dv1" style={styles.panel}>
                
                <TextField 
                    key="ed1"
                    style={styles.filter}
                    floatingLabelText="Fabricante"
                    value={this.state.manufacturer}
                    onChange={this.handleManufacturerChange}
                    />
                
                <TextField 
                    key="ed2"
                    style={styles.filter}
                    floatingLabelText="Modelo"
                    value={this.state.model}
                    onChange={this.handleModelChange}
                    />

                <SelectField
                    key="sl1"
                    style={styles.filter}
                    floatingLabelText="Plano"
                    value={this.state.carrier_plan_type}
                    onChange={this.handlePlanChange}
                    >
                    <MenuItem value={PLAN_TODOS} primaryText="Todos"/>
                    <MenuItem value="pre" primaryText="Pré"/>
                    <MenuItem value="pos" primaryText="Pós"/>
                </SelectField>

            </div>
        )
    }
}

export const FiltersPanel = connect(
    state => ({
        errorMsg: state.inventory.error
    }),
    {
        inventoryRefreshRequest
    }
)(FiltersPanelComponent)