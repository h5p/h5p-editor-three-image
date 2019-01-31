import React, {Component} from 'react';
import SceneList from "../../../ControlBar/SceneSelector/SceneList";

export default class GoToSceneSelector extends Component {
  render() {
    return (
      <div className='go-to-scene-selector'>
        <div className='error-message'>Please select a scene</div>
        <SceneList
          scenes={this.props.scenes}
          markedScene={this.props.markedScene}
          onSceneClick={this.props.setNextSceneId.bind(this)}
          isShowingCheck={true}
        />
      </div>
    );
  }
}