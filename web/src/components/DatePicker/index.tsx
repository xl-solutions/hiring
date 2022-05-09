import { forwardRef, ForwardRefRenderFunction } from 'react';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import deLocale from 'date-fns/locale/pt-BR';
import DateFnsUtils from '@date-io/date-fns';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import { Container } from './styles';

interface DatePickerProps {
  value: any;
  setValue: any;
  label: string;
  refetchData?: any;
}

export function DatePicker({
  value,
  setValue,
  label,
  refetchData,
}: DatePickerProps) {
  const handleDateChange = async (date: MaterialUiPickersDate) => {
    setValue(date);
    refetchData();
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={deLocale}>
      <Container>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker"
          label={label}
          value={value}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
          style={{
            width: '100%',
          }}
        />
      </Container>
    </MuiPickersUtilsProvider>
  );
}
