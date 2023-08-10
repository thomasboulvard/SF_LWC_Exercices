// IMPORT LIGHTNING METHODS/ACTIONS
import { LightningElement, track, wire } from 'lwc';
import LightningModal from 'lightning/modal';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

// IMPORT METHODS
import getCategoriesListController from '@salesforce/apex/AP02_CustomLinksHandler.getCategoriesListController';
import addLink from '@salesforce/apex/AP02_CustomLinksHandler.addLink';
import Utils from 'c/utils';

// IMPORT CUSTOM LABELS :
import CL_Text_TitleCreateLinkModal from '@salesforce/label/c.CL_Text_TitleCreateLinkModal';
import CL_Text_CreateLinkModal from '@salesforce/label/c.CL_Text_CreateLinkModal';
import CL_Toast_Message_LinkCreated from '@salesforce/label/c.CL_Toast_Message_LinkCreated';
import CL_Button_Cancel from '@salesforce/label/c.CL_Button_Cancel';
import CL_Button_Validate from '@salesforce/label/c.CL_Button_Validate';


export default class LWC_06_CustomLinksModalAddURL extends LightningModal {
    @track categories = [];
    @wire(getCategoriesListController)
    linkLabel = '';
    linkURL = '';
    CategoryId = '';

    // List of the different labels we're gonna use on this LWC :
    labels = {
        CL_Text_TitleCreateLinkModal,
        CL_Text_CreateLinkModal,
        CL_Button_Cancel,
        CL_Button_Validate
    };

    // Method to retrieve the Categories of the user and allow him to connect a new Custom Link to it
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

    // Method to create a new Link
    saveClick(event) {
        addLink({label: this.linkLabel, categoryID: this.CategoryId, url: this.linkURL})
            .then((result) => {
                console.log('LWC_06_CustomLinksModalAddURL.JS - saveClick().addLink() --> Success');
                this.close();
                const toastEventSuccess = Utils.showToast('Success', CL_Toast_Message_LinkCreated, 'success');
                this.dispatchEvent(toastEventSuccess);
            })
            .catch((error) => {
                this.error = error;
                    console.log('LWC_06_CustomLinksModalAddURL.JS - saveClick().addLink() --> Catch Error : ' + error);
            });
    }

    // Method to cancel the creation of the record
    cancelClick() {
        console.log('CANCELLED');
        this.close();
    }
}