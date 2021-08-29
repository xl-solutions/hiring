import React, {Component} from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';

import {getLastQuote, searchStock} from '../wrapper/api';
import {Button, Input, Divider} from 'react-native-elements';
import StockInformationDashboard from '../components/StockInformationDashboard';
import {PortfolioContext} from '../services/portfolioContext';
import styles from './styles';

export class Dashboard extends Component {
  static contextType = PortfolioContext;

  state = {
    stockSelected: undefined,
    searchText: '',
    searchableStocks: [],
    loading: false,
    isFetchingQuoteInformation: false,
    quoteInformation: undefined,
  };

  componentDidMount = () => {};

  setValue = callback => {
    this.setState(state => ({
      value: callback(state.value),
    }));
  };

  handleSearchText = async () => {
    if (this.state.searchText === '') {
      this.setState({searchableStocks: []});
      return;
    }
    this.setState({loading: true});
    let searchResult = await searchStock(this.state.searchText);
    this.setState({loading: false, searchableStocks: searchResult});
  };

  getStockInformation = async stock => {
    this.setState({
      isFetchingQuoteInformation: true,
    });
    let quoteData = await getLastQuote(stock.symbol);
    this.setState({
      isFetchingQuoteInformation: false,
      quoteInformation: quoteData,
    });
  };

  renderListItem = ({item}) => (
    <TouchableOpacity
      key={item.name}
      style={styles.touchableListItem}
      onPress={() => {
        this.setState({
          searchableStocks: [],
          stockSelected: item,
          searchText: '',
        });
        this.getStockInformation(item);
      }}>
      <View style={styles.directionRow}>
        <Text style={styles.detailSearchBold}>{item.symbol}</Text>
        <Text style={styles.detailSearchItalic}>
          {` - Currency: ${item.currency} `}
        </Text>
      </View>
      <Text>{`Type: ${item.type} - Region: ${item.region}`}</Text>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        <Input
          value={this.state.searchText}
          onChangeText={text => {
            this.setState({searchText: text}, () =>
              this.handleSearchText(text),
            );
          }}
          placeholder={'Search a stock'}
        />
        <View style={styles.dropdownMainView}>
          {this.state.loading ? (
            <ActivityIndicator size={16} color={'blue'} />
          ) : this.state.searchableStocks.length > 0 ? (
            <View style={styles.dropdownInnerView}>
              <FlatList
                data={this.state.searchableStocks}
                renderItem={this.renderListItem}
                keyExtractor={item => item.symbol}
                style={styles.flatListStyle}
              />
            </View>
          ) : undefined}
        </View>
        {this.state.isFetchingQuoteInformation ? (
          <ActivityIndicator size={24} color={'blue'} />
        ) : this.state.quoteInformation !== undefined ? (
          <View style={styles.zIndex1}>
            <Text style={styles.separatorInformations}>Informations</Text>
            <Divider style={styles.dividerMargin} />
            <View style={styles.viewCard}>
              <Text>Symbol: {this.state.quoteInformation.symbol}</Text>
              <Text>Open: {this.state.quoteInformation.open}</Text>
              <Text>High: {this.state.quoteInformation.high}</Text>
              <Text>Low: {this.state.quoteInformation.low}</Text>
              <Text>Price: {this.state.quoteInformation.price}</Text>
              <Text>Volume: {this.state.quoteInformation.volume}</Text>
              <Text>
                Latest trading day:{' '}
                {this.state.quoteInformation.latestTradingDay}
              </Text>
              <Text>
                Previous close: {this.state.quoteInformation.previousClose}
              </Text>
              <Text>Change: {this.state.quoteInformation.change}</Text>
              <Text>
                Change percent: {this.state.quoteInformation.changePercent}
              </Text>
            </View>
            <StockInformationDashboard
              stock={this.state.quoteInformation.symbol}
            />
            <Button
              title="Add Stock To Portfolio"
              buttonStyle={styles.addStockBtn}
              onPress={() => {
                let [portfolio, setPortfolio] = this.context;
                if (
                  portfolio.findIndex(
                    element =>
                      element.symbol === this.state.quoteInformation.symbol,
                  ) === -1
                ) {
                  setPortfolio(prevPortfolio => [
                    ...prevPortfolio,
                    {
                      symbol: this.state.quoteInformation.symbol,
                      price: this.state.quoteInformation.price,
                      latestTradingDay:
                        this.state.quoteInformation.latestTradingDay,
                    },
                  ]);
                  ToastAndroid.show(
                    'Stock added succesfully',
                    ToastAndroid.LONG,
                  );
                } else {
                  ToastAndroid.show(
                    'This stock already in your portfolio',
                    ToastAndroid.LONG,
                  );
                }
              }}
            />
          </View>
        ) : undefined}
      </View>
    );
  }
}

export default Dashboard;
