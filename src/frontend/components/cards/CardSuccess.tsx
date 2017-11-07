import * as React from 'react';
import styled from 'styled-components';

const CardLayout: any = styled.div`
	position: relative;
	width: 280px;
	height: 164px;
	min-width: 250px;
	box-sizing: border-box;
	margin-bottom: 15px;
	padding: 25px 20px 20px 25px;
	border-radius: 4px;
	background-color: ${({bgColor, active}: any) => active ? bgColor : 'rgba(255, 255, 255, 0.1)'};
`;

const CardSuccessLayout: any = styled(CardLayout)`
	box-sizing: border-box;
	background:	rgba(0,250,0,0.2);
`;

const SuccessIcon: any = styled.div`
	width: 48px;
	height: 48px;
	background-image: url(/assets/round-check.svg);
	opacity: 0.6;
	position: absolute;
	top: 27;
`;

const Header: any = styled.div`
	font-size: 18px;
	color: rgba(255,255,255,0.6);
	position: absolute;
    left: 80px;

`;

interface ICardSuccess {
    onClick?: any
}

const CardSuccess: React.SFC<ICardSuccess> = () => {
    return (
        <CardSuccessLayout>
            <SuccessIcon />
            <Header>Карта успешно создана</Header>
        </CardSuccessLayout>
    );
};

export default CardSuccess;
