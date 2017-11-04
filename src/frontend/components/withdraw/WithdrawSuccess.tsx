import * as React from 'react';
import styled from 'styled-components';
import {Island, Title} from '../';

const WithdrawLayout = styled(Island)`
	width: 440px;
	display: flex;
	flex-direction: column;
	background-color: #353536;
	position: relative;
	color: #fff;
`;

const CheckIcom = styled.div`
	width: 48px;
	height: 48px;
	background-image: url(/assets/round-check.svg);
	position: absolute;
	top: 14;
	right: 20;
`;

const Header = styled(Title)`
	color: #fff;
`;

const SectionGroup = styled.div`
	margin-bottom: 20px;
`;

const Section = styled.div`
	margin-bottom: 20px;
	width: 100%;
`;

const SectionLabel = styled.div`
	font-size: 13px;
	text-align: left;
`;

const SectionValue = styled.div`
	font-size: 13px;
	letter-spacing: 0.6px;
`;

const RepeatWithdraw = styled.button`
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

interface IWithdrawProps {
	transaction: any,
	onClick: any,
}

const WithdrawSuccess: React.SFC<IWithdrawProps> = ({transaction, onClick}: any) => {
	const {sum, data}: any = transaction;

	return (
		<WithdrawLayout>
			<CheckIcom />
			<SectionGroup>
				<Header>Карта пополнена</Header>
				<Section>
					<SectionLabel>Название платежа:</SectionLabel>
					<SectionValue>Вывод на привязанную карту</SectionValue>
				</Section>
				<Section>
					<SectionLabel>Карта с которой пополнили:</SectionLabel>
					<SectionValue>{data}</SectionValue>
				</Section>
				<Section>
					<SectionLabel>Сумма:</SectionLabel>
					<SectionValue>{Math.abs(sum)} ₽</SectionValue>
				</Section>
			</SectionGroup>
			<RepeatWithdraw onClick={onClick}>Отправить еще один перевод</RepeatWithdraw>
		</WithdrawLayout>
	);
};

export default WithdrawSuccess;
