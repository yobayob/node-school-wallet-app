import * as React from 'react';
import styled from 'styled-components';
import * as moment from 'moment/moment';
import {Island} from '../shared';

const HistoryLayout: any = styled(Island)`
	width: 530px;
	max-height: 584px;
	overflow-y: scroll;
	padding: 0;
	background-color: rgba(0, 0, 0, 0.05);
`;

const HistoryTitle: any = styled.div`
	padding-left: 12px;
	color: rgba(0, 0, 0, 0.4);
	font-size: 15px;
	line-height: 30px;
	text-transform: uppercase;
`;

const HistoryItem: any = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	height: 74px;
	font-size: 15px;
	white-space: nowrap;
	&:nth-child(even) {
		background-color: #fff;
	}
	&:nth-child(odd) {
		background-color: rgba(255, 255, 255, 0.72);
	}
`;

const HistoryItemIcon: any = styled.div`
	width: 50px;
	height: 50px;
	border-radius: 25px;
	background-color: #159761;
	background-image: url(${({bankSmLogoUrl}: any) => bankSmLogoUrl});
	background-size: contain;
	background-repeat: no-repeat;
`;

const HistoryItemTitle: any = styled.div`
	width: 290px;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const HistoryItemTime: any = styled.div`
	width: 50px;
`;

const HistoryItemSum: any = styled.div`
	width: 50px;
	overflow: hidden;
	text-overflow: ellipsis;
`;

interface IHistoryProps {
	history: any,
}

class History extends React.Component<IHistoryProps, {}> {

	getHistoryItemTitle = (item: any) => {
		let typeTitle = '';

		switch (item.type) {
			case 'paymentMobile': {
				typeTitle = 'Оплата телефона';
				break;
			}
			case 'prepaidCard': {
				typeTitle = 'Пополнение с карты';
				break;
			}
			case 'withdrawCard': {
				typeTitle = 'Перевод на карту';
				break;
			}
			default: {
				typeTitle = 'Операция';
			}
		}

		return `${typeTitle}: ${item.data}`;
	};

	render() {
		const {history}: any = this.props;
		return(
			<HistoryLayout>
				<HistoryTitle>Сегодня</HistoryTitle>
				{history.map((item: any, index: any) => {
				const historyItemDate = moment(item.time, moment.ISO_8601);
				const today = moment().format('L');
				const isTodayHistoryItem = historyItemDate.format('L') === today;

				if (!isTodayHistoryItem) {
					return '';
				}

				return (
					<HistoryItem key={index}>
						<HistoryItemIcon bankSmLogoUrl={item.card ? item.card.theme.bankSmLogoUrl : ''}/>
						<HistoryItemTitle>
							{this.getHistoryItemTitle(item)}
						</HistoryItemTitle>
						<HistoryItemTime>
							{historyItemDate.format('HH:mm')}
						</HistoryItemTime>
						<HistoryItemSum>
							{`${item.sum} ₽`}
						</HistoryItemSum>
					</HistoryItem>
				);
			})}
			</HistoryLayout>
		)
	}
}

export default History;
