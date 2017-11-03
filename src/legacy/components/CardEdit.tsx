import * as React from 'react';
import * as PropTypes from 'prop-types';
import styled from 'styled-components';

const CardEditIcon: any = styled.div`
	width: 24px;
	height: 24px;
	position: absolute;
	top: -12px;
	right: -12px;
	background-image: url('/assets/cards-delete.svg');
	cursor: pointer;
	display: ${({editable}: any) => (editable ? 'block' : 'none')};
`;

interface ICardEdit {
	editable?: boolean
	onChangeBarMode?: any
	id?: number
}

const CardEdit: React.SFC<ICardEdit> = ({editable, onChangeBarMode, id}: any) => (
	<CardEditIcon editable={editable} onClick={(event: any) => onChangeBarMode(event, id)} />
);

CardEdit.propTypes = {
	editable: PropTypes.bool,
	onChangeBarMode: PropTypes.func,
	id: PropTypes.number,
};

export default CardEdit;
