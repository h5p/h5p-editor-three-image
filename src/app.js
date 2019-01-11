import React from 'react';
import ReactDOM from 'react-dom';
import Main from "./components/Main";

H5PEditor.widgets.threeImage = H5PEditor.ThreeImage = (function () {

  function ThreeImage(parent, field, params, setValue) {
    console.log("what is params ?", params);
    console.log("what is parent ?", parent);
    console.log("what is field ?", field);
    this.params = params || {};
    this.params = Object.assign({
      scenes: [],
    }, this.params);

    this.passReadies = true;
    parent.ready(() => this.passReadies = false);

    this.appendTo = function ($container) {
      const wrapper = document.createElement('div');
      $container[0].appendChild(wrapper);

      setValue(field, this.params);

      ReactDOM.render(
        <Main
          params={this.params}
          field={field}
          parent={this}
        />,
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
