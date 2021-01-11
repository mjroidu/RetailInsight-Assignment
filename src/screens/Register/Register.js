import React, { Component } from 'react';
import { Divider, ProfileImage } from '../../components';
import RightContent from './components/RightContent';
//import './style.css';

export class Register extends Component {
  render() {
    return (
      // <div className="rightPanel">
        <div className="a">
          <ProfileImage />
          <Divider />
          <RightContent />
        </div>
      // </div>
    )
  }
}

export default Register;
