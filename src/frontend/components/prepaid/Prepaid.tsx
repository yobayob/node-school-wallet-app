import * as React from 'react';
import PrepaidContract from './PrepaidContract';
import PrepaidSuccess from './PrepaidSuccess';
import PrepaidError from './PrepaidError';
import { Dispatch } from 'redux';
import {prepaid, prepaidRepeat} from '../../actions'
import { connect } from 'react-redux';

interface  IPrepaidProps {
	cards: any,
	activeCard: any,
	stage: string,
	transaction: any,

	dispatch: Dispatch<{}>,
}

class Prepaid extends React.Component<IPrepaidProps, {}> {
	constructor(props: any) {
		super(props)
	}

	render() {
		const {cards, activeCard, dispatch, stage}: any = this.props;
		if (activeCard) {
			if (stage === 'success') {
				const {transaction}: any = this.props;
				return(
					<PrepaidSuccess transaction={transaction} onClick={() => dispatch(prepaidRepeat())}/>
				)
			}
			if (stage === 'error') {
				return(
					<PrepaidError onClick={() => dispatch(prepaidRepeat())}/>
				)
			}

			return (
				<PrepaidContract
					onSubmit={(cardId: number, sum: number) => dispatch(prepaid(cardId, sum))}
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
		stage: state.prepaid.stage,
		transaction: state.prepaid.transaction,
	};
};

export default connect(mapStateToProps)(Prepaid);

