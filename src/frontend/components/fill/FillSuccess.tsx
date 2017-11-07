import * as React from 'react';
import styled from 'styled-components';
import {Island} from '../';

const FillLayout: any = styled(Island)`
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

const Repeat: any = styled.button`
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
interface IFillSuccess {
	transaction?: any
	onClick?: any
	activeCard?: any
}

const FillSuccess: React.SFC<IFillSuccess> = ({transaction, onClick}: any) => {
	const {data, commission, id}: any = transaction;
	return (
		<FillLayout>
			<SuccessIcon />
			<Header>Карта пополнена</Header>
			<Sum>{Math.abs(transaction.sum)} ₽</Sum>
			<Section>
				<SectionLabel>Номер транзакции</SectionLabel>
				<SectionValue>{id}</SectionValue>
			</Section>
			<Repeat onClick={onClick}>Отправить еще один перевод</Repeat>
		</FillLayout>
	);
};

export default FillSuccess;
