import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import {Card, CardDelete} from './';

const Layout = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	background-color: #242424;
	padding: 20px;
`;

const Logo = styled.div`
	width: 147px;
	height: 28px;
	margin-bottom: 55px;
	background-image: url('/assets/yamoney-logo.svg');
`;

const Edit = styled.div`
	position: absolute;
	top: 25px;
	right: 20px;
	width: 18px;
	height: 18px;
	background-image: url('/assets/cards-edit.svg');
`;

const CardsList = styled.div`
	flex: 1;
`;

const Footer = styled.footer`
	color: rgba(255, 255, 255, 0.2);
	font-size: 15px;
`;

interface ICardsBarProps {
	cardsList?: any
	activeCardIndex?: any
	onCardChange?: any
	removeCardId?: any
	isCardsEditable?: any
	isCardRemoving?: any
	deleteCard?: any
	onChangeBarMode?: any
}

const CardsBar: React.SFC<ICardsBarProps> = (
	{activeCardIndex, cardsList, onCardChange, onEditChange, isCardsEditable, isCardRemoving, onChangeBarMode, removeCardId, deleteCard}: any
) => {
	const onCardClick: any = (activeCardIndex: any) => {
		onCardChange && onCardChange(activeCardIndex);
	};

	if (isCardRemoving) {
		return (
			<Layout>
				<Logo />
				<CardDelete
					deleteCard={deleteCard}
					data={cardsList.filter((item: any) => item.id === removeCardId)[0]}
				/>
				<Footer>Yamoney Node School</Footer>
			</Layout>
		);
	}

	return (
		<Layout>
			<Logo />
			{isCardsEditable && <Edit />}
			<CardsList>
				{cardsList.map((card: any, index: any) => (
					<Card
						key={index}
						data={card}
						isCardsEditable={isCardsEditable}
						active={index === activeCardIndex}
						onClick={() => onCardClick(index)}/>
				))}
				<Card type='new'/>
			</CardsList>
			<Footer>Yamoney Node School</Footer>
		</Layout>
	);
};

CardsBar.propTypes = {
	cardsList: PropTypes.arrayOf(PropTypes.object).isRequired,
	activeCardIndex: PropTypes.number.isRequired,
	removeCardId: PropTypes.number,
	onCardChange: PropTypes.func.isRequired,
	isCardsEditable: PropTypes.bool.isRequired,
	isCardRemoving: PropTypes.bool.isRequired,
	deleteCard: PropTypes.func.isRequired,
	onChangeBarMode: PropTypes.func.isRequired
};

export default CardsBar;
