import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
	color: #fff;
	background-color: #333;
`;

export const Content = styled.div`
	display: flex;
	max-height: 60px;
	align-items: center;

	h1 {
		min-width: 230px;
	}

	a {
		color: #89d718;
		text-decoration: none;
		display: inline-block;
		padding: 30px;
    margin: 30px;

		&:hover {
			color: ${shade(0.2, '#89d718')}
		}
	}
`;
