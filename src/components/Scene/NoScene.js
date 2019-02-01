import React from 'react';
import './NoScene.scss';

export default class NoScene extends React.Component {
  render() {
    return (
      <div className='no-scene-container'>
        <div className="no-scene-wrapper">
          <div className="title">No scenes</div>
          <div className="description">Click a button below to add the first scene</div>
        </div>
      </div>
    );
  }
}
