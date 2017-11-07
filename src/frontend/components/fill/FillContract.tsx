import * as React from 'react';
import styled from 'styled-components';
import {Island, Title, Button, Input} from '../shared';

const FillLayout: any = styled(Island)`
	width: 440px;
	background: #108051;
`;

const FillTitle: any = styled(Title)`
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

const FillButton: any = styled(Button)`
	float: right;
`;

const InputSum: any = styled(Input)`
	width: 160px;
`;


interface IFillState {
	sum: number,
	commission: number,
}

interface IFillProps {
	onClick?: any
}

class FillContract extends React.Component<IFillProps, IFillState> {

	constructor(props: any) {
		super(props);

		this.state = {
			sum: 0,
			commission: 3,
		};
	}

	handleSubmit(event: any) {
		if (event) {
			event.preventDefault();
		}

		const {sum, commission}: any = this.state;
		const {activeCard, onClick}: any = this.props;

		const isNumber = !isNaN(parseFloat(sum)) && isFinite(sum);
		if (!isNumber || sum === 0) {
			return;
		}
		onClick(Number(sum));
	};

	handleInputChange(event: any) {
		if (!event) {
			return;
		}

		const {name, value} = event.target;
		this.setState({
			[name]: value,
		});
	};

	render() {
		const {commission}: any = this.state;

		return (
			<FillLayout>
				<form onSubmit={(event: any) => this.handleSubmit(event)}>
					<FillTitle>Пополнить карту</FillTitle>
					<InputField>
						<Label>Сумма</Label>
						<InputSum
							name='sum'
							value={this.state.sum}
							onChange={(event: any) => this.handleInputChange(event)}
						/>
						<Currency>₽</Currency>
					</InputField>
					<Underline />
					<FillButton bgColor='#fff' textColor='#108051'>Заплатить</FillButton>
				</form>
			</FillLayout>
	)}
}

export default FillContract;
