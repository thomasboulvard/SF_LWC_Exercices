// IMPORT LIGHTNING METHODS/ACTIONS
import { LightningElement, wire, track, api } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import LightningModal from 'lightning/modal';

// IMPORT METHODS
import addCategory from  '@salesforce/apex/AP02_CustomLinksHandler.addCategory';
import updateCategory from '@salesforce/apex/AP02_CustomLinksHandler.updateCategory';
import Utils from 'c/utils';

// IMPORT OBJECTS & FIELDS :
import CATEGORY_LABEL_FIELD from '@salesforce/schema/Custom_Link_Category__c.Category_Label__c';
import Id from '@salesforce/user/Id';
import USERID_FIELD from '@salesforce/schema/User.Id';

// IMPORT CUSTOM LABELS :
import CL_Text_TitleCreateCategoryModal from '@salesforce/label/c.CL_Text_TitleCreateCategoryModal';
import CL_Text_TitleUpdateCategoryModal from '@salesforce/label/c.CL_Text_TitleUpdateCategoryModal';
import CL_Text_CreateCategoryModal from '@salesforce/label/c.CL_Text_CreateCategoryModal';
import CL_Text_UpdateCategoryModal from '@salesforce/label/c.CL_Text_UpdateCategoryModal';
import CL_Text_LabelCategoryModal from '@salesforce/label/c.CL_Text_LabelCategoryModal';
import CL_Button_Validate from '@salesforce/label/c.CL_Button_Validate';
import CL_Button_Cancel from '@salesforce/label/c.CL_Button_Cancel';
import CL_Toast_Title_Success from '@salesforce/label/c.CL_Toast_Title_Success';
import CL_Toast_Title_Error from '@salesforce/label/c.CL_Toast_Title_Error';
import CL_Toast_Message_CategoryCreated from '@salesforce/label/c.CL_Toast_Message_CategoryCreated';
import CL_Toast_Message_CategoryUpdated from '@salesforce/label/c.CL_Toast_Message_CategoryUpdated';
import CL_Toast_Message_Error from '@salesforce/label/c.CL_Toast_Message_Error';



export default class LWC_05_CustomLinksModalAddCategory extends LightningModal {
    @track userId = Id;
    @track currentUserId; // Variable to store the current user's Id
    @api recordId; // The ID of the existing Category is passed through this variable
    @api isUpdate; // Boolean which allow us to display the modal based on the creation/update of a Category
    categoryLabel = '';
    
    fields = {
        CATEGORY_LABEL_FIELD
    };

    // List of the different labels we're gonna use on this LWC :
    labels = {
        CL_Text_TitleCreateCategoryModal,
        CL_Text_TitleUpdateCategoryModal,
        CL_Text_CreateCategoryModal,
        CL_Text_UpdateCategoryModal,
        CL_Text_LabelCategoryModal,
        CL_Button_Validate,
        CL_Button_Cancel,
        CL_Toast_Title_Success,
        CL_Toast_Title_Error,
        CL_Toast_Message_Error,
        CL_Toast_Message_CategoryCreated,
        CL_Toast_Message_CategoryUpdated,
        CL_Toast_Message_Error,
    };

    @wire(getRecord, { recordId: Id, fields: [USERID_FIELD]}) 
        currentUserInfo({error, data}) {
            if (data) {
                this.currentUserId = data.fields.Id.value;
            } else if (error) {
                this.error = error ;
            }
        }
    
    // Method to get the value entered in the input by the user to store it in a variable
    handleCategoryLabelChange(event) {
        this.categoryLabel = event.target.value;
    }


    // -----------------------------------
    // CREATE CATEGORY METHOD
    // -----------------------------------
    
    // Validation event
    saveClick(event) {
        if (!this.currentUserId) {
            const toastEventError = Utils.showToast(CL_Toast_Title_Error, CL_Toast_Message_Error, 'error');
            this.dispatchEvent(toastEventError);
        } else {
            addCategory({ userID: this.currentUserId, label: this.categoryLabel })
                .then((result) => {
                    this.close();
                    const toastEventSuccess = Utils.showToast(CL_Toast_Title_Success, CL_Toast_Message_CategoryCreated, 'success');
                    this.dispatchEvent(toastEventSuccess);
                })
                .catch((error) => {
                    this.error = error;
                    console.log('LWC_05_CustomLinksModalAddCategory.saveClick().addCategory() --> Catch Error : ' + error);
                });
        }
    }


    // -----------------------------------
    // UPDATE CATEGORY METHOD
    // -----------------------------------

    // Validation event
    updateClick(event) {
        updateCategory({categoryID: this.recordId, label: this.categoryLabel})
        .then((result) => {
            this.close(result);
            const toastEventSuccess = Utils.showToast(CL_Toast_Title_Success, CL_Toast_Message_CategoryUpdated, 'success');
            this.dispatchEvent(toastEventSuccess);
        })
        .catch((error) => {
            this.error = error;
            console.log('LWC_05_CustomLinksModalAddCategory.updateClick().updateCategory() --> Catch error : ' + error);
        });
    }


    // -----------------------------------
    // CANCEL METHOD
    // -----------------------------------

    // Cancelation event
    cancelClick(event) {
        console.log('Action was canceled');
        this.close();
    }
}