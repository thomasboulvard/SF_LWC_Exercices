import { LightningElement, api, wire } from 'lwc';
import getCategoriesList from '@salesforce/apex/AP01_DAO_CustomLinks.getCategoriesList';

export default class LWC_03_CustomLinksCategory extends LightningElement {
    @wire(getCategoriesList)
    categories;
}