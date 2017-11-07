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

const ErrorIcon = styled.div`
	width: 48px;
	height: 48px;
	background-image: url(/assets/error.svg);
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
    onClick: any,
}

const WithdrawError: React.SFC<IWithdrawProps> = ({onClick}: any) => {

    return (
        <WithdrawLayout>
            <ErrorIcon />
            <SectionGroup>
                <Header>Ошибка пополнения карты</Header>
            </SectionGroup>
            <RepeatWithdraw onClick={onClick}>Попробовать еще раз</RepeatWithdraw>
        </WithdrawLayout>
    );
};

export default WithdrawError;
