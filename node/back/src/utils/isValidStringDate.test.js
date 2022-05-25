const isValidStringDate = require('./isValidStringDate');

describe ('Date format', () => {
    it('Should be able to indicate when a date is correct or not', async () => {
        const today = (new Date()).toISOString().split('T')[0];
        console.log(today);
        expect(isValidStringDate(today)).toBeTruthy() //today
        expect(isValidStringDate("2024-05-25")).not.toBeTruthy() //future date
        expect(isValidStringDate("20-03-2022")).not.toBeTruthy() //wrong format
        expect(isValidStringDate("hola")).not.toBeTruthy() //wrong format
        expect(isValidStringDate("20323-03-20")).not.toBeTruthy() //wrong date
    })
});  