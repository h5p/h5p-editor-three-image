import React from 'react';
import './SceneSelectorSubmenu.scss';

export default class SceneSelectorSubmenu extends React.Component {

  onDelete() {
    console.log("TODO: Deleting scene");
  }

  render() {
    return (
      <div className='scene-selector-submenu'>
        <button
          className='set-start-scene'
          title='Set as starting scene'
          disabled={this.props.isStartScene}
          onClick={this.props.setStartScene.bind(this)}
        />
        <button
          className='jump'
          title='Open scene'
          onClick={this.props.onJump.bind(this)}
        />
        <button
          className='edit'
          title='Edit'
          onClick={this.props.onEdit.bind(this)}
        />
        <button
          className='delete'
          title='Delete'
          onClick={this.onDelete.bind(this)}
        />
      </div>
    );
  }
}