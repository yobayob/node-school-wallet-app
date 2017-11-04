import * as React from 'react';
import styled from 'styled-components';
import {UserInfo} from './';
import {Title} from '../shared';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

const HeaderLayout = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 74px;
	background: #fff;
	padding: 20px 30px;
	box-sizing: border-box;
	border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;

const Balance: any = styled(Title)`
	margin: 0;
`;

const BalanceSum = styled.span`
	font-weight: bold;
`;

interface IHeaderProps {
	activeCard: {
		bankName: any,
		balance: any,
	},
}

const Header: React.SFC<IHeaderProps> = ({activeCard}: any) => (
	<HeaderLayout>
		<Balance>
			{`${activeCard ? activeCard.bankName + ':' : ''} `}
			<BalanceSum>{`${activeCard ? activeCard.balance  + ' ₽' : ''}` }</BalanceSum>
		</Balance>
		<UserInfo />
	</HeaderLayout>
);

const mapStateToProps = (state: any) => {
	return {
		activeCard: state.cards.activeCard,
	};
};

export default connect(mapStateToProps)(Header);
