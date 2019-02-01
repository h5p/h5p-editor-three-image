import React from 'react';
import PropTypes from 'prop-types';
import './SceneSelectorSubmenu.scss';

const SceneSelectorSubmenu = (props) => (
  <div className='scene-selector-submenu'>
    <button
      className='set-start-scene'
      title='Set as starting scene'
      disabled={props.isStartScene}
      onClick={props.setStartScene.bind(this)}
    />
    <button
      className='jump'
      title='Open scene'
      onClick={props.onJump.bind(this)}
    />
    <button
      className='edit'
      title='Edit'
      onClick={props.onEdit.bind(this)}
    />
    <button
      className='delete'
      title='Delete'
      onClick={props.onDelete.bind(this)}
    />
  </div>
);

export default SceneSelectorSubmenu;

SceneSelectorSubmenu.propTypes = {
  isStartScene: PropTypes.bool.isRequired,
  setStartScene: PropTypes.func.isRequired,
  onJump: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};