import { Component, Listen, Element } from '@stencil/core';
import { FxTabHeader } from './fx-tab-header';
import { FxTabContent } from './fx-tab-content';

@Component({
  tag: 'fx-tabs',
  shadow: false
})
export class FxTabs {

  private tabsHeader: FxTabHeader[] = [];
  private tabSelected: FxTabHeader;
  private tabContentSelected: FxTabContent;

  @Element() element: HTMLElement;

  componentWillLoad() {
    console.log('FxTabs: componentWillLoad: The component is about to be rendered');    
  }
  componentDidLoad() {
    console.log('FxTabs: componentDidLoad: The component has been rendered');
    
    const [tabH] = this.tabsHeader.filter((tab) => tab.selected);
    this.selectTab(tabH);

    this.selectContent(tabH);
  }

  @Listen('onSelect') // Listen 
  tabHeaderSelect(event: CustomEvent) {
    console.log("onSelect", event);
    this.selectTab(event.detail);

    this.selectContent(event.detail);
  }

  @Listen('onTabHeaderAdded')
  tabHeaderAdded(event: CustomEvent){
    this.tabsHeader = [...this.tabsHeader, event.detail];
  }

  private selectTab(tab: FxTabHeader) {
    if (!tab) return;

    //unselect prev tab
    if (this.tabSelected) this.tabSelected.unselect();

    //select tab
    tab.select();

    this.tabSelected = tab;
  }

  private getTabContentById(contentID: string): FxTabContent {
    return this.element.querySelector<HTMLFxTabContentElement>(contentID);
  }

  private selectContent(tab: FxTabHeader) {
    if (!tab && !tab.contentTarget) return;

    //unselect prev tab content
    if (this.tabContentSelected) this.tabContentSelected.unselect();


    this.tabContentSelected = this.getTabContentById(tab.contentTarget);

    //select tab content
    if (this.tabContentSelected) this.tabContentSelected.select();
  }

  render() {
    return <slot />
  }

}
