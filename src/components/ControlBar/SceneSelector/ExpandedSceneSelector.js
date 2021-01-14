import React from 'react';
import PropTypes from 'prop-types';
import './ExpandedSceneSelector.scss';

const ExpandedSceneSelector = (props) => (
  <div className='expanded-scene-selector'>
    <div className='header'>
      <div className='title'>{props.chooseSceneLabel}</div>
    </div>
    {props.children}
  </div>
);

ExpandedSceneSelector.propTypes = {
  children: PropTypes.node,
  chooseSceneLabel: PropTypes.string.isRequired
};

export default ExpandedSceneSelector;