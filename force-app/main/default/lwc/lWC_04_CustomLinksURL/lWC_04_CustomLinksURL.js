import { LightningElement, wire } from 'lwc';
import getLinksList from '@salesforce/apex/AP01_DAO_CustomLinks.getLinksList';

export default class LWC_04_CustomLinksURL extends LightningElement {
    @wire(getLinksList)
    links;
}