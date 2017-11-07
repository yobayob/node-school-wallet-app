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

const CardErrorLayout: any = styled(CardLayout)`
	box-sizing: border-box;
	background: rgba(250,0,0,0.3);
`;

const Header: any = styled.div`
	font-size: 18px;
	color:rgba(255,255,255,0.6);
`;

interface ICardError {
    onClick?: any
}

const CardError: React.SFC<ICardError> = () => {
    return (
        <CardErrorLayout>
            <Header>Ошибка создания карты</Header>
        </CardErrorLayout>
    );
};

export default CardError;
