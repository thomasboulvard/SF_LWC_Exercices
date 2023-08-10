// IMPORT LIGHTNING METHODS/ACTIONS
import { LightningElement, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import LightningModal from 'lightning/modal';

// IMPORT METHODS
import addCategory from  '@salesforce/apex/AP02_CustomLinksHandler.addCategory';
import Utils from 'c/utils';

// IMPORT OBJECTS & FIELDS :
import CUSTOM_LINK_CATEGORY_OBJECT from '@salesforce/schema/Custom_Link_Category__c';
import CATEGORY_LABEL_FIELD from '@salesforce/schema/Custom_Link_Category__c.Category_Label__c';
import USER_FIELD from '@salesforce/schema/Custom_Link_Category__c.User__c';
import Id from '@salesforce/user/Id';
import USERID_FIELD from '@salesforce/schema/User.Id';

// IMPORT CUSTOM LABELS :
import CL_Text_TitleCreateCategoryModal from '@salesforce/label/c.CL_Text_TitleCreateCategoryModal';
import CL_Text_CreateCategoryModal from '@salesforce/label/c.CL_Text_CreateCategoryModal';
import CL_Text_LabelCategoryModal from '@salesforce/label/c.CL_Text_LabelCategoryModal';
import CL_Button_Validate from '@salesforce/label/c.CL_Button_Validate';
import CL_Button_Cancel from '@salesforce/label/c.CL_Button_Cancel';
import CL_Toast_Message_CategoryCreated from '@salesforce/label/c.CL_Toast_Message_CategoryCreated';
import CL_Toast_Title_Success from '@salesforce/label/c.CL_Toast_Title_Success';
import CL_Toast_Title_Error from '@salesforce/label/c.CL_Toast_Title_Error';



export default class LWC_05_CustomLinksModalAddCategory extends LightningModal {
    @track userId = Id;
    @track currentUserId; // Variable to store the current user's Id
    categoryLabel = '';
    
    fields = {
        CATEGORY_LABEL_FIELD
    };

    labels = {
        CL_Text_TitleCreateCategoryModal,
        CL_Text_CreateCategoryModal,
        CL_Text_LabelCategoryModal,
        CL_Button_Validate,
        CL_Button_Cancel,
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

    // Validation event
    saveClick(event) {
        if (!this.currentUserId) {
            const toastEventError = Utils.showToast(CL_Toast_Title_Error, CL_Toast_Message_CategoryCreated, 'error');
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
                    console.log('LWC_05_CustomLinksModalAddCategory.JS - saveClick().addCategory() --> Catch Error : ' + error);
                });
        }
    }

    // Cancelation event
    cancelClick(event) {
        console.log('Action was canceled');
        this.close();
    }
}