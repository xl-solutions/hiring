import React, {useState} from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {Divider} from 'react-native-elements';
import IconFA from 'react-native-vector-icons/FontAwesome';
import {getIntradaySeries} from '../wrapper/api';
import ModalStockSeriesDetails from './ModalStockSeriesDetails';

const StockInformationDashboard = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState('');
  console.log('props', props);
  return (
    <View>
      <Text style={{margin: 5, fontWeight: 'bold', fontSize: 16}}>Series</Text>
      <Divider style={{marginBottom: 5}} />
      <TouchableOpacity
        onPress={() => {
          setModalVisible(() => {
            setModalMode('intraday');
            return true;
          });
        }}
        style={{
          flexDirection: 'row',
          padding: 10,
          backgroundColor: 'white',
          justifyContent: 'space-between',
        }}>
        <Text>Intraday series (5 min interval)</Text>
        <IconFA name="chevron-right" size={20} color="grey" />
      </TouchableOpacity>
      <ModalStockSeriesDetails
        visible={modalVisible}
        stock={props.stock}
        mode={modalMode}
        closeModal={() => setModalVisible(false)}
      />
      <TouchableOpacity
        onPress={() => {
          setModalVisible(() => {
            setModalMode('daily');
            return true;
          });
        }}
        style={{
          flexDirection: 'row',
          padding: 10,
          backgroundColor: 'white',
          justifyContent: 'space-between',
        }}>
        <Text>Daily Series</Text>
        <IconFA name="chevron-right" size={20} color="grey" />
      </TouchableOpacity>
    </View>
  );
};

export default StockInformationDashboard;
