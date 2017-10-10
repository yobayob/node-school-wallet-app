import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled, {StyledFunction} from 'styled-components';
import {CardAction} from '../agent'
import {Island, Title, Button, Input} from './';

const MobilePaymentLayout: any = styled(Island)`
	width: 440px;
	background: #108051;
`;

const MobilePaymentTitle: any = styled(Title)`
	color: #fff;
`;

const InputField: any = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 26px;
	position: relative;
	padding-left: 150px;
`;

const Label: any = styled.div`
	font-size: 15px;
	color: #fff;
	position: absolute;
	left: 0;
`;

const Currency: any = styled.span`
	font-size: 13px;
	color: #fff;
	margin-left: 12px;
`;

const Commission: any = styled.div`
	color: rgba(255, 255, 255, 0.6);
	font-size: 13px;
	text-align: right;
	margin: 35px 0 20px;
`;

const Underline: any = styled.div`
	height: 1px;
	margin-bottom: 20px;
	background-color: rgba(0, 0, 0, 0.16);
`;

const PaymentButton: any = styled(Button)`
	float: right;
`;

const InputPhoneNumber: any = styled(Input)`
	width: 225px;
`;

const InputSum: any = styled(Input)`
	width: 160px;
`;

const InputCommision: any = styled(Input)`
	cursor: no-drop;
	width: 160px;
	border: dotted 1.5px rgba(0, 0, 0, 0.2);
	background-color: initial;
`;

interface IMobilePaymentContract {
	activeCard: any
	onPaymentSuccess: any
}

interface IIMobilePaymentContractState {
	sum: any
	phoneNumber: any
	commission: any
}

/**
 * Компонент MobilePaymentContract
 */
class MobilePaymentContract extends React.Component<IMobilePaymentContract, IIMobilePaymentContractState> {
	/**
	 * Конструктор
	 * @param {Object} props свойства компонента MobilePaymentContract
	 */
	static propTypes = {
		activeCard: PropTypes.shape({
			id: PropTypes.number,
			theme: PropTypes.object,
		}).isRequired,
		onPaymentSuccess: PropTypes.func.isRequired,
	};

	constructor(props: IMobilePaymentContract) {
		super(props);

		this.state = {
			phoneNumber: '+79218908064',
			sum: 0,
			commission: 3,
		};
	}

	/**
	 * Получить цену с учетом комиссии
	 * @returns {Number}
	 */
	getSumWithCommission() {
		const {sum, commission}: any = this.state;

		const isNumber: boolean = !isNaN(parseFloat(sum)) && isFinite(sum);
		if (!isNumber || sum <= 0) {
			return 0;
		}

		return Number(sum) + Number(commission);
	}

	/**
	 * Отправка формы
	 * @param {Event} event событие отправки формы
	 */
	handleSubmit(event: any) {
		if (event) {
			event.preventDefault();
		}

		const {sum, phoneNumber, commission}: any = this.state;

		const isNumber = !isNaN(parseFloat(sum)) && isFinite(sum);
		if (!isNumber || sum === 0) {
			return;
		}
		CardAction.pay(this.props.activeCard.id, {
			amount: parseInt(sum, 10),
			data: phoneNumber,
		}).then(
			() => this.props.onPaymentSuccess({sum, phoneNumber, commission}),
			(err) => console.log(err),
		)
	}

	/**
	 * Обработка изменения значения в input
	 * @param {Event} event событие изменения значения input
	 */
	handleInputChange(event: any) {
		if (!event) {
			return;
		}

		const {name, value} = event.target;

		this.setState({
			[name]: value
		});
	}

	/**
	 * Рендер компонента
	 *
	 * @override
	 * @returns {JSX}
	 */
	render() {
		const {commission}: any = this.state;

		return (
			<MobilePaymentLayout>
				<form onSubmit={(event: any) => this.handleSubmit(event)}>
					<MobilePaymentTitle>Пополнить телефон</MobilePaymentTitle>
					<InputField>
						<Label>Телефон</Label>
						<InputPhoneNumber
							name='phoneNumber'
							value={this.state.phoneNumber}
							readOnly='true' />
					</InputField>
					<InputField>
						<Label>Сумма</Label>
						<InputSum
							name='sum'
							value={this.state.sum}
							onChange={(event: any) => this.handleInputChange(event)} />
						<Currency>₽</Currency>
					</InputField>
					<InputField>
						<Label>Спишется</Label>
						<InputCommision value={this.getSumWithCommission()} />
						<Currency>₽</Currency>
					</InputField>
					<Commission>Размер коммиссии составляет {commission} ₽</Commission>
					<Underline />
					<PaymentButton bgColor='#fff' textColor='#108051'>Заплатить</PaymentButton>
				</form>
			</MobilePaymentLayout>
		);
	}
}

export default MobilePaymentContract;
