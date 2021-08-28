import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {getDailySeries, getIntradaySeries} from '../wrapper/api';
import {Button, Divider} from 'react-native-elements';
import {Table, Row} from 'react-native-table-component';

const ModalStockSeriesDetails = props => {
  const [seriesData, setSeriesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableRowsWidth, setTableRowsWidth] = useState([
    80, 70, 70, 70, 70, 70,
  ]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log('props2', props);
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
    console.log(structuredData);
    setLoading(false);
  };

  const getDailySeriesData = async stock => {
    let dailySeriesData = await getDailySeries(stock);
    let structuredData = transformToTableStructure(dailySeriesData);
    setSeriesData(structuredData);
    console.log(structuredData);
    setLoading(false);
  };

  const renderListItemIntraday = ({item}) => {
    return (
      <View style={{}}>
        <View
          elevation={5}
          style={{
            margin: 5,
            backgroundColor: '#d9d9d9',
            shadowColor: '#000000',
            shadowOpacity: 0.8,
            shadowRadius: 2,
            shadowOffset: {
              height: 1,
              width: 1,
            },
          }}>
          <Text>Date:{item.date}</Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 1}}>Open:{item.open}</Text>
            <Text style={{flex: 1}}>Close:{item.close}</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{flex: 1}}>High:{item.high}</Text>
            <Text style={{flex: 1}}>Low:{item.low}</Text>
          </View>
          <Text>Volume:{item.volume}</Text>
        </View>
      </View>
    );
  };

  return (
    <Modal visible={props.visible} nimationType="fade" transparent={true}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
          flexDirection: 'row',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            padding: 20,
            borderRadius: 10,
            margin: 20,
            flex: 1,
          }}>
          <View style={{flex: 1, marginVertical: 5}}>
            <Text
              style={{alignSelf: 'center', fontSize: 20, fontWeight: 'bold'}}>
              {props.mode === 'intraday' && 'Intraday Series'}
              {props.mode === 'daily' && 'Daily Series'}
            </Text>
            <Divider style={{marginVertical: 5}} />
            {loading ? (
              <ActivityIndicator color="blue" size={20} />
            ) : seriesData.errorMessage !== undefined ? (
              <Text>{seriesData.errorMessage}</Text>
            ) : (
              <View style={{}}>
                <ScrollView horizontal={true}>
                  <View>
                    <Table
                      borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                      <Row
                        data={['*', 'Open', 'High', 'Low', 'Close', 'Volume']}
                        widthArr={tableRowsWidth}
                        style={{}}
                        textStyle={{fontWeight: 'bold', alignSelf: 'center'}}
                      />
                    </Table>
                    <ScrollView style={{marginTop: -1}}>
                      <Table
                        borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                        {seriesData.map((rowData, index) => (
                          <Row
                            key={index}
                            data={rowData}
                            widthArr={tableRowsWidth}
                            style={[index % 2 && {backgroundColor: '#F7F6E7'}]}
                            textStyle={{}}
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
