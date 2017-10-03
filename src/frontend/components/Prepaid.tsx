import * as React from 'react';
import * as PropTypes from 'prop-types';

import PrepaidContract from './PrepaidContract';
import PrepaidSuccess from './PrepaidSuccess';
import {IMobilePayment} from './index';

interface IPrepaid {
	activeCard: any
	inactiveCardsList: any
	onCardChange: any
}
/**
 * Класс компонента Prepaid
 */
class Prepaid extends React.Component<IPrepaid, IMobilePayment> {
	/**
	 * Конструктор
	 * @param {Object} props свойства компонента Prepaid
	 */
	static propTypes = {
		activeCard: PropTypes.shape({
			id: PropTypes.number,
		}).isRequired,
		inactiveCardsList: PropTypes.arrayOf(PropTypes.object).isRequired
	};

	constructor(props: any) {
		super(props);

		this.state = {stage: 'contract'};
	}

	/**
	 * Обработка успешного платежа
	 * @param {Object} transaction данные о транзакции
	 */
	onPaymentSuccess(transaction: any) {
		this.setState({
			stage: 'success',
			transaction
		});
	}

	/**
	 * Повторить платеж
	 */
	repeatPayment() {
		this.setState({stage: 'contract'});
	}

	/**
	 * Функция отрисовки компонента
	 * @returns {JSX}
	 */
	render() {
		const {transaction}: any = this.state;
		const {activeCard, inactiveCardsList}: any = this.props;

		if (this.state.stage === 'success') {
			return (
				<PrepaidSuccess transaction={transaction} repeatPayment={() => this.repeatPayment()}/>
			);
		}

		return (
			<PrepaidContract
				activeCard={activeCard}
				inactiveCardsList={inactiveCardsList}
				onPaymentSuccess={(transaction: any) => this.onPaymentSuccess(transaction)}/>
		);
	}
}

export default Prepaid;
