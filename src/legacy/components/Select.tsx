import * as React from 'react';
import styled from 'styled-components';
import ReactSelect from 'react-select';

const StyledSelect: any = styled(ReactSelect)`
	.Select-control {
		border: 1px solid rgba(0, 0, 0, 0.04);
		background-color: rgba(0, 0, 0, 0.2);
		.Select-value-label{
			color: ${({textColor}: any) => textColor || '#fff'} !important;
		}
	}
`;

const Select: any = (props: any) => (
	<StyledSelect {...props} />
);

//Select.Option = ReactSelect.op;

export default Select;
