import {CardInfo} from 'card-info';

export function prepare(card: any) {
	const cardInfo = new CardInfo(card.cardNumber, {
		banksLogosPath: '/assets/',
		brandsLogosPath: '/assets/',
	});

	return {
		id: card.id,
		balance: card.balance,
		number: cardInfo.numberNice,
		bankName: cardInfo.bankName,
		theme: {
			bgColor: cardInfo.backgroundColor,
			textColor: cardInfo.textColor,
			bankLogoUrl: cardInfo.bankLogoSvg,
			brandLogoUrl: cardInfo.brandLogoSvg,
			bankSmLogoUrl: `/assets/${cardInfo.bankAlias}-history.svg`,
		},
	}
}

export default function prepareCardsData(cardsData: any[]) {
		return cardsData.map((card: any) => prepare(card));
}
