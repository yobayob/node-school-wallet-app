import * as React from 'react';
import styled from 'styled-components';
import {setCard} from '../../actions';
import {Card} from './'

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

interface ICardsBar {
	cards: any[],
	setCard: any,
	activeCardId: number | null,
	createCard: any,
	isAdding: boolean
	setAddingMode: any
}


class CardsBar extends React.Component<ICardsBar, any> {

	constructor(props: ICardsBar) {
		super(props);
		this.state = {
			isAdding: false,
		}
	}

	render() {
		const {cards, isAdding, setCard, activeCardId, isCardCreating, createCard, setAddingMode}: any = this.props;
		return (
			<Layout>
				<Logo />
				<CardsList>
					{isAdding && <Card type='form' onClick={createCard} onCancel={() => setAddingMode(false)}/>}
					{!isAdding && <Card type='new' onClick={() => setAddingMode(true)}/>}
					{cards.map((card: any) => (
						<Card
							key={card.id}
							data={card}
							onClick={() => setCard(card)}
							active={card.id === activeCardId}
						/>
					))}
				</CardsList>
			</Layout>)
	}
}

export default CardsBar;
