import * as React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router';
import {Island, Title} from './';
import {Header} from './layout';

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
`;

const StartLayout = styled.div`
	display: -webkit-inline-flex;
	display: inline-flex;
	justify-content: center;
    position: fixed;
    flex-direction: row !important;
    align-items: center;
    width: 100%;
    height: 100%;
`;

const InstanceLayout = styled.div`
	min-height: 200px;
	align-items: center;
`;

const InstanceTitle: any = styled(Title)`
	text-align: center;
	opacity: 0.8;
	&:hover{
		opacity: 1;
	}
`;

const InstanceBox = styled(Island)`
	width: 480px;
    text-align: center;
    margin-bottom: 15px;
`;

const InstanceIcon: any = styled.div`
	height: 50px;
	width: 50px;
	margin: 5px 15px;
	background-image: url(${({url}: any) => url});
	background-size: contain;
	background-repeat: no-repeat;
	opacity: 0.6;
	&:hover{
		opacity: 1;
	}
`;

const IconLayout = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

class StartPage extends React.Component<any, any> {
	render() {
		return (
			<Wrapper>
			<Header/>
			<StartLayout>
				<Link to='/pay'>
					<InstanceLayout>
						<InstanceBox>
							<InstanceTitle>
								Покупки
							</InstanceTitle>
							<IconLayout>
								<InstanceIcon url='/assets/cart.svg'/>
							</IconLayout>
						</InstanceBox>
					</InstanceLayout>
				</Link>
				<Link to='/card'>
					<InstanceLayout>
						<InstanceBox>
							<InstanceTitle>
								Управление картами
							</InstanceTitle>
							<IconLayout>
								<InstanceIcon url='/assets/credit-card.svg'/>
							</IconLayout>
						</InstanceBox>
					</InstanceLayout>
				</Link>
				<Link to='/goals'>
					<InstanceLayout>
						<InstanceBox>
							<InstanceTitle>
								Копилка
							</InstanceTitle>
							<IconLayout>
								<InstanceIcon url='/assets/piggy-bank.svg'/>
							</IconLayout>
						</InstanceBox>
					</InstanceLayout>
				</Link>
			</StartLayout>
			</Wrapper>
		)
	}
}

export default StartPage;
