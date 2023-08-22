// IMPORT LIGHTNING METHODS/ACTIONS
import { LightningElement, wire, api, track } from 'lwc';

// IMPORT MODALS :
import LWC_07_CustomLinksModalConfirmation from 'c/lWC_07_CustomLinksModalConfirmation';
import LWC_06_CustomLinksModalAddURL from 'c/lWC_06_CustomLinksModalAddURL';

// IMPORT METHODS
import getLinksListController from '@salesforce/apex/AP02_CustomLinksHandler.getLinksListController';

// IMPORT CUSTOM LABELS :
import CL_HelpText_UpdateLink from '@salesforce/label/c.CL_HelpText_UpdateLink';
import CL_HelpText_DeleteLink from '@salesforce/label/c.CL_HelpText_DeleteLink';

export default class LWC_04_CustomLinksURL extends LightningElement {
    @api categoryId;
    @track iconName = '';
    
    // List of the different labels we're gonna use on this LWC :
    labels = {
        CL_HelpText_UpdateLink,
        CL_HelpText_DeleteLink
    };


    // -----------------------------------
    // SPINNER WHILE LOADING METHODS
    // -----------------------------------

    // ------------ ADD a spinner waiting for the wire to get everything !!!



    // -----------------------------------
    // DISPLAY ICONS BASED ON TYPE METHODS
    // -----------------------------------

    calculateIconName(url) {
        if (url.includes('Account')) {
            return 'doctype:account';
        }else if (url.includes('Contact')) {
            return 'doctype:contact';
        }else if (url.includes('ContentDocument')) {
            return 'doctype:folder';
        } else {
            return 'doctype:link';
        }
    }

    // Call the Apex method to fetch links related to the Category
    //  @wire(getLinksListController, { categoryId: '$categoryId' })
     @track links;

    connectedCallback() {
        // Add a catch block to handle errors in the wire call
        getLinksListController({ categoryId: this.categoryId })
            .then(result => {
                console.log('links is working' + JSON.stringify(result));
                this.links = result;
                if(this.links) {
                    console.log('links.data:', this.links);
                    const firstLinkUrl = this.links[0].url__c;
                    this.calculateIconName(firstLinkUrl);
                }
            })
            .catch((error) => {
                console.error('Error in direct Apex call: ', error);
            });
    }

    // connectedCallback() {
    //     // Add a catch block to handle errors in the wire call
    //     if (this.links.data && this.links.data.length > 0) {
    //         const firstLinkUrl = this.links.data[0].url__c;
    //         this.iconName = this.calculateIconName(firstLinkUrl);
    //     }
    // }


    // -----------------------------------
    // UPDATE LINK METHODS
    // -----------------------------------

    // Retrieve the Id of our Link to pass it to the method "updateLink" which will pass it to the LWC "LWC_06_CustomLinksModalAddURL"
    handleUpdateLink(event) {
        const linkId = event.currentTarget.dataset.linkId;
        this.updateLink(linkId);
    }

    async updateLink(linkId) {
        console.log('Updating link with ID : ' + linkId);
        const result = await LWC_06_CustomLinksModalAddURL.open({
            size: 'small',
            description: 'My Modal',
            content: 'oui',
            recordId: linkId,
            isUpdate: true,
        });
        this.links = result;
        console.log(JSON.stringify(result));
    }


    // -----------------------------------
    // COMMUNICATE WITH PARENT METHOD
    // -----------------------------------

    @api 
    updateAfterSave(parentLinks) {
        this.links = parentLinks;
        console.log('It WORKS');
    }


    // -----------------------------------
    // DELETE LINK METHODS
    // -----------------------------------

    // Retrieve the Id of our Link to pass it to the method "deleteLink" which will pass it to the LWC "LWC_07_CustomLinksModalConfirmation"
    handleDeleteLink(event) {
        const linkId = event.currentTarget.dataset.linkId;
        this.deleteLink(linkId);
    }

    // Method which call the modal LWC_07 and pass it the link.Id to confirm it deletion
    async deleteLink(linkId) {
        console.log('Deleting Link with ID:', linkId);
        const result = await LWC_07_CustomLinksModalConfirmation.open({
            size: 'small',
            description: 'My Modal',
            content : 'oui',
            recordId: linkId,
        });
        console.log(JSON.stringify(result));
    }
}