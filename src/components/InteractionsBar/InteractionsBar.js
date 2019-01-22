import React from 'react';
import './InteractionsBar.scss';

export default class InteractionsBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isInitialized: false,
      libraries: null,
    };
  }

  componentDidMount() {

    const actionField = H5PEditor.findSemanticsField(
      'action',
      this.props.interactionsField
    );


    H5PEditor.LibraryListCache.getLibraries(
      actionField.options,
      (libraries) => {
        this.setState({
          isInitialized: true,
          libraries: libraries,
        });
      }
    );
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