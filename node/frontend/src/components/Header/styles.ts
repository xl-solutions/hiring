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

	> a {
		h1 {
			color: #fff;
			min-width: 230px;
			margin-left: -30px;
		}
	}

	a {
		color: #89d718;
		text-decoration: none;
		display: inline-block;
		padding: 20px;
    margin: 20px;

		&:hover {
			color: ${shade(0.2, '#89d718')}
		}
	}
`;
