import * as React from 'react';
import { MobilePaymentContract, MobilePaymentSuccess } from './'

interface IMobile {
	stage: string
}

class MobilePayment extends React.Component<IMobile, {}> {

	constructor(props: IMobile) {
		super(props);
	}

	render() {
		const {stage}: any = this.props;
		if (stage === 'success') {
			return (
				<MobilePaymentSuccess/>
			);
		}

		return (
			<MobilePaymentContract/>
		)
	}
}

export default MobilePayment;
