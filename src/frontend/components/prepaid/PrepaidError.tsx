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

const CheckIcom = styled.div`
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

interface IPrepaidSuccess{
    onClick: any,
}

const PrepaidError: React.SFC<IPrepaidSuccess> = ({onClick}: any) => {

    return (
        <PrepaidLayout>
            <CheckIcom />
            <SectionGroup>
                <Header>Ошибка пополнения карты</Header>
            </SectionGroup>
            <RepeatPayment onClick={onClick}>Попытаться снова</RepeatPayment>
        </PrepaidLayout>
    );
};

export default PrepaidError;
