import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled, {ThemedStyledComponentsModule} from 'styled-components';
import {ButtonHTMLAttributes} from 'react';

interface IButtonProps extends React.HTMLProps<HTMLButtonElement>  {
	bgColor?: any
	textColor?: any
	children?: any
	className?: any
}

const StyledButton: any = styled.button`
	height: 36px;
	width: 120px;
	font-size: 13px;
	font-weight: 600;
	border: none;
	border-radius: 3px;
	cursor: pointer;
	background-color: ${({bgColor}: any) => bgColor || 'rgba(0, 0, 0, 0.05)'};
	color: ${({textColor}: any) => textColor || 'rgba(0, 0, 0, 0.65)'};
	&:focus,
	&:hover {
		color: ${({textColor}: any) => textColor || 'rgba(0, 0, 0, 0.65)'};
		background-color: ${({bgColor}: any) => bgColor || 'rgba(0, 0, 0, 0.05)'};
	}
`;

const Button: React.SFC<IButtonProps> = (props: IButtonProps) => (
	<StyledButton bgColor={props.bgColor} textColor={props.textColor} className={props.className} {...props}>
		{props.children}
	</StyledButton>
);

Button.propTypes = {
	bgColor: PropTypes.string,
	textColor: PropTypes.string,
	children: PropTypes.node,
	className: PropTypes.string
};

export default Button;
