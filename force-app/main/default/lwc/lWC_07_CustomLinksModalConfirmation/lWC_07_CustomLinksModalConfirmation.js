// IMPORT LIGHTNING METHODS/ACTIONS
import { LightningElement, api } from 'lwc';
import LightningModal from 'lightning/modal';

// IMPORT METHODS
import Utils from 'c/utils';
import deleteCategory from '@salesforce/apex/AP02_CustomLinksHandler.deleteCategory';
import deleteLink from '@salesforce/apex/AP02_CustomLinksHandler.deleteLink';

// IMPORT CUSTOM LABELS :
import CL_Button_Cancel from '@salesforce/label/c.CL_Button_Cancel';
import CL_Button_Validate from '@salesforce/label/c.CL_Button_Validate';
import CL_Text_TitleDeleteLinkModal from '@salesforce/label/c.CL_Text_TitleDeleteLinkModal';
import CL_Text_TitleDeleteCategoryModal from '@salesforce/label/c.CL_Text_TitleDeleteCategoryModal';
import CL_Text_ConfirmationDeletion from '@salesforce/label/c.CL_Text_ConfirmationDeletion';
import CL_Button_Delete from '@salesforce/label/c.CL_Button_Delete';
import CL_Toast_Message_CategoryDeleted from '@salesforce/label/c.CL_Toast_Message_CategoryDeleted';
import CL_Toast_Message_LinkDeleted from '@salesforce/label/c.CL_Toast_Message_LinkDeleted';
import CL_Toast_Title_Error from '@salesforce/label/c.CL_Toast_Title_Error';
import CL_Toast_Title_Success from '@salesforce/label/c.CL_Toast_Title_Success';
import CL_Toast_Message_Error from '@salesforce/label/c.CL_Toast_Message_Error';

export default class LWC_07_CustomLinksModalConfirmation extends LightningModal {
    
    @api recordId; // The ID of the Link OR Category is passed through this variable

    // List of the different labels we're gonna use on this LWC :
    labels = {
        CL_Button_Cancel,
        CL_Button_Validate,
        CL_Text_TitleDeleteLinkModal,
        CL_Text_TitleDeleteCategoryModal,
        CL_Text_ConfirmationDeletion,
        CL_Button_Delete,
        CL_Toast_Message_CategoryDeleted,
        CL_Toast_Message_LinkDeleted,
        CL_Toast_Title_Error,
        CL_Toast_Title_Success,
        CL_Toast_Message_Error,
    };


    // Function to get the object type from a record ID based on the prefix (Link or Category ?)
    getSObjectType(recordId) {
        const prefixMap = {
            'a001': 'Account',  
            'a007': 'Custom_Link_Category__c',
            'a017': 'Custom_Link__c',
            // Add more prefixes and corresponding object names as needed
        };

    const prefix = recordId.substring(0, 4);
    return prefixMap[prefix] || 'Unknown'; // Return object type or 'Unknown' if not found
    };


    // Method to delete the record (either a Category or a Link)
    deleteClick(event) {

        const objectType = this.getSObjectType(this.recordId);

        // If the record is a Category, the method will call the method "deleteCategory" :
        if (objectType == 'Custom_Link_Category__c') {
            //console.log('LWC_07_CustomLinksModalConfirmation.JS - deleteClick().deleteCategory() --> Success : '+ this.recordId);
            deleteCategory({categoryID : this.recordId})
            .then((result) => {
                //console.log('LWC_07_CustomLinksModalConfirmation.JS - deleteClick().deleteCategory() --> Success');
                this.close(result);
                const toastEventSuccess = Utils.showToast(CL_Toast_Title_Success, CL_Toast_Message_CategoryDeleted, 'success');
                this.dispatchEvent(toastEventSuccess);
            })
            .catch((error) => {
                this.error = error;
                    console.log('LWC_07_CustomLinksModalConfirmation.JS - deleteClick().deleteCategory() --> Catch Error : ' + error);
            });
        
        // If the record is a Link, the method will call the method "deleteLink" :
        } else if (objectType == 'Custom_Link__c') {
            deleteLink({idLink : this.recordId})
            .then((result) => {
                this.close(result);
                const toastEventSuccess = Utils.showToast(CL_Toast_Title_Success, CL_Toast_Message_LinkDeleted, 'success');
                this.dispatchEvent(toastEventSuccess);
            })
            .catch((error) => {
                this.error = error;
                    console.log('LWC_07_CustomLinksModalConfirmation.JS - deleteClick().deleteLink() --> Catch Error : ' + error);
            });
        
        // If the record is not a Link or a Category, return error" :
        } else {
            this.close();
            const toastEventError = Utils.showToast(CL_Toast_Title_Error, CL_Toast_Message_Error, 'error');
            this.dispatchEvent(toastEventError);
            console.log('LWC_07_CustomLinksModalConfirmation.JS - deleteClick() FAILED');
        }
    }

    // Method to cancel the Deletion of the record
    cancelClick() {
        console.log('CANCELED');
        this.close();
    }
}