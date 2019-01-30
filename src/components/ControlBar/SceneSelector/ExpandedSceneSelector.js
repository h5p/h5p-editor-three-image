import React, {Component} from 'react';
import {H5PContext} from "../../../context/H5PContext";
import './ExpandedSceneSelector.scss';

export default class ExpandedSceneSelector extends Component {
  render() {
    return (
      <div className='expanded-scene-selector'>
        <div className='header'>
          <div className='title'>Choose a scene</div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

ExpandedSceneSelector.contextType = H5PContext;
