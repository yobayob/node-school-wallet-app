import * as React from 'react';
import styled, {injectGlobal} from 'styled-components';
import {CardInfo} from 'card-info';

import {
	CardsBar,
	Header,
	History,
	Prepaid,
	MobilePayment,
	Withdraw,
} from './';

injectGlobal`
	html,
	body {
		margin: 0;
	}
	#root {
		height: 100%;
		font-family: 'Open Sans';
		color: #000;
	}
`;

const Wallet = styled.div`
	display: flex;
	min-height: 100%;
	background-color: #fcfcfc;
`;

const CardPane = styled.div`
	flex-grow: 1;
`;

const Workspace = styled.div`
	display: flex;
	flex-wrap: wrap;
	max-width: 970px;
	padding: 15px;
`;

const cardsData = require('../../backend/source/cards.json');
const transactionsData = require('../../backend/source/transactions.json');

class App extends React.Component {
	constructor() {
		super();
		const cardsList = this.prepareCardsData(cardsData);
		const cardHistory = transactionsData.map((data: any) => {
			const card = cardsList.find((card) => card.id === data.cardId);
			return card ? Object.assign({}, data, {card}) : data;
		});

		this.state = {
			cardsList,
			cardHistory,
			activeCardIndex: 0,
		};
	}

	prepareCardsData(cardsData: any[]) {
		return cardsData.map((card) => {
			const cardInfo = new CardInfo(card.cardNumber, {
				banksLogosPath: '/assets/',
				brandsLogosPath: '/assets/',
			});

			return {
				id: card.id,
				balance: card.balance,
				number: cardInfo.numberNice,
				bankName: cardInfo.bankName,
				theme: {
					bgColor: cardInfo.backgroundColor,
					textColor: cardInfo.textColor,
					bankLogoUrl: cardInfo.bankLogoSvg,
					brandLogoUrl: cardInfo.brandLogoSvg,
					bankSmLogoUrl: `/assets/${cardInfo.bankAlias}-history.svg`,
				},
			};
		});
	}

	onCardChange(activeCardIndex: any) {
		this.setState({activeCardIndex});
	}

	render() {
		const {cardsList, activeCardIndex, cardHistory}: any = this.state;
		const activeCard = cardsList[activeCardIndex];

		const inactiveCardsList = cardsList.filter((card: any, index: any) => index === activeCardIndex ? false : card);
		const filteredHistory = cardHistory.filter((data: any) => data.cardId === activeCard.id);

		return (
			<Wallet>
				<CardsBar
					activeCardIndex={activeCardIndex}
					cardsList={cardsList}
					onCardChange={(activeCardIndex: any) => this.onCardChange(activeCardIndex)}/>
				<CardPane>
					<Header activeCard={activeCard}/>
					<Workspace>
						<History cardHistory={filteredHistory}/>
						<Prepaid
							activeCard={activeCard}
							inactiveCardsList={inactiveCardsList}
							onCardChange={(newActiveCardIndex: any) => this.onCardChange(newActiveCardIndex)}
						/>
						<MobilePayment activeCard={activeCard}/>
						<Withdraw
							activeCard={activeCard}
							inactiveCardsList={inactiveCardsList}
						/>
					</Workspace>
				</CardPane>
			</Wallet>
		);
	}
}

export default App;
