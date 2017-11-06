import WithdrawContract from './WithdrawContract';
import {WithdrawSuccess, WithdrawError} from './';

import * as React from 'react';
import { withdraw, withdrawRepeat } from '../../actions';

import { Dispatch } from 'redux';
import { prepaid, prepaidRepeat } from '../../actions'
import { connect } from 'react-redux';

interface  IWithdrawProps {
	cards: any,
	activeCard: any,
	stage: string,
	transaction: any,

	dispatch: Dispatch<{}>,
}

class Withdraw extends React.Component<IWithdrawProps, {}> {
	constructor(props: any) {
		super(props)
	}

	render() {
		const {cards, activeCard, dispatch, stage}: any = this.props;
		if (activeCard) {
			if (stage === 'success') {
				const {transaction}: any = this.props;
				return(
					<WithdrawSuccess transaction={transaction} onClick={() => dispatch(withdrawRepeat())}/>
				)
			}
			if (stage === 'error') {
				return(
					<WithdrawError onClick={() => dispatch(withdrawRepeat())}/>
				)
			}

			return (
				<WithdrawContract
					onSubmit={(cardId: number, sum: number) => dispatch(withdraw(cardId, sum))}
					cards={cards.filter((c: any) => c.id !== activeCard.id)}
					activeCard={activeCard}
				/>
			)
		} else {
			return (<div/>)
		}
	}
}

const mapStateToProps = (state: any) => {
	return {
		stage: state.withdraw.stage,
		transaction: state.withdraw.transaction,
	};
};

export default connect(mapStateToProps)(Withdraw);
