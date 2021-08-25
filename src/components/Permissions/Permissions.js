import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import "./Permissions.css";

class Permissions extends Component {
  render() {
    return (
      <>
      <div className="permissions-container">
        <div className="permissions-header">
          <h2 className="perm-h1">Role Manager</h2>
          <h3>Users</h3>
          <h3>Roles</h3>
          <div className="perm-prof-icon"><i className="perm-cog fas fa-cog"></i></div>
        </div>
      </div>
      </>
    )
  }
}

export default withRouter(Permissions);
