import React, { useState } from 'react';
import { Input, Row, Col } from 'reactstrap';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { gainsCalcule } from '../../services/api/stocks';
import { Button, Table, PageTitle } from '../../components';

export default function History() {
  const [loading, setLoading] = useState(false);
  const [gains, setGains] = useState([]);

  const Schema = Yup.object({
    stockName: Yup.string().required('Obrigatório!'),
    purchasedAmount: Yup.string().required('Obrigatório!'),
    purchasedAt: Yup.string().required('Obrigatório!')
  });

  const columns = [
    { key: 'name', title: 'Nome' },
    { key: 'purchasedAmount', title: 'Quantidade comprada' },
    { key: 'purchasedAt', title: 'Comprado em' },
    { key: 'priceAtDate', title: 'Preço na data da compra' },
    { key: 'lastPrice', title: 'Último preço' },
    { key: 'capitalGains', title: 'Ganho' }
  ];

  async function calculate({ stockName, purchasedAmount, purchasedAt }) {
    try {
      setLoading(true);
      const { data } = await gainsCalcule(stockName, purchasedAmount, purchasedAt);
      setGains([data]);
    } catch (error) {
      toast(error.response.data.message, { type: 'error' })
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageTitle title='Calcular ganhos' />
      <Formik
        initialValues={{
          stockName: '',
          purchasedAmount: '',
          purchasedAt: ''
        }}
        validationSchema={Schema}
        onSubmit={calculate}
      >
        {({ setFieldValue }) => (
          <Form>
            <Row style={{ marginBottom: 30 }}>
              <Col xs='12'>
                <Row>
                  <Col xs='4'>
                    <Field
                      name='stockName'
                      render={({ field }) => (
                        <Input {...field} placeholder='Nome da ação' />
                      )}
                    />
                    <ErrorMessage
                      name='stockName'
                      component="strong"
                      className='text-danger mt-1'
                    />
                  </Col>
                  <Col xs='3'>
                    <Field
                      name='purchasedAmount'
                      render={({ field }) => (
                        <Input
                          {...field}
                          type='number'
                          placeholder='Quantidade'
                        />
                      )}
                    />
                    <ErrorMessage
                      name='purchasedAmount'
                      component="strong"
                      className='text-danger mt-1'
                    />
                  </Col>
                  <Col xs='3'>
                    <Field
                      name='purchasedAt'
                      render={({ field }) => (
                        <Input
                          {...field}
                          type='date'
                          onChange={e => setFieldValue('purchasedAt', e.target.value)}
                        />
                      )}
                    />
                    <ErrorMessage
                      name='purchasedAt'
                      component="strong"
                      className='text-danger mt-1'
                    />
                  </Col>
                  <Col xs='2'>
                    <Button
                      type='submit'
                      color='primary'
                      loading={loading}
                      block
                    >
                      Calcular
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
      <Table
        columns={columns}
        data={gains}
      />
    </>
  );
}
