import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  separatorSeries: {margin: 5, fontWeight: 'bold', fontSize: 16},
  seriesTouchable: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  dividerMargin: {marginBottom: 5},
  viewShadowBorder: {
    margin: 5,
    backgroundColor: '#d9d9d9',
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  directionRow: {flexDirection: 'row'},
  defaultFlex: {flex: 1},
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    margin: 20,
    flex: 1,
  },
  tableBorderStyle: {borderWidth: 1, borderColor: '#C1C0B9'},
  backgroundTableCell: {backgroundColor: '#F7F6E7'},
  scrollStyle: {marginTop: -1},
  titleModal: {alignSelf: 'center', fontSize: 20, fontWeight: 'bold'},
  marginVertical5: {marginVertical: 5},
  headingTextTable: {fontWeight: 'bold', alignSelf: 'center'},
  tableContainerView: {
    marginVertical: 5,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerAlign: {alignSelf: 'center'},
});

export default styles;
