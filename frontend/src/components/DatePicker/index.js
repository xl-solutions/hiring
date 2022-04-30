import { useState, forwardRef } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import { getYear, getMonth } from "date-fns";
import range from "lodash/range";
import 'react-datepicker/dist/react-datepicker.css';

import pt from "date-fns/locale/pt-BR";

registerLocale("pt", pt);

const GetDate = () => {
    const [startDate, setStartDate] = useState(new Date());
    const GetDateInput = forwardRef(({ value, onClick }, ref) => (
      <button className="get-date-input" onClick={onClick} ref={ref}>
        {value}
      </button>
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
        onChange={(date) => setStartDate(date)}
        includeDates={[new Date("04-21-2022"), new Date()]}
        customInput={<GetDateInput />}
        locale="pt"
      />
    );
  };

export default GetDate;