// IMPORT LIGHTNING METHODS/ACTIONS
import { LightningElement, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

// IMPORT OBJECTS & FIELDS :
import Id from '@salesforce/user/Id';
import UserNameFIELD from '@salesforce/schema/User.Name';

// IMPORT MODALS :
import LWC_05_CustomLinksModalAddCategory from 'c/lWC_05_CustomLinksModalAddCategory';

// IMPORT CUSTOM LABELS :
import CL_HelpText_AddCategory from '@salesforce/label/c.CL_HelpText_AddCategory';
import CL_Text_Greetings from '@salesforce/label/c.CL_Text_Greetings';


export default class LWC_02_CustomLinksMain extends LightningElement {
    @track currentUserName;
    @track userId = Id;
    @track greeting;

    // List of the different labels we're gonna use on this LWC :
    labels = {
        CL_HelpText_AddCategory, 
        CL_Text_Greetings
    };

    // Method to get the user's username 
    @wire(getRecord, { recordId: Id, fields: [UserNameFIELD]}) 
    currentUserInfo({error, data}) {
        if (data) {
            this.currentUserName = data.fields.Name.value;
        } else if (error) {
            this.error = error ;
        }
    }

    // Method to split the firstname and the lastname to create the initials of the user
    get userInitials() {
        let initials = '';
        if (this.currentUserName) {
            const nameParts = this.currentUserName.split(' ');
            for (let i = 0; i < nameParts.length; i++) {
                initials += nameParts[i][0];
            }
        }
        return initials.toUpperCase();
    }

    // Method to create a new Category
    async addCat() {
        const result = await LWC_05_CustomLinksModalAddCategory.open({
            size: 'small',
            description: 'My Modal',
            content: 'oui',
            isUpdate: false,
        });
        console.log(result);
    }
}
