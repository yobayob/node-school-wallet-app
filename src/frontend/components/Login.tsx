import * as React from 'react';
import styled, {injectGlobal} from 'styled-components';
import { Title, Island } from './shared'
import { connect } from 'react-redux';
import { login } from '../actions';
import { Dispatch } from 'redux';

injectGlobal`
	html,
	body {
		margin: 0;
	}
	#root {
		height: 100%;
		font-family: 'Open Sans';
		color: #000;
	}
`;

const LoginLayout = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 600px;
`;

const LoginBox = styled(Island)`
	width: 480px;
    text-align: center;
    margin-bottom: 15px;
`;

const LoginTitle: any = styled(Title)`
	text-align: center;
`;

const SocialLayout = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
`;

const SocialType: any = styled.div`
	height: 26px;
	width: 26px;
	margin: 5px 15px;
	background-image: url(${({url}: any) => url});
	background-size: contain;
	background-repeat: no-repeat;
	opacity: 0.6;
	&:hover{
		opacity: 1;
	}
`;

interface ILoginProps {
	dispatch: Dispatch<{}>;
}

const GITHUB = 'github';
const YANDEX = 'yandex';

class Login extends React.Component<ILoginProps, {}> {
	render() {
		const {dispatch}: any = this.props;
		return (
			<LoginLayout>
				<LoginBox>
					<LoginTitle>Авторизация</LoginTitle>
					<SocialLayout>
						<SocialType
							onClick={() => dispatch(login(GITHUB))}
							url='/assets/social-github.svg'
						/>
						<SocialType
							url='/assets/social-yandex.svg'
							onClick={() => dispatch(login(YANDEX))}
						/>
					</SocialLayout>
				</LoginBox>
			</LoginLayout>
		)
	}
}
const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps)(Login);
