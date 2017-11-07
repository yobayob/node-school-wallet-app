import * as React from 'react';
import styled from 'styled-components';
import {Island} from '../';

const FillLayout: any = styled(Island)`
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
interface IFillError {
	onClick?: any
	activeCard?: any
}

const FillError: React.SFC<IFillError> = ({onClick}: any) => {
	return (
		<FillLayout>
			<SectionGroup>
				<Header>Ошибка перевода средств</Header>
			</SectionGroup>
			<Repeat onClick={onClick}>Попробовать еще раз</Repeat>
		</FillLayout>
	);
};

export default FillError;
