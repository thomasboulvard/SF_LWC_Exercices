import { LightningElement, api, wire } from 'lwc';
import getCategoriesListController from '@salesforce/apex/AP02_CustomLinksHandler.getCategoriesListController';

export default class LWC_03_CustomLinksCategory extends LightningElement {
    @wire(getCategoriesListController)
    categories;
}