import React from 'react';
import ReactDOM from 'react-dom';
import Main from "./components/Main";

H5PEditor.widgets.threeImage = H5PEditor.ThreeImage = (function () {

  function ThreeImage(parent, field, params, setValue) {
    console.log("initializing three image...");
    console.log("what is params ?", params);
    console.log("what is parent ?", parent);
    console.log("what is field ?", field);

    console.log("initial params ?", params);
    this.params = params || {};
    this.params = Object.assign({
      scenes: [],
    }, this.params);

    console.log("this params", params, this.params);

    this.passReadies = true;
    parent.ready(() => this.passReadies = false);

    this.appendTo = function ($container) {
      const wrapper = document.createElement('div');
      $container[0].appendChild(wrapper);

      // const waffles = document.createElement('div');
      // wrapper.appendChild(waffles);

      // H5PEditor.processSemanticsChunk(
      //   field.fields,
      //   this.params,
      //   H5P.jQuery(waffles),
      //   this
      // );
      setValue(field, this.params);

      // const previewWrapper = document.createElement('div');
      // wrapper.appendChild(previewWrapper);
      //
      // const otterWrapper = document.createElement('div');
      // wrapper.appendChild(otterWrapper);

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
      console.log("what is happening here ? has params updated ?", this.params);
      return true;
    };
  }

  return ThreeImage;
})();
