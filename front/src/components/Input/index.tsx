import React, {
  InputHTMLAttributes,
  useCallback,
  useRef,
  useState,
} from 'react';

import { IconBaseProps } from 'react-icons';
import { Container } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon: React.ComponentType<IconBaseProps> | null;
}

const Input: React.FC<InputProps> = ({ defaultValue, icon: Icon, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputRef.current?.value);
  }, []);

  return (
    <Container isFilled={isFilled} isFocused={isFocused}>
      {Icon && <Icon size={20} />}
      <input
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        defaultValue={defaultValue}
        ref={inputRef}
        {...rest}
      />
    </Container>
  );
};
export default Input;
