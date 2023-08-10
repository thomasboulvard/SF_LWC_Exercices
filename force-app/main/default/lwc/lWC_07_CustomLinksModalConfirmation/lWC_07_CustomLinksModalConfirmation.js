// IMPORT LIGHTNING METHODS/ACTIONS
import { LightningElement, api } from 'lwc';
import LightningModal from 'lightning/modal';

// IMPORT METHODS
import Utils from 'c/utils';

// IMPORT CUSTOM LABELS :
import CL_Button_Cancel from '@salesforce/label/c.CL_Button_Cancel';
import CL_Button_Validate from '@salesforce/label/c.CL_Button_Validate';
import CL_Text_TitleDeleteLinkModal from '@salesforce/label/c.CL_Text_TitleDeleteLinkModal';
import CL_Text_TitleDeleteCategoryModal from '@salesforce/label/c.CL_Text_TitleDeleteCategoryModal';
import CL_Text_ConfirmationDeletion from '@salesforce/label/c.CL_Text_ConfirmationDeletion';
import CL_Button_Delete from '@salesforce/label/c.CL_Button_Delete';

export default class LWC_07_CustomLinksModalConfirmation extends LightningModal {

    // List of the different labels we're gonna use on this LWC :
    labels = {
        CL_Button_Cancel,
        CL_Button_Validate,
        CL_Text_TitleDeleteLinkModal,
        CL_Text_TitleDeleteCategoryModal,
        CL_Text_ConfirmationDeletion,
        CL_Button_Delete,
    };

    // Method to cancel the Deletion of the record
    cancelClick() {
        console.log('CANCELED');
        this.close();
    }
}