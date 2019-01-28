import React, {Component} from 'react';
import {SceneTypes} from "../../../Scene/Scene";
import SceneSelectorSubmenu from "./SceneSelectorSubmenu";
import './SceneRow.scss';
import {getImageSource} from "../../../../context/H5PContext";

export default class SceneRow extends Component {
  constructor(props) {
    super(props);

    this.imageRef = React.createRef();

    this.state = {
      isVerticalImage: false,
    };
  }

  onImageLoad() {
    const image = this.imageRef.current;
    const ratio = 4 / 3;

    this.setState({
      isVerticalImage: image.naturalWidth / image.naturalHeight < ratio,
    });
  }

  render() {

    const rowClasses = ['h5p-scene-row'];
    if (this.props.scene.sceneType === SceneTypes.THREE_SIXTY_SCENE) {
      rowClasses.push('three-sixty');
    }

    if (this.props.isStartScene) {
      rowClasses.push('starting-scene');
    }

    if (this.props.isAfterStartScene) {
      rowClasses.push('no-top-border');
    }

    const imageClasses = ['scene-thumbnail'];
    if (this.state.isVerticalImage) {
      imageClasses.push('vertical');
    }

    return (
      <div className={rowClasses.join(' ')}>
        <div className='thumbnail-wrapper'>
          <img
            className={imageClasses.join(' ')}
            src={getImageSource(this.props.scene.scenesrc.path)}
            alt={this.props.scene.scenesrc.alt}
            onLoad={this.onImageLoad.bind(this)}
            ref={this.imageRef}
          />
        </div>
        <div className='scene-wrapper'>
          <div className='h5p-scene-name'>{this.props.scene.scenename}</div>
          {
            this.props.isStartScene &&
            <div className='starting-scene'>Starting scene</div>
          }
        </div>
        <SceneSelectorSubmenu
          isStartScene={this.props.isStartScene}
          setStartScene={this.props.setStartScene.bind(this, this.props.scene)}
          onJump={this.props.changeScene.bind(this, this.props.scene.sceneId)}
          onEdit={this.props.editScene.bind(this, this.props.scene.sceneId)}
        />
      </div>
    );
  }
}