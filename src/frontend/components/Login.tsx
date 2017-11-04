import * as React from 'react';
import styled, {injectGlobal} from 'styled-components';

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
	height: 300px;
`;

const LoginBox = styled.div`
	width: 480px;
    margin: 5px;
    text-align: center;
    margin-bottom: 15px;
	padding: 25px 20px 20px 25px;
	border-radius: 4px;
	background-color: #242424;
`;

class Login extends React.Component<{}, {}> {
	render() {
		return (
			<LoginLayout>
				<LoginBox>
					<h1>Login page</h1>
				</LoginBox>
			</LoginLayout>
		)
	}
}

export default Login;
