import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';
import {Island, Title, Button, Input, IMobilePayment} from './';
import {CardAction} from '../agent'

const PrepaidLayout: any = styled(Island)`
	width: 350px;
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: #353536;
`;

const PrepaidTitle: any = styled(Title)`
	color: #fff;
`;

const PrepaidItems: any = styled.div`
	width: 285px;
	margin-bottom: 40px;
`;

const PrepaidItem: any = styled.div`
	height: 65px;
	display: flex;
	align-items: center;
	border-radius: 3px;
	cursor: pointer;
	background-color: ${({selected, bgColor}: any) => selected ? bgColor : 'rgba(0, 0, 0, 0.05)'};
`;

const PrepaidItemIcon: any = styled.div`
	width: 42px;
	height: 42px;
	margin: 18px;
	border-radius: 21px;
	background-image: url(${({bankSmLogoUrl}: any) => bankSmLogoUrl});
	background-size: contain;
	background-repeat: no-repeat;
	filter: ${({selected}: any) => selected ? 'none' : 'grayscale(100%)'};
`;

const PrepaidItemTitle: any = styled.div`
	font-size: 13px;
	color: ${({selected, textColor}: any) => selected ? textColor : 'rgba(255, 255, 255, 0.6)'};
`;

const PrepaidItemDescription: any = styled.div`
	color: ${({selected, textColor}: any) => selected ? textColor : 'rgba(255, 255, 255, 0.4)'};
`;

const InputField: any = styled.div`
	margin: 20px 0;
	position: relative;
`;

const SumInput: any = styled(Input)`
	max-width: 200px;
	padding-right: 20px;
	background-color: rgba(0, 0, 0, 0.08);
	color: #fff;
`;

const Currency: any = styled.span`
	font-size: 12px;
	position: absolute;
	right: 10;
	top: 8px;
	color: #fff;
`;

/**
 * Класс компонента PrepaidContract
 */
class PrepaidContract extends React.Component<IMobilePayment, IMobilePayment> {
	/**
	 * Конструктор
	 * @param {Object} props свойства компонента PrepaidContract
	 */
	static propTypes = {
		activeCard: PropTypes.shape({
			id: PropTypes.number,
			theme: PropTypes.object,
		}).isRequired,
		inactiveCardsList: PropTypes.arrayOf(PropTypes.object).isRequired,
		onPaymentSuccess: PropTypes.func.isRequired,
	};

	constructor(props: any) {
		super(props);

		this.state = {
			activeCardIndex: 0,
			sum: 0
		};
	}

	/**
	 * Изменения активной карты
	 * @param {Number} activeCardIndex индекс активной карты
	 */
	onCardChange(activeCardIndex: any) {
		this.setState({activeCardIndex});
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

		const {sum}: any = this.state;
		const {activeCard}: any = this.props;

		const isNumber = !isNaN(parseFloat(sum)) && isFinite(sum);
		if (!isNumber || sum <= 0) {
			return;
		}

		CardAction.transfer(this.props.activeCard.id, {amount: sum, data: 'lalalala', cardId: }).then(
			() => this.props.onPaymentSuccess({
					sum,
					number: activeCard.number,
				}),
			(err) => console.log(err),
		)
	}

	/**
	 *
	 * @returns {XML}
	 */
	render() {
		const {inactiveCardsList}: any = this.props;

		const {activeCardIndex}: any = this.state;
		const selectedCard = inactiveCardsList[activeCardIndex];

		return (
			<form onSubmit={(event) => this.onSubmitForm(event)}>
				<PrepaidLayout>
					<PrepaidTitle>Пополнить карту</PrepaidTitle>

					<PrepaidItems>
						{
							inactiveCardsList.map((card: any, index: any) => (
								<PrepaidItem
									bgColor={card.theme.bgColor}
									key={card.id}
									onClick={() => this.onCardChange(index)}
									selected={activeCardIndex === index}>
									<PrepaidItemIcon
										bankSmLogoUrl={card.theme.bankSmLogoUrl}
										selected={activeCardIndex === index}/>
									<PrepaidItemTitle
										textColor={card.theme.textColor}
										selected={activeCardIndex === index}>
										C банковской карты
										<PrepaidItemDescription
											textColor={card.theme.textColor}
											selected={activeCardIndex === index}>
											{card.number}
										</PrepaidItemDescription>
									</PrepaidItemTitle>
								</PrepaidItem>
							))
						}
					</PrepaidItems>

					<InputField>
						<SumInput
							name='sum'
							value={this.state.sum}
							onChange={(event: any) => this.onChangeInputValue(event)}/>
						<Currency>₽</Currency>
					</InputField>
					<Button
						type='submit'
						bgColor={selectedCard.theme.bgColor}
						textColor={selectedCard.theme.textColor}>
						Пополнить
					</Button>
				</PrepaidLayout>
			</form>
		);
	}
}
export default PrepaidContract;
