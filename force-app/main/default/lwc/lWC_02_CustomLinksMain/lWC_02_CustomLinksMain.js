import { LightningElement, wire, track } from 'lwc';
import Id from '@salesforce/user/Id';
import { getRecord } from 'lightning/uiRecordApi';
import UserNameFIELD from '@salesforce/schema/User.Name';

export default class LWC_02_CustomLinksMain extends LightningElement {
    @track currentUserName;
    @track userId = Id;
    @track greeting;

    // Get the user language to adapt the greeting accordingly
    connectedCallback() {
        const userLang = navigator.language || navigator.userLanguage;
        console.log('USer language : ' + userLang);
        if(userLang.startsWith('en')) {
            this.greeting = 'Hello';
        } else if (userLang.startsWith('fr')) {
            this.greeting = 'Bonjour';
        } else if (userLang.startsWith('es')) {
            this.greeting = 'Hola';
        } else {
            this.greeting = 'Hello';
        }
    }
    

    // Get the username to display it on our LWC
    @wire(getRecord, { recordId: Id, fields: [UserNameFIELD]}) 
    currentUserInfo({error, data}) {
        if (data) {
            this.currentUserName = data.fields.Name.value;
        } else if (error) {
            this.error = error ;
        }
    }


    // If there is no profile pic, the function below split the firstname and the lastname to create the initials of the user
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
}
