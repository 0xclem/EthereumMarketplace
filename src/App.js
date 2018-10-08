import React, { Component } from 'react';
import { Switch, Route, HashRouter } from 'react-router-dom';
import MarketPlacePage from './pages/marketplace';
import AdminPage from './pages/admin';
import { ethers, Contract, providers, utils, Interface } from 'ethers';
import abi from './lib/abi';
import './App.css';

const SMART_CONTRACT_ADDR = '0xF9Cf83FdF7C4DEC13AEE0156db910B0dD1ae19D1';

class App extends Component {
  constructor() {
    super();
    this.state = {
      contractInstance: null,
      wallet: null,
    };
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
      const wallets = await web3Provider.listAccounts();
      const balance = await contractInstance.balances(wallets[0]);
      const wallet = {
        address: wallets[0],
        balance: balance.isZero() ? 0 : balance.toString(),
      };
      this.setState({
        contractInstance,
        wallet,
      });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const { contractInstance, wallet } = this.state;
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            <Route
              exact
              path="/"
              component={() => (
                <MarketPlacePage
                  contractInstance={contractInstance}
                  wallet={wallet}
                />
              )}
            />
            <Route
              path="/mainAdmin"
              component={() => (
                <AdminPage contractInstance={contractInstance} />
              )}
            />
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
