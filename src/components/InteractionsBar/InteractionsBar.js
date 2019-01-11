import React from 'react';
import './InteractionsBar.scss';

export default class InteractionsBar extends React.Component {
  constructor(props) {
    super(props);

    this.dnbRef = React.createRef();

    this.state = {
      isInitialized: false,
    };
  }

  componentDidMount() {
    if (!this.state.isInitialized) {
      this.initializeDnB();
    }
  }

  componentDidUpdate() {
    if (!this.state.isInitialized) {
      this.initializeDnB();
    }

  }

  initializeDnB() {
    if (!this.props.sceneRef || !this.props.sceneWrapperRef) {
      return;
    }

    // TODO: Add some interactions for testing
    const buttons = [
      {
        id: 'dummybutton',
        title: 'dummy',
        createElement: () => {
          const element = document.createElement('div');
          element.classList.add('dummy-element');
          element.style = {
            background: 'red',
            width: '2em',
            height: '2em',
          };

          this.props.sceneRef.current.appendChild(element);

          return H5P.jQuery(element);
        },
      }
    ];

    const droppableArea = this.props.sceneRef.current;
    const draggableArea = this.props.sceneWrapperRef.current;

    this.dnb = new H5P.DragNBar(
      buttons,
      H5P.jQuery(droppableArea),
      H5P.jQuery(draggableArea)
    );

    this.dnb.stopMovingCallback = (x, y) => {
      // TODO: Update params when the element stops moving
    };

    this.dnb.dnd.releaseCallback = () => {
      // TODO: Edit element when it is dropped
    };

    this.dnb.dnd.startMovingCallback = () => {
      this.dnb.dnd.min = {x: 0, y: 0};
      this.dnb.dnd.max = {
        x: this.dnb.$container.width() - this.dnb.$element.outerWidth(),
        y: this.dnb.$container.height() - this.dnb.$element.outerHeight()
      };

      if (this.dnb.newElement) {
        this.dnb.dnd.adjust.x = this.dnb.$element.outerWidth() / 2;
        this.dnb.dnd.adjust.y = this.dnb.$element.outerHeight() / 2;
        this.dnb.dnd.min.y -= this.dnb.$list.height();
      }

      return true;
    };

    this.dnb.attach(H5P.jQuery(this.dnbRef.current));

    this.setState( {
      isInitialized: true,
    });
  }

  render() {
    return (
      <div className='dnb-wrapper'>
        <div ref={this.dnbRef} />
      </div>
    );
  }
}