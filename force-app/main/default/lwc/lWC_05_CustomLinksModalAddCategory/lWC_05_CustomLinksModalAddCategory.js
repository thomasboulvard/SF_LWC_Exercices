// IMPORT COMPONENTS
import { LightningElement, wire, track } from 'lwc';
import { createRecord } from 'lightning/uiRecordApi';
import { getRecord } from 'lightning/uiRecordApi';
import { showToast } from 'c/utils'; // Import a utility method to show toasts
import addCategory from  '@salesforce/apex/AP02_CustomLinksHandler.addCategory';
import LightningModal from 'lightning/modal';

// IMPORT OBJECTS & FIELDS :
import CUSTOM_LINK_CATEGORY_OBJECT from '@salesforce/schema/Custom_Link_Category__c';
import CATEGORY_LABEL_FIELD from '@salesforce/schema/Custom_Link_Category__c.Category_Label__c';
import USER_FIELD from '@salesforce/schema/Custom_Link_Category__c.User__c'; // Import the User__c field
import Id from '@salesforce/user/Id';
import USERID_FIELD from '@salesforce/schema/User.Id';

// IMPORT CUSTOM LABELS :
import CL_Text_TitleCreateCategoryModal from '@salesforce/label/c.CL_Text_TitleCreateCategoryModal';
import CL_Text_CreateCategoryModal from '@salesforce/label/c.CL_Text_CreateCategoryModal';
import CL_Text_LabelCategoryModal from '@salesforce/label/c.CL_Text_LabelCategoryModal';
import CL_Button_Validate from '@salesforce/label/c.CL_Button_Validate';
import CL_Button_Cancel from '@salesforce/label/c.CL_Button_Cancel';
import CL_Toast_CategoryCreatedTitle from '@salesforce/label/c.CL_Toast_CategoryCreatedTitle';

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
    
    handleCategoryLabelChange(event) {
        this.categoryLabel = event.target.value;
    }

    // Validation event
    saveClick(event) {
        if (!this.currentUserId) {
            showToast('Error', 'User information not available.', 'error');
            return;
        } else {
            addCategory({ userID: this.currentUserId, label: this.categoryLabel })
                .then((result) => {
                    // showToast('Success', 'CL_Toast_CategoryCreatedTitle', 'success');
                    // return;
                })
                .catch((error) => {
                    this.error = error;
                    console.log('LWC_05_CustomLinksModalAddCategory.JS - saveClick().addCategory() --> Catch Error');
                });
        }

        // const fields = {};
        // fields[CATEGORY_LABEL_FIELD.fieldApiName] = this.categoryLabel;
        // fields[USER_FIELD.fieldApiName] = this.currentUserId; // Set the User__c field

        // const recordInput = {
        //     apiName: CUSTOM_LINK_CATEGORY_OBJECT.objectApiName,
        //     fields
        // };

        // createRecord(recordInput)
        //     .then(result => {
        //         showToast('Success', 'Category record created.', 'success');
        //     })
        //     .catch(error => {
        //         showToast('Error', error.body.message, 'error');
        //     });
    }

    // Cancelation event
    cancelClick(event) {
        console.log('fart noise');
    }
}