import "@babel/polyfill";
import React from 'react';
import ReactDOM from 'react-dom';
import Main from "./components/Main";
import {H5PContext} from './context/H5PContext';

H5PEditor.widgets.threeImage = H5PEditor.ThreeImage = (function () {

  function ThreeImage(parent, field, params, setValue) {
    this.params = params || {};
    this.params = Object.assign({
      scenes: [],
    }, this.params);
    this.parent = parent;
    this.field = field;

    this.appendTo = function ($container) {
      const wrapper = document.createElement('div');
      $container[0].appendChild(wrapper);

      setValue(field, this.params);

      // TODO: Should be possible to set start scene
      const startScene = this.params.scenes.length ? 0 : null;

      ReactDOM.render(
        <H5PContext.Provider value={this}>
          <Main initialScene={startScene} />
        </H5PContext.Provider>,
        wrapper
      );
    };

    this.ready = (ready) => {
      if (this.passReadies) {
        parent.ready(ready);
      }
      else {
        this.readies.push(ready);
      }
    };

    this.validate = function () {
      return true;
    };
  }

  return ThreeImage;
})();
