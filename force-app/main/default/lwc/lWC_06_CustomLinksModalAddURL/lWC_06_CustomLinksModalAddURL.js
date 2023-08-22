// IMPORT LIGHTNING METHODS/ACTIONS
import { LightningElement, track, wire, api } from 'lwc';
import LightningModal from 'lightning/modal';

// IMPORT METHODS
import getCategoriesListController from '@salesforce/apex/AP02_CustomLinksHandler.getCategoriesListController';
import addLink from '@salesforce/apex/AP02_CustomLinksHandler.addLink';
import updateLink from '@salesforce/apex/AP02_CustomLinksHandler.updateLink';
import Utils from 'c/utils';

// IMPORT CUSTOM LABELS :
import CL_Text_TitleCreateLinkModal from '@salesforce/label/c.CL_Text_TitleCreateLinkModal';
import CL_Text_TitleUpdateLinkModal from '@salesforce/label/c.CL_Text_TitleUpdateLinkModal';
import CL_Text_CreateLinkModal from '@salesforce/label/c.CL_Text_CreateLinkModal';
import CL_Text_UpdateLinkModal from '@salesforce/label/c.CL_Text_UpdateLinkModal';
import CL_Toast_Message_LinkCreated from '@salesforce/label/c.CL_Toast_Message_LinkCreated';
import CL_Toast_Message_LinkUpdated from '@salesforce/label/c.CL_Toast_Message_LinkUpdated';
import CL_Button_Cancel from '@salesforce/label/c.CL_Button_Cancel';
import CL_Button_Validate from '@salesforce/label/c.CL_Button_Validate';


export default class LWC_06_CustomLinksModalAddURL extends LightningModal {
    @track categories = [];
    @api recordId; // The ID of the existing Link is passed through this variable
    @api isUpdate; // Boolean which allow us to display the modal based on the creation/update of a Link
    linkLabel = '';
    linkURL = '';
    CategoryId = '';
    
    // List of the different labels we're gonna use on this LWC :
    labels = {
        CL_Text_TitleCreateLinkModal,
        CL_Text_TitleUpdateLinkModal,
        CL_Text_CreateLinkModal,
        CL_Text_UpdateLinkModal,
        CL_Toast_Message_LinkCreated,
        CL_Toast_Message_LinkUpdated,
        CL_Button_Cancel,
        CL_Button_Validate,
    };
    
    // -----------------------------------
    // GET RELATED CATEGORIES METHOD
    // -----------------------------------
    
    // Method to retrieve the Categories of the user and allow him to connect a new Custom Link to it
    @wire(getCategoriesListController)
    connectedCallback() {
        getCategoriesListController()
        .then((result) => {
            if(result) {
                this.categories = result.map(category => {
                    return {
                        label: category.Category_Label__c,
                        value: category.Id
                    };
                })
            }})
            .catch((error) => {
                this.error = error;
                console.log('LWC_05_CustomLinksModalAddCategory.JS - saveClick().addCategory() --> Catch Error');
        });
    }


    // -----------------------------------
    // STORE VALUES IN VARIABLES METHODS
    // -----------------------------------

    // Method to get the value entered in the input "Label" and store it in a variable
    handleLabelChange(event) {
        this.linkLabel = event.target.value;
    }

    // Method to get the value entered in the input "URL" and store it in a variable
    handleUrlChange(event) {
        this.linkURL = event.target.value;
    }

    // Method to get the value entered in the input "Category" and store it in a variable
    handleCategoryChange(event) {
        this.CategoryId = event.target.value;
    }


    // -----------------------------------
    // CREATE LINK METHOD
    // -----------------------------------

    // Method to create a new Link
    saveClick(event) {
        addLink({label: this.linkLabel, categoryID: this.CategoryId, url: this.linkURL})
            .then((result) => {
                console.log('LWC_06_CustomLinksModalAddURL.saveClick().addLink() --> Success');
                this.close(result);
                console.log('------------' + JSON.stringify(result));
                const toastEventSuccess = Utils.showToast('Success', CL_Toast_Message_LinkCreated, 'success');
                this.dispatchEvent(toastEventSuccess);
            })
            .catch((error) => {
                this.error = error;
                console.log('LWC_06_CustomLinksModalAddURL.saveClick().addLink() --> Catch Error : ' + error);
            });
    }
    
    
    // -----------------------------------
    // UPDATE LINK METHOD
    // -----------------------------------

    // Method to update an existing Link
    updateClick(event) {
        updateLink({linkID: this.recordId, url: this.linkURL, categoryID: this.CategoryId, linkLabel: this.linkLabel})
        .then((result) => {
            console.log('LWC_06_CustomLinksModalAddURL.updateClick().updateLink() --> Success');
            this.close(result);
            const toastEventSuccess = Utils.showToast('Success', CL_Toast_Message_LinkUpdated, 'success');
            this.dispatchEvent(toastEventSuccess);
        })
        .catch((error) => {
            this.error = error;
            console.log('LWC_06_CustomLinksModalAddURL.updateClick().updateLink() --> Catch Error : ' + error);
        });
    }


    // -----------------------------------
    // CANCEL METHOD
    // -----------------------------------

    // Method to cancel the creation of the record
    cancelClick() {
        console.log('CANCELLED');
        this.close();
    }
}