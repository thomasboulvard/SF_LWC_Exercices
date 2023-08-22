// IMPORT LIGHTNING METHODS/ACTIONS
import { LightningElement, api, track, wire } from 'lwc';

// IMPORT MODALS :
import LWC_06_CustomLinksModalAddURL from 'c/lWC_06_CustomLinksModalAddURL';
import LWC_07_CustomLinksModalConfirmation from 'c/lWC_07_CustomLinksModalConfirmation';
import LWC_05_CustomLinksModalAddCategory from 'c/lWC_05_CustomLinksModalAddCategory';

// IMPORT METHODS
import getCategoriesListController from '@salesforce/apex/AP02_CustomLinksHandler.getCategoriesListController';

// IMPORT CUSTOM LABELS :
import CL_HelpText_AddLink from '@salesforce/label/c.CL_HelpText_AddLink';
import CL_HelpText_UpdateCategory from '@salesforce/label/c.CL_HelpText_UpdateCategory';
import CL_HelpText_DeleteCategory from '@salesforce/label/c.CL_HelpText_DeleteCategory';


export default class LWC_03_CustomLinksCategory extends LightningElement {
    @track categories;
    
    // List of the different labels we're gonna use on this LWC :
    labels = {
        CL_HelpText_AddLink,
        CL_HelpText_UpdateCategory,
        CL_HelpText_DeleteCategory
    };
    
    @wire(getCategoriesListController)
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


    // -----------------------------------
    // CREATE LINK METHOD
    // -----------------------------------

    // Method to create a new Link
    async addLink() {
        const result = await LWC_06_CustomLinksModalAddURL.open({
            size: 'small',
            description: 'My Modal',
            content : 'oui',
            isUpdate: false,
        });
        this.template.querySelector('c-l-W-C_-04_-Custom-Links-U-R-L').updateAfterSave(result);
        console.log(JSON.stringify(result));
    }




    // -----------------------------------
    // UPDATE CATEGORY METHODS
    // -----------------------------------

    // Retrieve the Id of our Category to pass it to the method "updateCat" which will pass it to the LWC "LWC_05_CustomLinksModalAddCategory"
    handleUpdateCategory(event) {
        const categoryId = event.currentTarget.dataset.categoryId;
        this.updateCat(categoryId);
    }

    // Method to Update the Category
    async updateCat(categoryId) {
        console.log('LWC_03_CustomLinksCategory.updateCat() - Updating Category with ID : ' + categoryId);
        const result = await LWC_05_CustomLinksModalAddCategory.open({
            size: 'small',
            description: 'My Modal',
            content: 'oui',
            recordId: categoryId,
            isUpdate: true,
        });
        this.categories = result;
        console.log(JSON.stringify(result));
    }


    // -----------------------------------
    // DELETE CATEGORY METHODS
    // -----------------------------------

    // Retrieve the Id of our Category to pass it to the method "deleteCategory" which will pass it to the LWC "LWC_07_CustomLinksModalConfirmation"
    handleDeleteCategory(event) {
        const categoryId = event.currentTarget.dataset.categoryId;
        this.deleteCategory(categoryId);
    }

    // Method to delete the Category
    async deleteCategory(categoryId) {
        console.log('LWC_03_CustomLinksCategory.deleteCategory() - Deleting category with ID:', categoryId);
        const result = await LWC_07_CustomLinksModalConfirmation.open({
            size: 'small',
            description: 'My Modal',
            content: 'oui',
            recordId: categoryId,
        });
        this.categories = result;
        console.log(JSON.stringify(result));
    }
}