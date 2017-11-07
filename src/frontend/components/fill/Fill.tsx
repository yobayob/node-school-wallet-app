import * as React from 'react';
import { FillContract, FillSuccess, FillError} from './'
import { fillRepeat, fillMobile } from '../../actions'
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

interface IFill {
	stage: string,
	transaction: any,
	dispatch: Dispatch<{}>;
}

class Fill extends React.Component<IFill, {}> {

	constructor(props: IFill) {
		super(props);
	}

	render() {
		const {stage, dispatch}: any = this.props;
		if (stage === 'success') {
			const { transaction }: any = this.props;
			return (
				<FillSuccess transaction={transaction} onClick={() => dispatch(fillRepeat())}/>
			);
		}
		if (stage === 'error') {
			return (
				<FillError onClick={() => dispatch(fillRepeat())}/>
			);
		}

		return (
			<FillContract onClick={(amount: number, data: string) => dispatch(fillMobile(amount, `Пополнение средств`))}/>
		)
	}
}

const mapStateToProps = (state: any) => {
	return {
		stage: state.fill.stage,
		transaction: state.fill.transaction,
	};
};

export default connect(mapStateToProps)(Fill);
