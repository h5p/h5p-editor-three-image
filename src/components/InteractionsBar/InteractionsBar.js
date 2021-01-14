import React from 'react';
import PropTypes from 'prop-types';
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
    if (!this.props.isShowing) {
      return null;
    }

    if (!this.state.isInitialized) {
      return <div>{this.context.t('loading')}...</div>;
    }

    return (
      <div className='h5p-interactions-bar'>
        {
          this.state.libraries.map(library => {
            const className = library.name
              .toLowerCase()
              .replace('.', '-');

            return (
              <button
                className={className}
                key={library.name}
                onClick={this.props.createInteraction.bind(this, library)}
              >
                <div className='tooltip'>{library.title}</div>
              </button>
            );
          })
        }
      </div>
    );
  }
}

InteractionsBar.contextType = H5PContext;

InteractionsBar.propTypes = {
  isShowing: PropTypes.bool,
  createInteraction: PropTypes.func.isRequired,
};