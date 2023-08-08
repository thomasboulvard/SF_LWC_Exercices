import { LightningElement, wire, api, track } from 'lwc';
import getLinksListController from '@salesforce/apex/AP02_CustomLinksHandler.getLinksListController';
import CL_HelpText_UpdateLink from '@salesforce/label/c.CL_HelpText_UpdateLink';
import CL_HelpText_DeleteLink from '@salesforce/label/c.CL_HelpText_DeleteLink';

export default class LWC_04_CustomLinksURL extends LightningElement {
    @api categoryId;
    labels = {
        CL_HelpText_UpdateLink,
        CL_HelpText_DeleteLink
    };

    // ------------ ADD a spinner waiting for the wire to get everything !!!

    // Call the Apex method to fetch links related to the Category
     @wire(getLinksListController, { categoryId: '$categoryId' })
     links;

    connectedCallback() {
        // Add a catch block to handle errors in the wire call
        getLinksListController({ categoryId: this.categoryId })
            .then(result => {
                console.log('lnks is working' + result);
                this.links = result;
            })
            .catch((error) => {
                console.error('Error in direct Apex call: ', error);
            });
    }
}