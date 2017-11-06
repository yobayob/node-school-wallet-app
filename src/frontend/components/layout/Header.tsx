import * as React from 'react';
import styled from 'styled-components';
import {Title} from '../shared';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import {signOut} from '../../actions';

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

const User = styled.div`
	display: flex;
	align-items: center;
	font-size: 15px;
	color: #000;
`;

const Avatar = styled.img`
	width: 42px;
	height: 42px;
	border-radius: 50%;
	margin-right: 10px;
`;

const Exit = styled.div`
	height: 26px;
	width: 26px;
	margin: 5px 15px;
	background-image: url('/assets/sign-out.svg');
	background-size: contain;
	background-repeat: no-repeat;
	opacity: 0.6;
	&:hover{
		opacity: 1;
	}
`;

interface IHeaderProps {
	activeCard: {
		bankName: any,
		balance: any,
	},
	user: {
		first_name: string,
		last_name: string,
	} | null,
	dispatch: Dispatch<{}>,
}

const Header: React.SFC<IHeaderProps> = ({activeCard, user, dispatch}: any) => {
	return (
	<HeaderLayout>
		<Balance>
			{`${activeCard ? activeCard.bankName + ':' : ''} `}
			<BalanceSum>{`${activeCard ? activeCard.balance  + ' ₽' : ''}` }</BalanceSum>
		</Balance>
		{user && <User>
			<Avatar src='/assets/avatar.png' />
			{user.first_name} {user.last_name}
			<Exit onClick={() => dispatch(signOut())}/>
		</User>
		}
	</HeaderLayout>
)};

const mapStateToProps = (state: any) => {
	return {
		activeCard: state.cards.activeCard,
		user: state.auth.user,
	};
};

export default connect(mapStateToProps)(Header);
