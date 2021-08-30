import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Button,
  ScrollView,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {Input} from 'react-native-elements';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import {Row, Table} from 'react-native-table-component';
import {getDailyAdjustedSeries} from '../wrapper/api';
import styles from './styles';

const HistoricPriceDailySeries = props => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateMode, setDateMode] = useState('start');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [tableRowsWidth] = useState([80, 70, 70, 70, 70, 70]);
  const [seriesData, setSeriesData] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const getSeriesByDateInterval = async () => {
    let data = await getDailyAdjustedSeries(props.symbol);
    let splicedSeriesData = data.splice(
      data.findIndex(element => element.date === endDate),
      data.findIndex(element => element.date === startDate) + 1,
    );

    setSeriesData(transformToTableStructure(splicedSeriesData));
    setLoading(false);
  };

  const hideDatePicker = () => setDatePickerVisible(false);

  const handleConfirm = date => {
    let fomartedDate = moment(date).format('YYYY-MM-DD');
    if (moment(date).isoWeekday() !== 6 && moment(date).isoWeekday() !== 7) {
      if (dateMode === 'start') {
        if (moment(date).isAfter(moment(endDate))) {
          setStartDate(endDate);
        } else {
          setStartDate(fomartedDate);
        }
      } else {
        if (moment(date).isBefore(moment(startDate))) {
          setEndDate(startDate);
        } else {
          setEndDate(fomartedDate);
        }
      }
    } else {
      ToastAndroid.show('Weekends are not permitted', ToastAndroid.SHORT);
    }
    hideDatePicker();
  };

  return (
    <Modal visible={props.visible} nimationType="fade" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            maximumDate={new Date()}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <Text style={styles.titleModal}>Daily Series Interval</Text>
          <View style={styles.directionRow}>
            <TouchableOpacity
              style={styles.defaultFlex}
              onPress={() => {
                setDateMode('start');
                setDatePickerVisible(true);
              }}>
              <Input
                editable={false}
                placeholder="Start date"
                value={startDate}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.defaultFlex}
              onPress={() => {
                setDateMode('end');
                setDatePickerVisible(true);
              }}>
              <Input editable={false} placeholder="End date" value={endDate} />
            </TouchableOpacity>
          </View>
          <Text>Note: weekends are not valid in this scenario</Text>
          <Button
            title="Get Data"
            onPress={() => {
              if (endDate === '' || startDate === '') {
                ToastAndroid.show(
                  'Select start and end date',
                  ToastAndroid.SHORT,
                );
              } else {
                setLoading(true);
                getSeriesByDateInterval();
              }
            }}
          />

          <ScrollView horizontal={true}>
            <View style={styles.tableContainerView}>
              {loading ? (
                <ActivityIndicator
                  size={20}
                  color="blue"
                  style={styles.centerAlign}
                />
              ) : seriesData.length > 0 ? (
                <View>
                  <Table borderStyle={styles.tableBorderStyle}>
                    <Row
                      data={['*', 'Open', 'High', 'Low', 'Close', 'Volume']}
                      widthArr={tableRowsWidth}
                      style={{}}
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
                          textStyle={{}}
                        />
                      ))}
                    </Table>
                  </ScrollView>
                </View>
              ) : undefined}
            </View>
          </ScrollView>

          <Button title="Close" onPress={() => props.close()} />
        </View>
      </View>
    </Modal>
  );
};

export default HistoricPriceDailySeries;
