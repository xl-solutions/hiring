import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  ToastAndroid,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Input, Button, Card, Divider} from 'react-native-elements';
import {getDailyAdjustedSeries} from '../wrapper/api';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';
import styles from './styles';

const EarningsProjection = props => {
  const [marketShareAmount, setMarketShareAmount] = useState('1');
  const [pastDate, setPastDate] = useState();
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [projection, setProjection] = useState(undefined);

  const calculateProjection = async () => {
    let data = await getDailyAdjustedSeries(props.symbol);
    let selectedDate = data.find(element => element.date === pastDate);
    let lastCoted = data[0];
    let valueForPastDate =
      parseFloat(selectedDate.close) * parseInt(marketShareAmount, 10);
    let valueForCurrentDate =
      parseFloat(lastCoted.close) * parseInt(marketShareAmount, 10);
    setProjection({
      symbol: props.symbol,
      boughtDate: pastDate,
      valueForGivenDate: selectedDate.close,
      valueForCurrentDate: lastCoted.close,
      lastRefreshDate: lastCoted.date,
      profit: valueForCurrentDate - valueForPastDate,
    });
    setLoading(false);
  };

  const hideDatePicker = () => setDatePickerVisible(false);

  const handleConfirm = date => {
    let fomartedDate = moment(date).format('YYYY-MM-DD');
    if (moment(date).isoWeekday() !== 6 && moment(date).isoWeekday() !== 7) {
      setPastDate(fomartedDate);
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
            isVisible={datePickerVisible}
            mode="date"
            maximumDate={new Date()}
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
          />
          <Text style={styles.titleModal}>Earnings projection</Text>
          <Divider style={styles.marginVertical5} />
          <View style={styles.directionRow}>
            <TouchableOpacity
              style={styles.defaultFlex}
              onPress={() => {
                setDatePickerVisible(true);
              }}>
              <Input
                editable={false}
                placeholder="Past date"
                value={pastDate}
              />
            </TouchableOpacity>
            <View style={styles.defaultFlex}>
              <Input
                onChangeText={text => setMarketShareAmount(text)}
                placeholder="Number of market shares"
                value={marketShareAmount}
              />
            </View>
          </View>
          <Button
            title="Calculate"
            onPress={() => {
              if (
                pastDate === undefined ||
                isNaN(parseInt(marketShareAmount, 10))
              ) {
                ToastAndroid.show(
                  'Please put valid input data',
                  ToastAndroid.SHORT,
                );
              } else {
                setLoading(true);
                calculateProjection();
              }
            }}
          />
          <View style={styles.defaultFlex}>
            {loading ? (
              <ActivityIndicator size={20} color="blue" />
            ) : projection ? (
              <Card>
                <Text>Symbol: {projection.symbol}</Text>
                <Text>Bought date: {projection.boughtDate}</Text>
                <Text>
                  Value for given date: ${projection.valueForGivenDate}
                </Text>
                <Text>
                  Value for current date: ${projection.valueForCurrentDate}
                </Text>
                <Text>Last refresh: {projection.lastRefreshDate} </Text>
                <Text>
                  Profit:{' '}
                  <Text
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{color: projection.profit < 0 ? 'red' : 'green'}}>
                    ${projection.profit.toFixed(2)}
                  </Text>
                </Text>
              </Card>
            ) : undefined}
          </View>
          <Button title="Close" onPress={() => props.close()} />
        </View>
      </View>
    </Modal>
  );
};

export default EarningsProjection;
