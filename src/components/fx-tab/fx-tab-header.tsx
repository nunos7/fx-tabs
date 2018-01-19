import { Component, State, Event, Element, EventEmitter, Prop, Method } from '@stencil/core';

@Component({
  tag: 'fx-tab-header',
  styleUrl: 'fx-tab-header.scss',
  shadow: false
})
export class FxTabHeader {

  @Element() element: HTMLElement;

  @Prop() selected: boolean = false;
  @Prop() contentTarget: string;
  @Prop() dismissible: boolean;
  @Prop() status: string; // TODO: typed this?!?!

  @State() isSelected: boolean = false;
  @State() isDismissible: boolean = false;

  @Event() onSelect: EventEmitter;
  @Event() onDeselect: EventEmitter;
  @Event() onTabHeaderAdded: EventEmitter;
  @Event() onTabHeaderRemoved: EventEmitter;

  @Method()
  unselect() {
    this.isSelected = false;
    this.onDeselect.emit(this);
  }
  @Method()
  select() {
    this.isSelected = true;
  }

  private onClick() {
    this.onSelect.emit(this);
  }
  private onRemove() {
    this.onTabHeaderRemoved.emit(this);
  }

  componentDidLoad() {
    this.postRender();
    this.onTabHeaderAdded.emit(this);
    this.isDismissible = this.dismissible;
  }
  componentDidUnload() {
    this.onTabHeaderRemoved.emit(this);
  }
  componentDidUpdate() {
    this.postRender();
  }

  private postRender() {
    let children = this.element.childNodes;

    for (let ci = 0; ci < children.length; ++ci) {
      this.element.parentElement.appendChild(children.item(ci));
    }
  }

  render() {
    console.log("fx-tab-header render....");
    const classes = {
      'active': this.isSelected,
      'fx-dismissible': this.isDismissible
    }

    const cssStatus = [
      'fx-alert-icon',
      'fx-icon',
      `fx-alert-icon-${this.status}`
    ].join(" ");

    return [
      <li class={classes} onClick={() => this.onClick()}>
        <a class="fx-tab"><slot /></a>
        {
          this.isDismissible ?
            <button class="fx-del-tab" onClick={() => this.onRemove()}><i class="glyphicon glyphicon-remove"></i></button>
            : []
        }
        {
          this.status ?
          <span class="fx-status-tab"><i class={cssStatus}></i></span>
          :[]
        }
      </li>
    ];
  }

}
