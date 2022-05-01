import { useState, forwardRef } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import Button from '@material-ui/core/Button';
import { getYear, getMonth } from "date-fns";
import range from "lodash/range";
import 'react-datepicker/dist/react-datepicker.css';

import pt from "date-fns/locale/pt-BR";

registerLocale("pt", pt);

const formatDate = (date) => {
  let newDate = new Date(date),
    month = '' + (newDate.getMonth() + 1),
    day = '' + newDate.getDate(),
    year = newDate.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

const GetDatePicker = ({ onDateChange, datesArray }) => {

  const newDatesArray = datesArray.map((key) => {
    return new Date(key);
  });

  const [startDate, setStartDate] = useState(false);
  const changeDate = (date) => {
    setStartDate(date);
    onDateChange(formatDate(date));
  };

  const GetDateInput = forwardRef(({ value, onClick }, ref) => (
    <Button variant="contained" color="primary" onClick={onClick} ref={ref}>
      {value ? value : "00/00/0000"}
    </Button>
  ));
  const years = range(2005, getYear(new Date()) + 1, 1);
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  return (
    <DatePicker
      renderCustomHeader={({
        date,
        changeYear,
        changeMonth,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div
          style={{
            margin: 10,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
            {"<"}
          </button>
          <select
            value={getYear(date)}
            onChange={({ target: { value } }) => changeYear(value)}
          >
            {years.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <select
            value={months[getMonth(date)]}
            onChange={({ target: { value } }) =>
              changeMonth(months.indexOf(value))
            }
          >
            {months.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>

          <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
            {">"}
          </button>
        </div>
      )}
      selected={startDate}
      dateFormat="dd/MM/yyyy"
      onChange={(date) => changeDate(date)}
      includeDates={newDatesArray}
      customInput={<GetDateInput />}
      locale="pt"
    />
  );
};

export default GetDatePicker;
