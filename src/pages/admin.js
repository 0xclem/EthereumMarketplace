import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      pictures: null,
    };
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

  renderOwnershipArray() {
    const { pictures } = this.state;
    if (!pictures) return null;
    const owners = pictures[0];
    return (
      <table>
        <thead>
          <tr>
            <th>Picture #</th>
            <th>Owner</th>
          </tr>
        </thead>
        <tbody>
          {owners.map((owner, index) => {
            return (
              <tr key={`${owner}-${index}`}>
                <td>{index + 1}</td>
                <td>{owner}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  render() {
    const { contractInstance } = this.props;
    return (
      <div className="adminPanel">
        <h1>Admin Panel</h1>
        <h2>Consult who owns what</h2>
        {!contractInstance ? (
          <div>Content loading...</div>
        ) : (
          <div>{this.renderOwnershipArray()}</div>
        )}
      </div>
    );
  }
}

Admin.propTypes = {
  contractInstance: PropTypes.object,
  wallet: PropTypes.object,
};
export default Admin;
