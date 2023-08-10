// IMPORT LIGHTNING METHODS/ACTIONS
import { LightningElement, api, wire } from 'lwc';

// IMPORT MODALS :
import LWC_06_CustomLinksModalAddURL from 'c/lWC_06_CustomLinksModalAddURL';
import LWC_07_CustomLinksModalConfirmation from 'c/lWC_07_CustomLinksModalConfirmation';

// IMPORT METHODS
import getCategoriesListController from '@salesforce/apex/AP02_CustomLinksHandler.getCategoriesListController';

// IMPORT CUSTOM LABELS :
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
                console.log('Categorie is working' + result);
                this.categories = result;
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
                this.categories = []; // Set categories to an empty array or handle the error appropriately
            });
    }

    // Method to create a new Link
    async addLink() {
        const result = await LWC_06_CustomLinksModalAddURL.open({
            size: 'small',
            description: 'My Modal',
            content : 'oui',
        });
        console.log(result);
    }

    // Method to delete the Category
    async deleteCategory() {
        const result = await LWC_07_CustomLinksModalConfirmation.open({
            size: 'small',
            description: 'My Modal',
            content : 'oui',
        });
        console.log(result);
    }
}