import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled, {StyledFunction} from 'styled-components';
import {Title, UserInfo} from './';

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
	activeCard: any,
}

const Header: React.SFC<IHeaderProps> = ({activeCard}: any) => (
	<HeaderLayout>
		<Balance>
			{`${activeCard.bankName}: `}
			<BalanceSum>{`${activeCard.balance} ₽`}</BalanceSum>
		</Balance>
		<UserInfo />
	</HeaderLayout>
);

Header.propTypes = {
	activeCard: PropTypes.shape({
		bankName: PropTypes.string.isRequired,
		balance: PropTypes.string.isRequired
	}),
};

export default Header;
