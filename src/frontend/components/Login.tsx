import * as React from 'react';
import styled, {injectGlobal} from 'styled-components';
import { Title, Island, Input, Button } from './shared'
import { connect } from 'react-redux';
import { login, signUp, updateUserInfo } from '../actions';
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

const InputField: any = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 26px;
	position: relative;
	padding-left: 150px;
`;

const Label: any = styled.div`
	font-size: 15px;
	position: absolute;
	left: 0;
`;

const LoginInput: any = styled(Input)`
	max-width: 200px;
	padding-right: 20px;
	background-color: rgba(0, 0, 0, 0.08);
	color: #000;
`;

const SignUpButton: any = styled(Button)`
	float: center;
`;

interface ILoginProps {
	stage: 'signin' | 'signup' | 'success';

	dispatch: Dispatch<{}>;
}

const GITHUB = 'github';
const YANDEX = 'yandex';

interface ILoginState {
	first_name: string,
	last_name: string,
	phone: string,
}

class Login extends React.Component<ILoginProps, ILoginState> {

	constructor(props: ILoginProps) {
		super(props);
		this.state = {
			first_name: '',
			last_name: '',
			phone: '',
		};
	}

	onChangeInputValue(event: any) {
		if (!event) {
			return;
		}

		const {name, value}: any = event.target;

		this.setState({
			[name]: value,
		});
	}

	onSubmitForm(event: any) {
		if (event) {
			event.preventDefault();
		}
		const {dispatch}: any = this.props;
		const {first_name, last_name, phone}: any = this.state;
		dispatch(updateUserInfo(first_name, last_name, phone));
	}

	render() {
		const {dispatch, stage}: any = this.props;
		if (stage === 'signup') {
			return (
				<LoginLayout>
				<LoginBox>
					<LoginTitle>Авторизация</LoginTitle>
						<form onSubmit={(event: any) => this.onSubmitForm(event)}>
						<InputField>
							<Label>Имя</Label>
							<LoginInput
								name='first_name'
								value={this.state.first_name}
								onChange={(event: any) => this.onChangeInputValue(event)}
							/>
						</InputField>
						<InputField>
							<Label>Фамилия</Label>
							<LoginInput
								name='last_name'
								value={this.state.last_name}
								onChange={(event: any) => this.onChangeInputValue(event)}
							/>
						</InputField>
						<InputField>
							<Label>Телефон</Label>
							<LoginInput
								name='phone'
								value={this.state.phone}
								onChange={(event: any) => this.onChangeInputValue(event)}
							/>
						</InputField>
						<SignUpButton>Войти</SignUpButton>
						</form>
				</LoginBox>
			</LoginLayout>
			)
		}
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
const mapStateToProps = (state: any) => ({
	stage: state.auth.stage,
});

export default connect(mapStateToProps)(Login);
