import { LightningElement, api, wire } from 'lwc';
import getCategoriesListController from '@salesforce/apex/AP02_CustomLinksHandler.getCategoriesListController';
import CL_HelpText_AddLink from '@salesforce/label/c.CL_HelpText_AddLink';
import CL_HelpText_UpdateCategory from '@salesforce/label/c.CL_HelpText_UpdateCategory';
import CL_HelpText_DeleteCategory from '@salesforce/label/c.CL_HelpText_DeleteCategory';

export default class LWC_03_CustomLinksCategory extends LightningElement {
    @wire(getCategoriesListController)
    categories;
    labels = {
        CL_HelpText_AddLink,
        CL_HelpText_UpdateCategory,
        CL_HelpText_DeleteCategory
    };

    connectedCallback() {
        // Make a direct Apex call and handle any errors using .catch()
        getCategoriesListController()
            .then(result => {
                console.log('Categori is working' + result);
                this.categories = result;
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
                this.categories = []; // Set categories to an empty array or handle the error appropriately
            });
    }
}