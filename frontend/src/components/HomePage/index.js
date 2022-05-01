import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import QuotePage from '../QuotePage';
import HistoryPage from '../HistoryPage';
import ComparePage from '../ComparePage';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const HomePage = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Cotação" />
        <Tab label="Histórico" />
        <Tab label="Comparar" />
        <Tab label="Projeção" />
      </Tabs>
    </Paper>
    <TabPanel value={value} index={0}>
      <QuotePage />
    </TabPanel>
    <TabPanel value={value} index={1}>
      <HistoryPage />
    </TabPanel>
    <TabPanel value={value} index={2}>
      <ComparePage />
    </TabPanel>
    </React.Fragment>
  );
}

export default HomePage;