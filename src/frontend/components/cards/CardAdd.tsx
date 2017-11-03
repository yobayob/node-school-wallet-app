import * as React from 'react';
import styled from 'styled-components'
import {Select, Button, Title, Input} from '../';

const InputField: any = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 26px;
	position: relative;
`;

const Label: any = styled.div`
	font-size: 15px;
	color: #fff;
	position: absolute;
	left: 0;
`;

const InputCardNumber: any = styled(Input)`
	width: 100%;
`;

const Actions = styled.footer`
	color: rgba(255, 255, 255, 0.2);
	font-size: 15px;
	display: flex;
`;

const MobilePaymentTitle: any = styled(Title)`
	color: #fff;
`;

interface ICardProps {
	onSubmit: any,
	onCancel: any,
}

interface ICardAddState {
	cardNumber: string,
	error?: string,
}

class CardAdd extends React.Component<ICardProps, ICardAddState> {

	constructor(props: any) {
		super(props);
		this.state = {
			cardNumber: '',
		}
	}

	handleSubmit(event: any) {
		if (event) {
			event.preventDefault();
		}
		const {onSubmit} = this.props;
		const {cardNumber} = this.state;
		onSubmit(cardNumber);
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

	render() {
		const {onCancel} = this.props;
		return (
			<form onSubmit={(event: any) => this.handleSubmit(event)}>
				<InputField>
					<InputCardNumber
						name='cardNumber'
						onChange={(event: any) => this.onChangeInputValue(event)}
						value={this.state.cardNumber}
						placeholder='Введите номер карты'
					/>
				</InputField>
				<Actions>
					<Button type='button' onClick={onCancel}>Отмена</Button>
					<Button>Ок</Button>
				</Actions>
			</form>
		)
	}
}
export default CardAdd;
