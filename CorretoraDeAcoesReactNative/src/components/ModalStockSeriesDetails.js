import React, {useEffect, useState} from 'react';
import {View, Text, Modal, ActivityIndicator, ScrollView} from 'react-native';
import {getDailySeries, getIntradaySeries} from '../wrapper/api';
import {Button, Divider} from 'react-native-elements';
import {Table, Row} from 'react-native-table-component';
import styles from './styles';

const ModalStockSeriesDetails = props => {
  const [seriesData, setSeriesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableRowsWidth] = useState([80, 70, 70, 70, 70, 70]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (props.mode === 'intraday') {
        await getIntradaySeriesData(props.stock);
      } else if (props.mode === 'daily') {
        await getDailySeriesData(props.stock);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.stock, props.mode]);

  const transformToTableStructure = data => {
    let structure = [];
    data.forEach(element => {
      structure.push([
        element.date,
        element.open,
        element.high,
        element.low,
        element.close,
        element.volume,
      ]);
    });
    return structure;
  };

  const getIntradaySeriesData = async stock => {
    let intradaySeriesData = await getIntradaySeries(stock);
    let structuredData = transformToTableStructure(intradaySeriesData);
    setSeriesData(structuredData);
    setLoading(false);
  };

  const getDailySeriesData = async stock => {
    let dailySeriesData = await getDailySeries(stock);
    let structuredData = transformToTableStructure(dailySeriesData);
    setSeriesData(structuredData);
    setLoading(false);
  };

  return (
    <Modal visible={props.visible} nimationType="fade" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={[styles.defaultFlex, styles.marginVertical5]}>
            <Text style={styles.titleModal}>
              {props.mode === 'intraday' && 'Intraday Series'}
              {props.mode === 'daily' && 'Daily Series'}
            </Text>
            <Divider style={styles.marginVertical5} />
            {loading ? (
              <ActivityIndicator color="blue" size={20} />
            ) : seriesData.errorMessage !== undefined ? (
              <Text>{seriesData.errorMessage}</Text>
            ) : (
              <View>
                <ScrollView horizontal={true}>
                  <View>
                    <Table borderStyle={styles.tableBorderStyle}>
                      <Row
                        data={['*', 'Open', 'High', 'Low', 'Close', 'Volume']}
                        widthArr={tableRowsWidth}
                        textStyle={styles.headingTextTable}
                      />
                    </Table>
                    <ScrollView style={styles.scrollStyle}>
                      <Table borderStyle={styles.tableBorderStyle}>
                        {seriesData.map((rowData, index) => (
                          <Row
                            key={index}
                            data={rowData}
                            widthArr={tableRowsWidth}
                            style={[index % 2 && styles.backgroundTableCell]}
                          />
                        ))}
                      </Table>
                    </ScrollView>
                  </View>
                </ScrollView>
              </View>
            )}
          </View>
          <Button title="Close" onPress={() => props.closeModal()} />
        </View>
      </View>
    </Modal>
  );
};

export default ModalStockSeriesDetails;
