import { LightningElement, api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class LWC_07_CustomLinksModalConfirmation extends LightningElement {
    @api validationMessage;

    handleOkay() {
        this.close('okay');
    }
}