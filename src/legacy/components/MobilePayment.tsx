import * as React from 'react';
import * as PropTypes from 'prop-types';

import MobilePaymentContract from './MobilePaymentContract';
import MobilePaymentSuccess from './MobilePaymentSuccess';

interface IMobilePayment {
	stage?: string
	activeCard?: any
	transaction?: any
	onTransaction?: any
}

/**
 * Класс компонента MobilePayment
 */
class MobilePayment extends React.Component<IMobilePayment, IMobilePayment> {
	/**
	 * Конструктор
	 * @param {Object} props свойства компонента MobilePayment
	 */
	static propTypes = {
		activeCard: PropTypes.shape({
			id: PropTypes.number,
			theme: PropTypes.object,
		}).isRequired,
	};

	constructor(props: IMobilePayment) {
		super(props);

		this.state = {stage: 'contract'};
	}

	/**
	 * Обработка успешного платежа
	 * @param {Object} transaction данные о транзакции
	 */
	onPaymentSuccess(transaction: any) {
		this.props.onTransaction(transaction);
		this.setState({
			stage: 'success',
			transaction,
		});
	}

	/**
	 * Повторить платеж
	 */
	repeatPayment() {
		this.setState({stage: 'contract'});
	}

	/**
	 * Рендер компонента
	 *
	 * @override
	 * @returns {JSX}
	 */
	render() {
		const {activeCard}: any = this.props;

		if (this.state.stage === 'success') {
			return (
				<MobilePaymentSuccess
					activeCard={activeCard}
					transaction={this.state.transaction}
					repeatPayment={() => this.repeatPayment()}/>
			);
		}

		return (
			<MobilePaymentContract
				activeCard={activeCard}
				onPaymentSuccess={(transaction: any) => this.onPaymentSuccess(transaction)}/>
		);
	}
}
export default MobilePayment;
