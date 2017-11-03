import * as React from 'react';
import styled, {injectGlobal} from 'styled-components';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { CardsBar } from './cards'
import {bankInfo} from '../utils';
import {getCards, createCard} from '../actions'
import {setCard, setAddingMode} from "../actions/card.action";

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

interface IAppProps {
	cards: any[],
	activeCardId: number | null,
	isAdding: boolean,
	dispatch: Dispatch<{}>;
}

class App extends React.Component<IAppProps, any> {

	constructor(props: IAppProps) {
		super(props);
		const { dispatch } = this.props;
		dispatch(getCards());
	}

	render() {
		const { cards, activeCardId, isAdding, dispatch}: any = this.props;
		return (
			<Wallet>
				<CardsBar
					setAddingMode={(mode: boolean) => dispatch(setAddingMode(mode))}
					cards={cards}
					isAdding={isAdding}
					activeCardId={activeCardId}
					createCard={(cardNumber: string) => dispatch(createCard(cardNumber))}
					setCard={(id: number) => dispatch(setCard(id))}
				/>
				<CardPane>
					<Workspace>Test</Workspace>
				</CardPane>
			</Wallet>
		)
	}
}

const mapStateToProps = (state: any) => ({
	activeCardId: state.cards.activeCardId,
	isAdding: state.cards.isAdding,
	cards: bankInfo(state.cards.data),
});

export default connect(mapStateToProps)(App);

