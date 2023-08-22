import { LightningElement, wire, api } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import IMAGES from "@salesforce/resourceUrl/static_images";

const FIELDS = ['Account.Rating'];

export default class LWC_08_RatingAccountWarning extends LightningElement {
    @api recordId // Pass the recordId from the parent component or URL
    
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    account;

    // Store our icons in variables
    hotIcon = IMAGES + '/static_images/icons/hot.png';
    warmIcon = IMAGES + '/static_images/icons/sun.png';
    coldIcon = IMAGES + '/static_images/icons/snowflake.png';

    get hot() {
        return this.account.data && getFieldValue(this.account.data, 'Account.Rating') === 'Hot';
    }

    get warm() {
        return this.account.data && getFieldValue(this.account.data, 'Account.Rating') === 'Warm';
    }

    get cold() {
        return this.account.data && getFieldValue(this.account.data, 'Account.Rating') === 'Cold';
    }
}