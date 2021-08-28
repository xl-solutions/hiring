import React, {Component} from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';

import {getLastQuote, searchStock} from '../wrapper/api';
import {Card, Input} from 'react-native-elements';
import StockInformationDashboard from '../components/StockInformationDashboard';

export class Dashboard extends Component {
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
    console.log('quoteData', quoteData);
    this.setState({
      isFetchingQuoteInformation: false,
      quoteInformation: quoteData,
    });

    console.log(quoteData);
  };

  renderListItem = ({item}) => (
    <TouchableOpacity
      key={item.name}
      style={{margin: 5}}
      onPress={() => {
        this.setState({
          searchableStocks: [],
          stockSelected: item,
          searchText: '',
        });
        this.getStockInformation(item);
      }}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{fontWeight: 'bold', marginBottom: 2}}>{item.symbol}</Text>
        <Text style={{fontStyle: 'italic', marginBottom: 2}}>
          {` - Currency: ${item.currency} `}
        </Text>
      </View>
      <Text>{`Type: ${item.type} - Region: ${item.region}`}</Text>
      <Text>{item.name}</Text>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={{marginHorizontal: 5, marginVertical: 10}}>
        <Input
          value={this.state.searchText}
          onChangeText={text => {
            this.setState({searchText: text}, () =>
              this.handleSearchText(text),
            );
          }}
          placeholder={'Search a stock'}
        />
        <View style={{position: 'absolute'}}>
          {this.state.loading ? (
            <ActivityIndicator size={16} color={'blue'} />
          ) : this.state.searchableStocks.length > 0 ? (
            <FlatList
              data={this.state.searchableStocks}
              renderItem={this.renderListItem}
              keyExtractor={item => item.id}
              style={{
                height: 200,
                flexGrow: 0,
                zIndex: 2,
              }}
            />
          ) : undefined}
        </View>
        {this.state.isFetchingQuoteInformation ? (
          <ActivityIndicator size={24} color={'blue'} />
        ) : this.state.quoteInformation !== undefined ? (
          <View style={{zIndex: 1}}>
            <View style={{backgroundColor: 'white'}}>
              <Card.Title>{this.state.quoteInformation.symbol}</Card.Title>
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
          </View>
        ) : undefined}
      </View>
    );
  }
}

export default Dashboard;
