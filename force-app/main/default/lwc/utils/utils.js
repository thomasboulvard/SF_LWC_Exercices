import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Utils {

    static showToast(title, message, variant) {
        return new ShowToastEvent({
            title: title,
            message: message,
            variant: variant || 'success',
        });
    }
}