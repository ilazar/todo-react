import React, { Component } from 'react';
import styled from 'styled-components';
import itemShape from "../items/itemShape";
import PropTypes from "prop-types";
import Item from "../items/Item";

const InputTextContainer = styled.div`
  text-align: center;
`;

export class InputText extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
  }

  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  static getDerivedStateFromProps(props, state) {

    return null;
  }

  handleChange = event  => this.setState({value: event.target.value});

  handleSubmit = event => {
    event.preventDefault();
    this.props.onSubmit(this.state.value)
      .then(this.setState({value: ''}));
  };

  render() {
    const { value } = this.state;
    return (
      <InputTextContainer>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </InputTextContainer>
    );
  }
}
