import { Component } from '@stencil/core';

@Component({
  tag: 'fx-tab-set',
  shadow: false
})
export class FxTabSet {

  render() {    
    return [
      <ul class="nav nav-tabs" role="tablist">
          <slot />
      </ul>
  ];
  }

}
