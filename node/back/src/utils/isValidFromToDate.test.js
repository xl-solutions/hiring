const isValidFromToDate = require('./isValidFromToDate');

describe ('Order of dates from and to', () => {
    it('Should be able to indicate when a order date is correct or not', async () => {
        expect(isValidFromToDate("2022-05-20", "2022-05-24")).toBeTruthy() //from is less than to
        expect(isValidFromToDate("2022-05-20", "2021-05-25")).not.toBeTruthy() //from is greater than to
    })
});  