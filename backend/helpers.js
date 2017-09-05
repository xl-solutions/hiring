const moment = require('moment');

module.exports = {
    date: {
        getDate: () => {
            return moment().format('YYYY-MM-DD');
        },
        getWeekDay: () => {
            return moment().format('dddd');
        },
        subtractDate: (quantity, type) => {
            return moment().subtract(quantity, type).format('YYYY-MM-DD');
        },
    },
};
