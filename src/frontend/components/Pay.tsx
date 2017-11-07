import * as React from 'react';
import styled from 'styled-components';
import {Header} from './layout';
import { MobilePayment } from './mobile-pay';
import { connect } from 'react-redux';
import { bankInfo } from '../utils';
import { Dispatch } from 'redux';
import {CardsBar} from './cards'
import {setCard} from '../actions'

const Wallet = styled.div`
	display: flex;
	min-height: 100%;
	background-color: #fcfcfc;
`;

const PayLayout = styled.div`
	display: -webkit-inline-flex;
	display: inline-flex;
	justify-content: center;
    position: fixed;
    flex-direction: row !important;
    align-items: center;
    width: 100%;
    height: 100%;
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

interface IPayProps {
	cards: any[],
	activeCard: any,
	activeCardId: number | null,

	dispatch: Dispatch<{}>;
}

class PayPage extends React.Component<IPayProps, any> {

	render() {
		const {cards, activeCard, activeCardId, dispatch}: any = this.props;
		return (
			<Wallet>
				<CardsBar
					cards={cards}
					disableAdd={true}
					activeCardId={activeCardId}
					setCard={(card: any) => dispatch(setCard(card))}
				/>
				<CardPane>
					<Header/>
					{activeCard &&
					<Workspace>
						<MobilePayment/>
					</Workspace>
					}
				</CardPane>
			</Wallet>
		)
	}
}
const mapStateToProps = (state: any) => {
	const cards = bankInfo(state.cards.data);
	return {
		cards,
		activeCardId: state.cards.activeCardId,
		activeCard: state.cards.activeCard,
	};
};

export default connect(mapStateToProps)(PayPage);
