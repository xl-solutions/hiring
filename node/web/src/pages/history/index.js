import React, { useState } from 'react';
import { Input, Row, Col } from 'reactstrap';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { getHistory } from '../../services/api/stocks';
import { Button, Table, PageTitle } from '../../components';

export default function History() {
  const [pagetitle, setPageTitle] = useState('Preço Histórico');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const Schema = Yup.object({
    stockName: Yup.string().required('Obrigatório!'),
    from: Yup.string().required('Obrigatório!'),
    to: Yup.string().required('Obrigatório!')
  });

  const columns = [
    { accessor: 'opening', Header: 'Abertura' },
    { accessor: 'low', Header: 'Baixa' },
    { accessor: 'high', Header: 'Alta' },
    { accessor: 'closing', Header: 'Fechamento' },
    {
      accessor: 'pricedAt',
      Header: 'Atualizado em',
      Cell: ({ cell }) => cell.value.split('-').reverse().join('/')
    }
  ];

  async function searchHistory({ stockName, from, to }) {
    try {
      setLoading(true);
      const { data } = await getHistory(stockName, from, to);
      setPageTitle(`Preço Histórico: ${data.name}`)
      setHistory(data.prices);
    } catch (error) {
      toast(error.response.data.message, { type: 'error' })
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PageTitle title={pagetitle} />
      <Formik
        initialValues={{
          stockName: '',
          from: '',
          to: ''
        }}
        validationSchema={Schema}
        onSubmit={searchHistory}
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
                      name='from'
                      render={({ field }) => (
                        <Input {...field} type='date' onChange={e => setFieldValue('from', e.target.value)} />
                      )}
                    />
                    <ErrorMessage
                      name='from'
                      component="strong"
                      className='text-danger mt-1'
                    />
                  </Col>
                  <Col xs='3'>
                    <Field
                      name='to'
                      render={({ field }) => (
                        <Input {...field} type='date' onChange={e => setFieldValue('to', e.target.value)} />
                      )}
                    />
                    <ErrorMessage
                      name='to'
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
                      Buscar
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
        data={history}
      />
    </>
  );
}
