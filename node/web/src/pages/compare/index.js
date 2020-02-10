import React, { Fragment, useState } from 'react';
import { Input, Row, Col } from 'reactstrap';
import { FaPlus, FaMinus } from 'react-icons/fa'
import { Formik, Form, ErrorMessage, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { stocksCompare } from '../../services/api/stocks';
import { Button, Table, PageTitle } from '../../components';

export default function History() {
  const [loading, setLoading] = useState(false);
  const [stocks, setStocks] = useState([]);

  const Schema = Yup.object({
    stockName: Yup.string().required('Obrigatório!'),
    stocks: Yup.array()
      .of(Yup.string().required('Obrigatório!'))
      .min(1),
  });

  const columns = [
    { accessor: 'name', Header: 'Nome' },
    { accessor: 'lastPrice', Header: 'Último preço' },
    {
      accessor: 'pricedAt',
      Header: 'Atualizado em',
      Cell: ({ cell }) => cell.value.split('-').reverse().join('/')
    },
  ];

  async function compare({ stockName, stocks }) {
    try {
      setLoading(true);
      const { data } = await stocksCompare(stockName, stocks);
      setStocks(data.lastPrices);
    } catch (error) {
      toast(error.response.data.message, { type: 'error' })
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageTitle title='Comparar ações' />
      <Formik
        initialValues={{
          stockName: '',
          stocks: ['']
        }}
        validationSchema={Schema}
        onSubmit={compare}
      >
        {({ values }) => (
          <Form>
            <Row style={{ marginBottom: 30 }}>
              <Col xs='12'>
                <Row style={{ marginBottom: 20 }}>
                  <Col xs='3'>
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
                </Row>
                <Row style={{ marginBottom: 20 }}>
                  <FieldArray
                    name='stocks'
                    render={(arrayHelpers) => (
                      values.stocks.map((_, index) => (
                        <Fragment key={index}>
                          <Col xs='3' style={{ marginBottom: 20 }}>
                            <Field
                              name={`stocks[${index}]`}
                              render={({ field }) => (
                                <Input {...field} placeholder='Comparar com' />
                              )}
                            />
                            <ErrorMessage
                              name={`stocks[${index}]`}
                              component="strong"
                              className='text-danger mt-1'
                            />
                          </Col>
                          {(values.stocks.length === index + 1) && (
                            <Button
                              color='success'
                              style={{ height: 38, marginRight: 5 }}
                              onClick={() => arrayHelpers.push('')}
                            >
                              <FaPlus />
                            </Button>
                          )}
                          {values.stocks.length > 1 && (
                            <Button
                              color='danger'
                              style={{ height: 38 }}
                              onClick={() => arrayHelpers.remove(index)}
                            >
                              <FaMinus />
                            </Button>
                          )}
                        </Fragment>
                      ))
                    )}
                  />
                </Row>
                <Row>
                  <Col xs='2'>
                    <Button
                      type='submit'
                      color='primary'
                      loading={loading}
                      block
                    >
                      Comparar
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
        data={stocks}
      />
    </>
  );
}
