import React, { Component } from 'react';
import styled from 'styled-components';
import { ErrorDetail, Loading } from '../core';
import { ItemRestClient } from './ItemRestClient';

const ItemContainer = styled.div`
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

  render() {
    const { error, items } = this.state;
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
      <ItemContainer>
        {JSON.stringify(items)}
      </ItemContainer>
    );
  }
}

export default ItemList;
