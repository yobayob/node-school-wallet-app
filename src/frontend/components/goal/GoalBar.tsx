import * as React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router';

const Layout = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	background-color: #242424;
	padding: 20px;
`;

const Logo = styled.div`
	width: 147px;
	height: 28px;
	margin-bottom: 55px;
	background-image: url('/assets/yamoney-logo.svg');
`;

const Edit = styled.div`
	position: absolute;
	top: 25px;
	right: 20px;
	width: 18px;
	height: 18px;
	background-image: url('/assets/cards-edit.svg');
`;

const CardsList = styled.div`
	flex: 1;
`;

class GoalBar extends React.Component<{}, {}> {
	render() {
		return (
			<Layout>
				<Link to='/'>
						<Logo />
					</Link>
			</Layout>
		)
	}
}

export default GoalBar;
