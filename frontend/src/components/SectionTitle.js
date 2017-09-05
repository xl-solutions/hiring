import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import './SectionTitle.css';

class SectionTitle extends Component {
  render() {
    return (
        <div className="app-section-title">
            <Row>
                <Col md={12}>
                    <h2>{ this.props.title }</h2>
                </Col>
            </Row>
        </div>
    );
  }
}

export default SectionTitle;
