import React, {useContext, useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Card, Button} from 'react-native-elements';
import {Divider} from 'react-native-elements/dist/divider/Divider';
import EarningsProjection from '../components/EarningsProjection';
import HistoricPriceDailySeries from '../components/HistoricPriceDailySeries';

import {PortfolioContext} from '../services/portfolioContext';
import styles from './styles';

const Portfolio = () => {
  const [portfolio] = useContext(PortfolioContext);
  const [historicPriceModalVisible, setHistoricPriceModalVisible] =
    useState(false);
  const [earningsProjectionVisible, setEarningsProjectionVisible] =
    useState(false);
  const [currentSymbol, setCurrentSymbol] = useState('');

  return (
    <View>
      <HistoricPriceDailySeries
        symbol={currentSymbol}
        visible={historicPriceModalVisible}
        close={() => setHistoricPriceModalVisible(false)}
      />
      <EarningsProjection
        symbol={currentSymbol}
        visible={earningsProjectionVisible}
        close={() => setEarningsProjectionVisible(false)}
      />

      {portfolio.map(element => (
        <Card key={element.symbol}>
          <Text style={styles.cardTitle}>{element.symbol}</Text>
          <Divider style={styles.divider} />
          <View style={styles.directionRow}>
            <Text style={styles.defaultFlex}>Price: {element.price}</Text>
            <Text style={styles.defaultFlex}>
              Last refresh: {element.latestTradingDay}
            </Text>
          </View>
          <View style={styles.btnsRow}>
            <Button
              title="Historic prices"
              buttonStyle={styles.btnLeft}
              onPress={() => {
                setCurrentSymbol(element.symbol);
                setHistoricPriceModalVisible(true);
              }}
            />
            <Button
              title="Earnings projection"
              buttonStyle={styles.btnRight}
              onPress={() => {
                setCurrentSymbol(element.symbol);
                setEarningsProjectionVisible(true);
              }}
            />
          </View>
        </Card>
      ))}
    </View>
  );
};

export default Portfolio;
