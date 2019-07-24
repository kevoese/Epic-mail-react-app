/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';

class Input extends Component {
  state = {
    valid: false,
  };

  validate = event => {
    event.target.checkValidity() ? this.setState({ valid: true }) : this.setState({ valid: false });
    this.props.onChange(event);
  };

  render() {
    const { id, value, type, pattern, placeholder, title, classes } = this.props;
    return (
      <div className={`icon linfo ${classes || ''} ${this.state.valid && 'validIcon'}`}>
        <input
          id={id}
          value={value}
          onChange={this.validate}
          type={type}
          pattern={pattern}
          className="input"
          placeholder={placeholder}
          required
          title={title}
        />
      </div>
    );
  }
}

export default Input;
