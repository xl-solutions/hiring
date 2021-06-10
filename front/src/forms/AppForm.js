import React, { Component } from 'react'

import { Formik, Form as FormikForm } from 'formik'

class AppForm extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <Formik
        initialValues={this.props.initialValues}
        onSubmit={this.props.handleSubmit}
      >
        {() => <FormikForm>{this.props.children}</FormikForm>}
      </Formik>
    )
  }
}

export default AppForm
