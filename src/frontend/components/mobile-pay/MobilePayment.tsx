import * as React from 'react';
import { MobilePaymentContract, MobilePaymentSuccess, MobilePaymentError} from './'
import { payRepeat, payMobile } from '../../actions'
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

interface IMobile {
	stage: string,
	transaction: any,
	dispatch: Dispatch<{}>;
}

class MobilePayment extends React.Component<IMobile, {}> {

	constructor(props: IMobile) {
		super(props);
	}

	render() {
		const {stage, dispatch}: any = this.props;
		if (stage === 'success') {
			const { transaction }: any = this.props;
			return (
				<MobilePaymentSuccess transaction={transaction} onClick={() => dispatch(payRepeat())}/>
			);
		}
		if (stage === 'error') {
			return (
				<MobilePaymentError onClick={() => dispatch(payRepeat())}/>
			);
		}

		return (
			<MobilePaymentContract onClick={(amount: number, data: string) => dispatch(payMobile(amount, data))}/>
		)
	}
}

const mapStateToProps = (state: any) => {
	return {
		stage: state.pay.stage,
		transaction: state.pay.transaction,
	};
};

export default connect(mapStateToProps)(MobilePayment);
