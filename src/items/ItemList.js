import React, { Component } from 'react';
import styled from 'styled-components';
import { ErrorDetail, InputText, Loading } from '../core';
import { ItemRestClient } from './ItemRestClient';
import Item from './Item';

const ItemListContainer = styled.div`
  text-align: center;
`;

class ItemList extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, items: null };
    this.itemRestClient = new ItemRestClient();
  }

  componentDidMount() {
    console.log('ItemList componentDidMount');
    this.itemRestClient.search({})
      .then(items => this.setState({ items }))
      .catch(error => this.setState({ error }));
  }

  componentDidCatch(error, info) {
    console.log('ItemList componentDidCatch', error, info);
    this.setState({ error });
  }

  componentDidUpdate() {
    console.log('ItemList componentDidUpdate');
  }

  componentWillUnmount() {
    console.log('ItemList componentWillUnmount, pending searches must be cancelled :(');
  }

  handleStatusChange = itemId => {
    const { items } = this.state;
    const item = items.find(it => it.id === itemId);
    this.itemRestClient.update({ ...item, isActive: !item.isActive })
      .then(updatedItem => {
        const index = items.findIndex(it => it.id === itemId);
        if (index !== -1) {
          const newItems = items.slice();
          newItems.splice(index, 1, updatedItem);
          this.setState({ items:  newItems});
        }
      })
      .catch(error => this.setState({ error }));
  };

  handleNewItem = async (text) => {
    const { items } = this.state;
    return this.itemRestClient.create({ text, isActive: true })
      .then(createdItem => this.setState({ items:  [createdItem, ...items] }))
      .catch(error => this.setState({ error }));
  };

  render() {
    const { error, items, newItemText } = this.state;
    if (error) {
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
        <InputText value={newItemText} onSubmit={this.handleNewItem}/>
        {items.map(item => (
          <Item key={item.id} item={item} onStatusChange={this.handleStatusChange} />))
        }
      </ItemListContainer>
    );
  }
}

export default ItemList;
