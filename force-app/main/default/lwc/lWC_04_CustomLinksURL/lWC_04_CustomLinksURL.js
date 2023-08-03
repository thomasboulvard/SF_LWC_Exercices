import { LightningElement, wire } from 'lwc';
import getLinksListController from '@salesforce/apex/AP02_CustomLinksHandler.getLinksListController';

export default class LWC_04_CustomLinksURL extends LightningElement {
    @wire(getLinksListController)
    links;
}