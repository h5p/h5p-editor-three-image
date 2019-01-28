import React from 'react';
import './SceneSelectorSubmenu.scss';

export default class SceneSelectorSubmenu extends React.Component {

  onDelete() {
    // TODO: Make into an H5PContext function
    // Show confirmation dialog
    // Delete interaction
    const deleteDialog = new H5P.ConfirmationDialog({
      headerText: 'Deleting scene',
      dialogText: 'Deleting this scene will also delete all interactions within the scene and any navigational hotspots pointing to this scene. Are you sure you wish to delete this scene ?',
      cancelText: 'Cancel',
      confirmText: 'Confirm',
    }).appendTo(document.body);

    deleteDialog.on('confirmed', () => {
      this.props.onDelete();
    });

    deleteDialog.on('canceled', () => {
      // Just return to dialog
    });

    deleteDialog.show();
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