import React from 'react';
import PropTypes from 'prop-types';
import './ExpandedSceneSelector.scss';
import {H5PContext} from "../../../context/H5PContext";

export default class ExpandedSceneSelector extends React.Component {
  render() {
    return (
      <div className='expanded-scene-selector'>
        <div className='header'>
          <div className='title'>{this.context.t('chooseScene')}</div>
        </div>
        {this.props.children}
      </div>
    );
  }
}

ExpandedSceneSelector.contextType = H5PContext;

ExpandedSceneSelector.propTypes = {
  children: PropTypes.node,
};