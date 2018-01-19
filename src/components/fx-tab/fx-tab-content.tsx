import { Component, State, Method } from '@stencil/core';

@Component({
  tag: 'fx-tab-content',
  styleUrl: 'fx-tab-content.scss',
  shadow: false,
  host:{
    theme: 'tab-content'
  }
})
export class FxTabContent {

componentDidLoad() {
  console.log('FxTabContent: The component has been rendered');
}

  @State() isSelected: boolean = false;
  
  @Method()
  unselect() {
    this.isSelected = false;
  }
  @Method()
  select() {
    this.isSelected = true;
  }

  render() {
    const classes = {
      'tab-pane':true,
      'active ': this.isSelected
    }
    return (
        <div class={classes}><slot /></div>
    )

  }


}
