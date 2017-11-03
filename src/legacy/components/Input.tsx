import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled, {StyledFunction} from 'styled-components';

const StyledInput: any  = styled.input`
	display: inline-block;
	position: relative;
	height: 36px;
	padding: 4px 7px;
	border: 1px solid rgba(0, 0, 0, 0.04);
	border-radius: 3px;
	background-color: rgba(0, 0, 0, 0.2);
	font-size: 15px;
	line-height: 1.5;
	color: ${({textColor}: any) => textColor || '#fff'};
`;

interface IInput extends React.HTMLProps<HTMLInputElement> {
	textColor?: any
	className?: any
}

const Input: React.SFC<IInput> = (props: IInput) => (
	<StyledInput textColor={props.textColor} className={props.className} {...props} />
);

Input.propTypes = {
	textColor: PropTypes.string,
	className: PropTypes.string,
};

export default Input;
