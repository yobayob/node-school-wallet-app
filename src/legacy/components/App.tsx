import * as React from 'react';
import styled, {injectGlobal} from 'styled-components';
import {CardInfo} from 'card-info';
import * as PropTypes from 'prop-types';
import {CardAction} from '../agent';

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

const CardPane = styled.div`}
	flex-grow: 1;
`;

const Workspace = styled.div`
	display: flex;
	flex-wrap: wrap;
	max-width: 970px;
	padding: 15px;
`;

interface IProps {
	data: {
		cards: any[],
		transactions: any[],
	},
}

interface IApp {
	data?: any
	cardsList?: any
	activeCardIndex?: any
	cardHistory?: any
}

interface IAppState {
	cardsList?: any
	cardHistory?: any
	activeCardIndex?: number
	removeCardId?: number
	isCardRemoving?: boolean
	isCardsEditable?: boolean
}

class App extends React.Component<IApp, IAppState> {

	static propTypes = {
		data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
	};

	static prepareHistory(cardsList: any[], transactionsData: any[]) {
		return transactionsData.map((data: any) => {
			const card = cardsList.find((item: any) => item.id === Number(data.cardId));
			return card ? Object.assign({}, data, {card}) : data;
		});
	}

	static prepareCardsData(cardsData: any[]) {
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

	constructor(props: IApp) {
		super(props);
		const cardsList = App.prepareCardsData(this.props.data.cards);
		const cardHistory = App.prepareHistory(cardsList, this.props.data.transactions);
		this.state = {
			cardsList,
			cardHistory,
			activeCardIndex: 0,
			removeCardId: 0,
			isCardRemoving: false,
			isCardsEditable: false,
		};
	}

	onCardChange(activeCardIndex: any) {
		this.setState({activeCardIndex});
	}

	onEditChange(isEditable: boolean) {
		const isCardsEditable = !isEditable;
		this.setState({
			isCardsEditable,
			isCardRemoving: false,
		});
	}

	onTransaction() {
		CardAction.allCards().then(
			(data: any[]) => {
				console.log(data)
				const cardsList = App.prepareCardsData(data);
				this.setState({cardsList});

				CardAction.allTransactions().then(
					(data: any) => {
						const cardHistory = App.prepareHistory(cardsList, data);
						this.setState({cardHistory});
			});
		});
	}

	onChangeBarMode(event: any, removeCardId: number) {
		event.stopPropagation();
		this.setState({
			isCardRemoving: true,
			removeCardId,
		});
	}

	deleteCard(id: number) {
		CardAction.removeCard(id).then(
			() => {
				CardAction.allCards().then(
					(data: any) => {
						const cardsList = App.prepareCardsData(data);
						this.setState({cardsList});
					},
				)
			},
		)
	}

	render() {
		const {cardsList, activeCardIndex, cardHistory, isCardsEditable, isCardRemoving, removeCardId}: any = this.state;
		const activeCard = cardsList[activeCardIndex];

		const inactiveCardsList = cardsList.filter((card: any, index: number) => (index === activeCardIndex ? false : card));
		const filteredHistory = cardHistory.filter((data: any) => {
			return Number(data.cardId) == activeCard.id;
		});

		return (
			<Wallet>
				<CardsBar
					activeCardIndex={activeCardIndex}
					removeCardId={removeCardId}
					cardsList={cardsList}
					onCardChange={(index: number) => this.onCardChange(index)}
					isCardsEditable={isCardsEditable}
					isCardRemoving={isCardRemoving}
					deleteCard={(index: number) => this.deleteCard(index)}
					onChangeBarMode={(event: any, index: number) => this.onChangeBarMode(event, index)}
				/>
				<CardPane>
					<Header activeCard={activeCard}/>
					<Workspace>
						<History cardHistory={filteredHistory}/>
						<Prepaid
							activeCard={activeCard}
							inactiveCardsList={inactiveCardsList}
							onCardChange={(newActiveCardIndex: any) => this.onCardChange(newActiveCardIndex)}
							onTransaction={() => this.onTransaction()}
						/>
						<MobilePayment
							activeCard={activeCard}
							onTransaction={() => this.onTransaction()}
						/>
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
