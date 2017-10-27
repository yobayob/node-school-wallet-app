import * as React from 'react';
import * as PropTypes from 'prop-types';
import {CardAction} from '../agent'
import styled from 'styled-components';

import {Card, Title, Button, Island, Input} from './';

const WithdrawTitle: any = styled(Title)`
	text-align: center;
`;

const WithdrawLayout: any = styled(Island)`
	width: 440px;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const InputField: any = styled.div`
	margin: 20px 0;
	position: relative;
`;

const SumInput: any = styled(Input)`
	max-width: 200px;
	padding-right: 20px;
	background-color: rgba(0, 0, 0, 0.08);
	color: '#000';
`;

const Currency: any = styled.span`
	font-size: 12px;
	position: absolute;
	right: 10;
	top: 8px;
`;

interface IWithdraw {
	activeCard?: any
	inactiveCardsList?: any
}

interface IState {
	selectedCard?: any
	sum?: any
}

/**
 * Класс компонента Withdraw
 */
class Withdraw extends React.Component<IWithdraw, IState> {
	/**
	 * Конструктор
	 * @param {Object} props свойства компонента Withdraw
	 */
	static propTypes = {
		activeCard: PropTypes.shape({
			id: PropTypes.number,
			theme: PropTypes.object,
		}).isRequired,
		inactiveCardsList: PropTypes.arrayOf(PropTypes.object).isRequired,
	};

	constructor(props: IWithdraw) {
		super(props);

		this.state = {
			selectedCard: props.inactiveCardsList[0],
			sum: 0,
		};
	}

	/**
	 * Обработка изменения значения в input
	 * @param {Event} event событие изменения значения input
	 */
	onChangeInputValue(event: any) {
		if (!event) {
			return;
		}

		const {name, value}: any = event.target;

		this.setState({
			[name]: value,
		});
	}

	/**
	 * Отправка формы
	 * @param {Event} event событие отправки формы
	 */
	onSubmitForm(event: any) {
		if (event) {
			event.preventDefault();
		}

		const {sum, selectedCard}: any = this.state;

		const isNumber = !isNaN(parseFloat(sum)) && isFinite(sum);
		if (!isNumber || sum <= 0) {
			return;
		}

		CardAction.transfer(this.props.activeCard.id, {
			amount: parseFloat(sum),
			cardId: selectedCard.id,
		}).then(
			() => this.setState({sum: 0}),
			(err) => console.log(err),
		);
	}

	/**
	 * Функция отрисовки компонента
	 * @returns {JSX}
	 */
	render() {
		const {inactiveCardsList}: any = this.props;

		return (
			<form onSubmit={(event: any) => this.onSubmitForm(event)}>
				<WithdrawLayout>
					<WithdrawTitle>Вывести деньги на карту</WithdrawTitle>
					<Card type='select' data={inactiveCardsList}/>
					<InputField>
						<SumInput
							name='sum'
							value={this.state.sum}
							onChange={(event: any) => this.onChangeInputValue(event)}/>
						<Currency>₽</Currency>
					</InputField>
					<Button type='submit'>Перевести</Button>
				</WithdrawLayout>
			</form>
		);
	}
}

export default Withdraw;
