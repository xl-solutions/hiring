import React, {
  InputHTMLAttributes,
  useEffect,
  useRef,
  // useState,
  // useCallback,
} from 'react';
import { IconBaseProps } from 'react-icons';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { useField } from '@unform/core';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string; // making the name a mandatory prop
  icon?: React.ComponentType<IconBaseProps>;
  containerStyle?: object;
}

const Input: React.FC<InputProps> = ({
  name,
  containerStyle = {},
  icon: Icon,
  placeholder,
  ...rest
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // const [isFocused, setIsFocused] = useState(false);
  // const [isFilled, setIsFilled] = useState(false);

  const { fieldName, defaultValue, error, registerField } = useField(name);

  // const handleInputFocus = useCallback(() => {
  //   setIsFocused(true);
  // }, []);

  // const handleInputBlur = useCallback(() => {
  //   setIsFocused(false);

  //   setIsFilled(!!inputRef.current?.value);
  // }, []);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);
  return (
    <div style={containerStyle}>
      <FormControl style={{width: '100%', margin: '10px 0px'}} variant="outlined">
          <InputLabel style={{ color: !!error ? 'red' : 'rgba(0, 0, 0, 0.54)', background: 'white', paddingRight: '15px'}} htmlFor="input-label">{placeholder}</InputLabel>
          <OutlinedInput
            error={!!error}
            id="input-label"
            type='text'
            name="name"
            defaultValue={defaultValue}
            // onBlur={handleInputBlur}
            inputRef={inputRef}
            startAdornment={
              <InputAdornment position="start">
                {Icon && <Icon style={{color: !!error ? 'red' : 'rgba(0, 0, 0, 0.54)'}} size={20} />}
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>
        {error &&
          <span style={{color: 'red'}}>{`*${error}*`}</span>
        }
    </div>
  );
};

export default Input;
