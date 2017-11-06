import * as React from 'react';
import styled from 'styled-components';
import {Island, Title} from '../';

const PrepaidLayout = styled(Island)`
	width: 350px;
	display: flex;
	flex-direction: column;
	background-color: #353536;
	position: relative;
	color: #fff;
`;

const Header = styled(Title)`
	color: #fff;
`;

const SectionGroup = styled.div`
	margin-bottom: 40px;
`;

const RepeatPayment = styled.button`
	font-size: 13px;
	background-color: rgba(0, 0, 0, 0.08);
	height: 42px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: none;
	width: 100%;
	position: absolute;
	left: 0;
	bottom: 0;
	cursor: pointer;
	text-transform: uppercase;
`;

interface IPrepaidError {
	onClick: any,
}

const PrepaidError: React.SFC<IPrepaidError> = ({onClick}: any) => {

	return (
		<PrepaidLayout>
			<SectionGroup>
				<Header>Ошибка пополнения карты</Header>
			</SectionGroup>
			<RepeatPayment onClick={onClick}>Попробовать еще раз</RepeatPayment>
		</PrepaidLayout>
	);
};

export default PrepaidError;
