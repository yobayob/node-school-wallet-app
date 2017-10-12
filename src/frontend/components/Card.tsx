import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components'
import {Select} from './';

const CardLayout: any = styled.div`
	position: relative;
	// width: 260px;
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

/**
 * Карта
 */
interface ICard {
	type?: any
	data?: any
	key?: any
	active?: any
	onClick?: any
	isSingle?: any
	isCardsEditable?: any
	onChangeBarMode?: any
}

class Card extends React.Component<ICard, {}> {
	/**
	 * Конструктор
	 *
	 * @param {Object} props свойства компонента
	 */
	static propTypes = {
		data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
		type: PropTypes.string,
		active: PropTypes.bool,
		isSingle: PropTypes.bool,
		isCardsEditable: PropTypes.bool,
		onClick: PropTypes.func,
		onChangeBarMode: PropTypes.func,
	};

	constructor(props: ICard) {
		super(props);

		this.state = {
			activeCardIndex: 0,
		};
	}

	/**
	 * Обработчик переключения карты
	 *
	 * @param {Number} activeCardIndex индекс выбранной карты
	 */
	onCardChange(activeCardIndex: any) {
		this.setState({activeCardIndex});
	}

	/**
	 * Рендер компонента
	 *
	 * @override
	 * @returns {JSX}
	 */
	render() {
		const {data, type, active, isSingle, onClick, isCardsEditable, onChangeBarMode}: any = this.props;

		if (type === 'new') {
			return (
				<NewCardLayout />
			);
		}

		if (type === 'select') {
			const {activeCardIndex}: any = this.state;
			const selectedCard = data[activeCardIndex];
			const {bgColor, bankLogoUrl, brandLogoUrl}: any = selectedCard.theme;
			return (
				<CardLayout active={true} bgColor={bgColor}>
					<CardLogo url={bankLogoUrl} active={true} />
					<CardSelect defaultValue='0' onChange={(activeCardIndex: any) => this.onCardChange(activeCardIndex)}>
						{data.map((card: any, index: any) => (
							<Select.Option key={index} value={`${index}`}>{card.number}</Select.Option>
						))}
					</CardSelect>
					<CardType url={brandLogoUrl} active={true} />
				</CardLayout>
			);
		}

		const {number, theme} = data;
		const {bgColor, textColor, bankLogoUrl, brandLogoUrl} = theme;
		const themedBrandLogoUrl = active ? brandLogoUrl : brandLogoUrl.replace(/-colored.svg$/, '-white.svg');
		return (
			<CardLayout active={active} bgColor={bgColor} onClick={onClick} >
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
