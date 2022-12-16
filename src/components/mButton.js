import React, { Component } from 'react';
import Button from '@mui/material/Button';

class mButton extends Component {
  render() {
    return (
      <div>
        message: {this.props.message}
        <Button onClick={this.props.onClickSubmit}>Submit</Button>
      </div >
    );
  }
}