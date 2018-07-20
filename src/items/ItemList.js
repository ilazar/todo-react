import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { ErrorDetail, InputText, Loading } from '../core';
import Item from './Item';
import { fetchItems, createItem, updateItem } from './itemService';

const ItemListContainer = styled.div`
  text-align: center;
`;

class ItemList extends Component {
  static propTypes = {
    store: PropTypes.shape({
      dispatch: PropTypes.func.isRequired,
      subscribe: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired,
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = { error: null, items: null };
  }

  componentDidMount() {
    console.log('ItemList componentDidMount');
    const { store } = this.props;
    this.unsubcribe = store.subscribe(this.handleStateChanged);
    store.dispatch(fetchItems());
  }

  componentDidCatch(error, info) {
    console.log('ItemList componentDidCatch', error, info);
    this.setState({ error });
  }

  componentDidUpdate() {
    console.log('ItemList componentDidUpdate');
  }

  componentWillUnmount() {
    this.unsubcribe();
    console.log('ItemList componentWillUnmount, pending searches must be cancelled :(');
  }

  handleStateChanged = () => {
    const { items, error } = this.props.store.getState().items;
    this.setState({ items, error });
  };

  handleStatusChange = itemId => {
    const { items } = this.state;
    const item = items.find(it => it.id === itemId);
    this.props.store.dispatch(updateItem({ ...item, isActive: !item.isActive }));
  };

  handleNewItem = async (text) =>
    this.props.store.dispatch(createItem({ text, isActive: true }));

  render() {
    const { error, items, newItemText } = this.state;
    if (error && !items) {
      console.log('ItemList render error');
      return <ErrorDetail error={error} />;
    }
    if (!items) {
      console.log('ItemList render loading');
      return <Loading />;
    }
    console.log('ItemList render items');
    return (
      <ItemListContainer>
        {error && <ErrorDetail error={error} />}
        <InputText value={newItemText} onSubmit={this.handleNewItem}/>
        {items.map(item => (
          <Item key={item.id} item={item} onStatusChange={this.handleStatusChange} />))
        }
      </ItemListContainer>
    );
  }
}

export default ItemList;
