import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  directionRow: {flexDirection: 'row'},
  detailSearchBold: {fontWeight: 'bold', marginBottom: 2},
  detailSearchItalic: {fontStyle: 'italic', marginBottom: 2},
  container: {marginHorizontal: 5, marginVertical: 10},
  dropdownMainView: {
    position: 'absolute',
    backgroundColor: 'white',
    top: 50,
    left: 20,
    width: '90%',
    zIndex: 2,
  },
  dropdownInnerView: {
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  flatListStyle: {
    height: 200,
    flexGrow: 0,
    zIndex: 2,
  },
  zIndex1: {zIndex: 1},
  viewCard: {
    backgroundColor: 'white',
    marginHorizontal: 5,
    padding: 5,
  },
  addStockBtn: {margin: 10},
  touchableListItem: {margin: 5},
  defaultFlex: {flex: 1},
  divider: {margin: 5},
  btnsRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  btnLeft: {marginRight: 5, height: 30, paddingVertical: 0},
  btnRight: {marginLeft: 5, height: 30, paddingVertical: 0},
  cardTitle: {alignSelf: 'center', fontWeight: 'bold'},
  separatorInformations: {margin: 5, fontWeight: 'bold', fontSize: 16},
  dividerMargin: {marginVertical: 5},
});

export default styles;
