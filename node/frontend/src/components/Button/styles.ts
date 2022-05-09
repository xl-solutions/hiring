import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
	  background: #89d718;
		height: 40px;
		border-radius: 10px;
  	border: 0;
		padding: 0 20px;
		width: 100%;
		transition: background-color 0.2s;
		margin-top: 20px;

		&:hover {
    background: ${shade(0.2, '#89d718')}
  }
`;

