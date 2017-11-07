import * as React from 'react';
import { GoalBar } from './goal';
import styled from 'styled-components';

interface IGoal {

}

const Wallet = styled.div`
	display: flex;
	min-height: 100%;
	background-color: #fcfcfc;
`;


class GoalMain extends React.Component<{}, {}> {
	render() {
		return (
			<Wallet>
			<GoalBar/>
			</Wallet>
		)
	}
}

export default GoalMain;
