import React, { Component, Fragment } from 'react';
import { ethers } from 'ethers';
import PropTypes from 'prop-types';

const GAZ_LIMIT = 100000;
const GAZ_PRICE = 20000;

class MarketPlace extends Component {
  constructor() {
    super();
    this.state = {
      pictures: null,
      forSalePrices: {},
    };
    this.buyPicture = this.buyPicture.bind(this);
    this.sellPicture = this.sellPicture.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.removePicture = this.removePicture.bind(this);
    this.withdraw = this.withdraw.bind(this);
  }

  async componentDidMount() {
    const { contractInstance } = this.props;
    if (!contractInstance) return;
    try {
      const pictures = await contractInstance.getPictureItems();
      this.setState({ pictures });
    } catch (err) {
      console.log(err);
    }
  }

  onInputChange(index) {
    const { forSalePrices } = this.state;
    return e => {
      const price = e.target.value;
      const newPrices = Object.assign(forSalePrices, { [index]: price });
      this.setState({ forSalePrices: newPrices });
    };
  }

  buyPicture(index, price) {
    const { contractInstance } = this.props;
    return async () => {
      try {
        await contractInstance.buyPictureItem(index.toString(), {
          value: price,
          gasLimit: GAZ_LIMIT,
          gasPrice: GAZ_PRICE,
        });
      } catch (err) {
        console.log(err);
      }
    };
  }

  sellPicture(index, price) {
    const { contractInstance } = this.props;
    return async () => {
      try {
        await contractInstance.putPictureItemUpForSale(
          index.toString(),
          price,
          {
            gasLimit: GAZ_LIMIT,
            gasPrice: GAZ_PRICE,
          }
        );
      } catch (err) {
        console.log(err);
      }
    };
  }

  removePicture(index) {
    const { contractInstance } = this.props;
    return async () => {
      try {
        await contractInstance.removeFromMarket(index.toString(), {
          gasLimit: GAZ_LIMIT,
          gasPrice: GAZ_PRICE,
        });
      } catch (err) {
        console.log(err);
      }
    };
  }

  async withdraw() {
    const { contractInstance } = this.props;
    try {
      contractInstance.withdrawFunds({
        gasLimit: GAZ_LIMIT,
        gasPrice: GAZ_PRICE,
      });
    } catch (err) {
      console.log(err);
    }
  }

  renderActionButton(owner, forSale, price, index) {
    const { forSalePrices } = this.state;
    const { wallet } = this.props;
    if (!forSale && wallet.address !== owner) return 'Not for sale.';
    if (wallet.address === owner) {
      const sellPrice = forSalePrices[index];
      return (
        <div>
          <input
            type="number"
            placeholder={forSale ? price : 'Enter a price...'}
            value={sellPrice}
            onChange={this.onInputChange(index)}
          />
          <button onClick={this.sellPicture(index, sellPrice)}>Sell</button>
          <br />
          {forSale ? (
            <button onClick={this.removePicture(index)}>Remove</button>
          ) : null}
        </div>
      );
    } else {
      return (
        <button
          onClick={this.buyPicture(index, price)}
        >{`Buy ${price} Wei`}</button>
      );
    }
  }

  renderPictures() {
    const { pictures } = this.state;
    if (!pictures) return null;
    const [owners, available, prices] = pictures;
    return owners.map((owner, index) => {
      const forSale = available[index];
      const price = prices[index];
      return (
        <div className="picture-wrapper" key={`pic-${index}`}>
          <h3>{`Picture ${index + 1}`}</h3>
          <img
            alt={`pic-${index}`}
            width="200"
            height="200"
            src={`pictures/picture-${index}.jpg`}
          />
          {this.renderActionButton(owner, forSale, price, index)}
        </div>
      );
    });
  }

  renderMetamaskMessage() {
    return <div>Please install Metamask on your browser to continue.</div>;
  }

  renderBalance() {
    const { wallet } = this.props;
    if (!wallet || !wallet.balance) return null;
    return (
      <div className="balance-wrapper">
        {`Current balance: ${wallet.balance} wei`}
        <button onClick={this.withdraw}>Withdraw</button>
      </div>
    );
  }

  render() {
    if (!window.web3) return this.renderMetamaskMessage();
    const { contractInstance } = this.props;
    return (
      <div>
        <h1>Ethereum Market Place</h1>
        <h2>Buy pictures of Alexander now</h2>
        {!contractInstance ? (
          <div>Content loading...</div>
        ) : (
          <div>
            {this.renderBalance()}
            <div className="picture-layout">{this.renderPictures()}</div>
          </div>
        )}
      </div>
    );
  }
}

MarketPlace.propTypes = {
  contractInstance: PropTypes.object,
  wallet: PropTypes.object,
};

export default MarketPlace;
