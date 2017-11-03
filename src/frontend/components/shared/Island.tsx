import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';

const IslandLayout = styled.div`
	margin: 15px;
	padding: 30px 30px 20px;
	border-radius: 4px;
	background: #fff;
	box-shadow: 0px 2px 12px 0px rgba(0, 0, 0, 0.05);
`;

interface IIslandProps {
	children: any
	className?: any
}

const Island: React.SFC<IIslandProps> = ({children, className}: any) => (
	<IslandLayout className={className}>
		{children}
	</IslandLayout>
);

Island.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string
};

export default Island;
