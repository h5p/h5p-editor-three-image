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

    this.passReadies = true;
    parent.ready(() => this.passReadies = false);
    this.parent = parent;

    this.appendTo = function ($container) {
      const wrapper = document.createElement('div');
      $container[0].appendChild(wrapper);

      setValue(field, this.params);

      ReactDOM.render(
        <H5PContext.Provider value={this}>
          <Main
            params={this.params}
            field={field}
            parent={this}
          />
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
