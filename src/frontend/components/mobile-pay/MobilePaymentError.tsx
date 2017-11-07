import * as React from 'react';
import styled from 'styled-components';
import {Island} from '../';

const MobilePaymentLayout: any = styled(Island)`
	width: 440px;
	background: #108051;
	position: relative;
	color: #fff;
`;

const Header: any = styled.div`
	font-size: 24px;
`;

const SectionGroup = styled.div`
	margin-bottom: 40px;
`;

const RepeatPayment: any = styled.button`
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
interface IMobilePaymentError {
	onClick?: any
	activeCard?: any
}

const MobilePaymentError: React.SFC<IMobilePaymentError> = ({onClick}: any) => {
	return (
		<MobilePaymentLayout>
			<SectionGroup>
				<Header>Ошибка перевода средств</Header>
			</SectionGroup>
			<RepeatPayment onClick={onClick}>Попробовать еще раз</RepeatPayment>
		</MobilePaymentLayout>
	);
};

export default MobilePaymentError;
