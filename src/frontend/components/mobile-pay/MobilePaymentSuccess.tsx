import * as React from 'react';
import styled from 'styled-components';
import {Island} from '../';

const MobilePaymentLayout: any = styled(Island)`
	width: 440px;
	background: #108051;
	position: relative;
	color: #fff;
`;

const SuccessIcon: any = styled.div`
	width: 48px;
	height: 48px;
	background-image: url(/assets/round-check.svg);
	position: absolute;
	top: 27;
	right: 32;
`;

const Header: any = styled.div`
	font-size: 24px;
`;

const Sum: any = styled.div`
	font-size: 48px;
`;

const CommissionTips: any = styled.div`
	font-size: 13px;
	opacity: 0.6;
	margin-bottom: 20px;
`;

const Section: any = styled.div`
	position: relative;
	padding-left: 160px;
	margin-bottom: 20px;
`;

const SectionLabel: any = styled.div`
	font-size: 15px;
	position: absolute;
	left: 0px;
`;

const SectionValue: any = styled.div`
	font-size: 15px;
`;

const Instruction: any = styled.div`
	margin-bottom: 40px;
	font-size: 15px;
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
interface IMobilePaymentSuccess {
	transaction?: any
	onClick?: any
	activeCard?: any
}

const MobilePaymentSuccess: React.SFC<IMobilePaymentSuccess> = ({transaction, onClick}: any) => {
	const {data, commission, id}: any = transaction;
	return (
		<MobilePaymentLayout>
			<SuccessIcon />
			<Header>МегаФон (Россия)</Header>
			<Sum>{Math.abs(transaction.sum)} ₽</Sum>
			<CommissionTips>В том числе комиссия 3 ₽</CommissionTips>
			<Section>
				<SectionLabel>Номер транзакции</SectionLabel>
				<SectionValue>{id}</SectionValue>
			</Section>
			<Section>
				<SectionLabel>Номер телефона</SectionLabel>
				<SectionValue>{data}</SectionValue>
			</Section>
			<Instruction>
				Мы пришлем чек на sam@yandex.ru. Вы можете изменить email в «Настройках».
			</Instruction>
			<RepeatPayment onClick={onClick}>Отправить еще один перевод</RepeatPayment>
		</MobilePaymentLayout>
	);
};

export default MobilePaymentSuccess;
