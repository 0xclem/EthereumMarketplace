import React, { Component, Fragment } from 'react';
import { ethers, Contract, providers, utils, Interface } from 'ethers';
import abi from '../lib/abi';

const SMART_CONTRACT_ADDR = '0xF9Cf83FdF7C4DEC13AEE0156db910B0dD1ae19D1';
const DEFAULT_PROVIDER = ethers.getDefaultProvider('ropsten');
const GAZ_LIMIT = 100000;
const GAZ_PRICE = 20000;

class MarketPlace extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      contractInstance: null,
      forSalePrices: {},
    };
    this.buyPicture = this.buyPicture.bind(this);
    this.sellPicture = this.sellPicture.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  async componentDidMount() {
    if (!window.web3 || !window.web3.currentProvider) return;
    const web3Provider = new ethers.providers.Web3Provider(
      window.web3.currentProvider
    );
    const signer = web3Provider.getSigner();
    try {
      const contractInstance = await new Contract(
        SMART_CONTRACT_ADDR,
        abi,
        signer
      );
      const wallet = await web3Provider.listAccounts();
      const pictures = await contractInstance.getPictureItems();
      this.setState({
        signer,
        contractInstance,
        wallet: wallet[0],
        pictures,
        isLoading: false,
      });
    } catch (err) {
      console.log(err);
    }
  }

  onInputChange(index) {
    const { forSalePrices } = this.state;
    console.log('heeere', index);
    return e => {
      const price = e.target.value;
      const newPrices = Object.assign(forSalePrices, { [index]: price });
      this.setState({ forSalePrices: newPrices });
    };
  }

  buyPicture(index, price) {
    const { contractInstance } = this.state;
    return async () => {
      try {
        const buyPicture = await contractInstance.buyPictureItem(
          index.toString(),
          {
            value: price,
            gasLimit: GAZ_LIMIT,
            gasPrice: GAZ_PRICE,
          }
        );
      } catch (err) {
        console.log(err);
      }
    };
  }

  sellPicture(index, price) {
    const { contractInstance } = this.state;
    return async () => {
      try {
        const sellPicture = await contractInstance.putPictureItemUpForSale(
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

  renderActionButton(owner, forSale, price, index) {
    const { wallet, forSalePrices } = this.state;
    if (!forSale && wallet !== owner) return 'Not for sale.';
    if (wallet === owner) {
      const sellPrice = forSalePrices[index];
      return (
        <div>
          <input
            type="number"
            placeholder="Enter a price"
            value={sellPrice}
            onChange={this.onInputChange(index)}
          />
          <button onClick={this.sellPicture(index, sellPrice)}>Sell</button>
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
  render() {
    if (!window.web3) return this.renderMetamaskMessage();
    const { isLoading } = this.state;
    return (
      <div>
        <h1>Ethereum Market Place</h1>
        <h2>Buy pictures of Alexander now</h2>
        {isLoading ? (
          <div>Content loading...</div>
        ) : (
          <div className="picture-layout">{this.renderPictures()}</div>
        )}
      </div>
    );
  }
}

export default MarketPlace;
