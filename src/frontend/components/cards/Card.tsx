import * as React from 'react';
import styled from 'styled-components'
import {Select, Button, Title, Input} from '../';
import {CardAdd} from './'

const CardLayout: any = styled.div`
	position: relative;
	width: 280px;
	height: 164px;
	min-width: 250px;
	box-sizing: border-box;
	margin-bottom: 15px;
	padding: 25px 20px 20px 25px;
	border-radius: 4px;
	background-color: ${({bgColor, active}: any) => active ? bgColor : 'rgba(255, 255, 255, 0.1)'};
`;

const CardLogo: any = styled.div`
	height: 28px;
	margin-bottom: 25px;
	background-image: url(${({url}: any) => url});
	background-size: contain;
	background-repeat: no-repeat;
	filter: ${({active}: any) => active ? 'none' : 'grayscale(100%) opacity(60%)'};
`;

const CardNumber: any = styled.div`
	margin-bottom: 20px;
	color: ${({active, textColor}: any) => active ? textColor : 'rgba(255, 255, 255, 0.6)'};
	font-size: 16px;
	font-family: 'OCR A Std Regular';
`;

const CardType: any = styled.div`
	height: 26px;
	background-image: url(${({url}: any) => url});
	background-size: contain;
	background-repeat: no-repeat;
	background-position-x: right;
	opacity: ${({active}: any) => active ? '1' : '0.6'};
`;

const NewCardLayout: any = styled(CardLayout)`
	background-color: transparent;
	background-image: url('/assets/cards-add.svg');
	background-repeat: no-repeat;
	background-position: center;
	box-sizing: border-box;
	border: 2px dashed rgba(255, 255, 255, 0.2);
`;

const CardSelect: any = styled(Select)`
	width: 100%;
	margin-bottom: 15px;
`;

interface ICardProps {
	data?: any
	active?: boolean
	onClick?: any
	type?: 'new'|'form'|'select'
	onCancel?: any,
}

interface ICardState {
	activeCardIndex: number
}

class Card extends React.Component<ICardProps, ICardState> {

	constructor(props: ICardProps) {
		super(props);

		this.state = {
			activeCardIndex: 0,
		};
	}
	onCardChange(activeCardIndex: any) {
		this.setState({activeCardIndex});
	}

	render() {
		const { type, data, onClick}: any = this.props;

		if (type === 'select') {
			const {activeCardIndex}: any = this.state;
			const selectedCard = data[activeCardIndex];
			const {bgColor, textColor, bankLogoUrl, brandLogoUrl}: any = selectedCard.theme;
			const isActive = true;
			return (
				<CardLayout active={true} bgColor={bgColor}>
					<CardLogo url={bankLogoUrl} active={true} />
					<CardSelect
						textColor={textColor}
						clearable={false}
						clearableValue={false}
						onChange={(obj: any) => this.onCardChange(obj.value)}
						value={activeCardIndex}
						options={data.map((card: any, index: any) => ({value: index, label: card.number}))}
					/>
					<CardType url={brandLogoUrl} active={isActive} />
				</CardLayout>
			);
		}

		if (type === 'new') {
			return (
				<NewCardLayout onClick={onClick}/>
			)
		}

		if (type === 'form') {
			const { onCancel, onClick}: any = this.props;
			return (
				<CardLayout bgColor='#ffe52b' active={true}>
					<CardAdd onCancel={onCancel} onSubmit={onClick}/>
				</CardLayout>
			)
		}

		// default card

		const {active}: any = this.props;
		const {number, theme, id}: any = data;
		const {bgColor, textColor, bankLogoUrl, brandLogoUrl} = theme;
		const themedBrandLogoUrl = brandLogoUrl.replace(/-colored.svg$/, '-white.svg');

		return (
			<CardLayout
				active={active}
				onClick={onClick}
				textColor={textColor}
				bgColor={bgColor}
			>
				<CardLogo url={bankLogoUrl} active={active} />
				<CardNumber textColor={textColor} active={active}>
					{number}
				</CardNumber>
				<CardType url={themedBrandLogoUrl} active={active} />
			</CardLayout>
		);
	}
}

export default Card;
