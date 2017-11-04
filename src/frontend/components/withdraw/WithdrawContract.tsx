import * as React from 'react';
import styled from 'styled-components';
import {Card} from '../cards';
import {Title, Button, Island, Input} from '../';

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

interface IWithdrawContractState {
	sum: number,
	selectedCard: any,
}

interface IWithdrawContractProps {
	cards: any,
	activeCard: any,
	onSubmit: any,
}

class WithdrawContract extends React.Component<IWithdrawContractProps, IWithdrawContractState> {

	constructor(props: IWithdrawContractProps) {
		super(props);

		this.state = {
			selectedCard: props.cards[0],
			sum: 0,
		};
	}


	onChangeInputValue(event: any) {
		if (!event) {
			return;
		}

		const {name, value}: any = event.target;

		this.setState({
			[name]: value,
		});
	}

	onSubmitForm(event: any) {
		if (event) {
			event.preventDefault();
		}
		const {onSubmit}: any = this.props;
		const {sum, selectedCard}: any = this.state;

		const isNumber = !isNaN(parseFloat(sum)) && isFinite(sum);
		if (!isNumber || sum <= 0) {
			return;
		}
		onSubmit(selectedCard.id, Number(sum))
	}

	render() {
		const {cards}: any = this.props;

		return (
			<form onSubmit={(event: any) => this.onSubmitForm(event)}>
				<WithdrawLayout>
					<WithdrawTitle>Вывести деньги на карту</WithdrawTitle>
					<Card type='select' data={cards}/>
					<InputField>
						<SumInput
							name='sum'
							value={this.state.sum}
							onChange={(event: any) => this.onChangeInputValue(event)}
						/>
						<Currency>₽</Currency>
					</InputField>
					<Button type='submit'>Перевести</Button>
				</WithdrawLayout>
			</form>
		);
	}
}

export default WithdrawContract;
