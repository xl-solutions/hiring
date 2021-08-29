import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Divider} from 'react-native-elements';
import IconFA from 'react-native-vector-icons/FontAwesome';
import ModalStockSeriesDetails from './ModalStockSeriesDetails';
import styles from './styles';

const StockInformationDashboard = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState('');
  return (
    <View>
      <Text style={styles.separatorSeries}>Series</Text>
      <Divider style={styles.dividerMargin} />
      <TouchableOpacity
        onPress={() => {
          setModalVisible(() => {
            setModalMode('intraday');
            return true;
          });
        }}
        style={styles.seriesTouchable}>
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
        style={styles.seriesTouchable}>
        <Text>Daily Series</Text>
        <IconFA name="chevron-right" size={20} color="grey" />
      </TouchableOpacity>
    </View>
  );
};

export default StockInformationDashboard;
