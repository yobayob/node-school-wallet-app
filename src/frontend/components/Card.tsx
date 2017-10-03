import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components'
import {Select} from './';
import {any} from 'prop-types';

const CardLayout = styled.div`
	position: relative;
	width: 260px;
	height: 164px;
	box-sizing: border-box;
	margin-bottom: 15px;
	padding: 25px 20px 20px 25px;
	border-radius: 4px;
	background-color: ${({bgColor, active}: any) => active ? bgColor : 'rgba(255, 255, 255, 0.1)'};
`;

const CardLogo = styled.div`
	height: 28px;
	margin-bottom: 25px;
	background-image: url(${({url}:any) => url});
	background-size: contain;
	background-repeat: no-repeat;
	filter: ${({active}: any) => active ? 'none' : 'grayscale(100%) opacity(60%)'};
`;

const CardNumber = styled.div`
	margin-bottom: 20px;
	color: ${({active, textColor}: any) => active ? textColor : 'rgba(255, 255, 255, 0.6)'};
	font-size: 16px;
	font-family: 'OCR A Std Regular';
`;

const CardType = styled.div`
	height: 26px;
	background-image: url(${({url}: any) => url});
	background-size: contain;
	background-repeat: no-repeat;
	background-position-x: right;
	opacity: ${({active}: any) => active ? '1' : '0.6'};
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
		onClick: PropTypes.func,
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
		const {data, type, active, onClick}: any = this.props;

		if (type === 'new') {
			return(
				<p>1</p>
			);
		}

		if (type === 'select') {
			const {activeCardIndex}: any = this.state;
			const selectedCard = data[activeCardIndex];
			const {bgColor, bankLogoUrl, brandLogoUrl}: any = selectedCard.theme;
			return (
				<p>1</p>
			);
		}

		const {number, theme} = data;
		const {bgColor, textColor, bankLogoUrl, brandLogoUrl} = theme;
		const themedBrandLogoUrl = active ? brandLogoUrl : brandLogoUrl.replace(/-colored.svg$/, '-white.svg');

		return(
			<p>2</p>
		);
	}
}

export default Card;
