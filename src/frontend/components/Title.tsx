import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled, {ThemedStyledComponentsModule} from 'styled-components';

const StyledTitle = styled.h2`
	margin: 0 0 20px;
	font-size: 24px;
	font-weight: bold;
	color: #000;
`;

interface ITitleProps {
	children: any,
	className?: any,
}

const Title: React.SFC<ITitleProps> = (props: any) => (
	<StyledTitle className={props.className}>
		{props.children}
	</StyledTitle>
);

Title.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
};

export default Title;
