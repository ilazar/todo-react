import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import itemShape from './itemShape';

const ItemContainer = styled.div`
`;

const Item = ({ item, onStatusChange }) => (
  <ItemContainer>
    <input
      type="checkbox"
      id={item.id}
      value={item.text}
      checked={item.isActive}
      onChange={() => onStatusChange(item.id)}
    />
    <label htmlFor={item.id}>{item.text}</label>
  </ItemContainer>
);

Item.propTypes = {
  item: itemShape.isRequired,
  onStatusChange: PropTypes.func.isRequired
};

export default Item;
