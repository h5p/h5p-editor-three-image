import React from 'react';
import './InteractionsBar.scss';
import {getLibraries, H5PContext} from "../../context/H5PContext";

export default class InteractionsBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isInitialized: false,
      libraries: null,
    };
  }

  async componentDidMount() {
    const libraries = await getLibraries(this.context.field);
    this.setState({
      isInitialized: true,
      libraries: libraries,
    });
  }

  render() {
    if (!this.props.isSceneUpdated) {
      return null;
    }

    if (!this.state.isInitialized) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {
          this.state.libraries.map(library => {
            return (
              <button
                key={library.name}
                onClick={this.props.createInteraction.bind(this, library)}
              >{library.title}</button>
            );
          })
        }
      </div>
    );
  }
}

InteractionsBar.contextType = H5PContext;