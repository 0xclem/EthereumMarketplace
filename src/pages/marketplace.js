import React, { Component } from 'react';

class MarketPlace extends Component {
  renderPictures() {
    return (
      <div>
        <img width="200" height="200" src={`pictures/picture-0.jpg`} />
      </div>
    );
  }

  renderMetamaskMessage() {
    return <div>Please install Metamask on your browser to continue.</div>;
  }
  render() {
    if (!window.web3) return this.renderMetamaskMessage();
    return (
      <div>
        marketplace
        {this.renderPictures()}
      </div>
    );
  }
}

export default MarketPlace;
