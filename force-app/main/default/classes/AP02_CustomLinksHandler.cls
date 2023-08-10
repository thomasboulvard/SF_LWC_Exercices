/*
  @description       : Handler for the project 'CustomLinks' which hold the Methods to create, update and delete Categories and Links
  @author            : Thomas Boulvard
  @group             : Boulvard Corp.
  @last modified on  : 03/08/2023
  @last modified by  : Thomas Boulvard
*/

public with sharing class AP02_CustomLinksHandler {
    
    // *************************************
    // *
    // * Call our SOQL requests from the DAO and make them AuraEnabled
    // *
    // *************************************

    @AuraEnabled(cacheable=true)
    public static List<Custom_Link_Category__c> getCategoriesListController() {
        AP01_DAO_CustomLinks dao = new AP01_DAO_CustomLinks();
        System.debug('liste Category : ' + dao.getCategoriesList());
        return dao.getCategoriesList();
    }
    
    
    @AuraEnabled(cacheable=true)
    public static List<Custom_Link__c> getLinksListController(Id categoryId) {
        AP01_DAO_CustomLinks dao = new AP01_DAO_CustomLinks();
        System.debug('liste Links : ' + dao.getLinksList(categoryId));
        return dao.getLinksList(categoryId);
    }

    // *************************************
    // *
    // * Create, Update, Delete CATEGORY
    // *
    // *************************************

    // Add Category method
    @AuraEnabled(cacheable=false)
    public static void addCategory(Id userID, String label) {
        try {
            Custom_Link_Category__c clc = new Custom_Link_Category__c();
            clc.User__c = userID;
            clc.Category_Label__c = label;

            
            insert clc;
        } catch (Exception e) {
            System.debug('AP02_CustomLinksHandler.addCategory() --> In Catch ' + e.getMessage());
        }
    }

    // Update Category method
    public void updateCategory(Id categoryID, String label) {
        try {
            Custom_Link_Category__c clcToUpdate = new Custom_Link_Category__c(Id = categoryID);
            clcToUpdate.Category_Label__c = label;

            update clcToUpdate;
        } catch (Exception e) {
            System.debug('AP02_CustomLinksHandler - An error occurred while UPDATING the CATEGORY : ' + e.getMessage());
        }
    }

    // Delete Category method
    public void deleteCategory(Id categoryID) {
        try {
            Custom_Link_Category__c clcToDelete = new Custom_Link_Category__c(Id = categoryID);

            delete clcToDelete;
        } catch (Exception e) {
            System.debug('AP02_CustomLinksHandler - An error occurred while DELETING the CATEGORY : ' + e.getMessage());
        }
    }


    // *************************************
    // *
    // * Create, Update, Delete LINKS
    // *
    // *************************************

    // Add link method
    @AuraEnabled(cacheable=false)
    public static void addLink(String label, String categoryID, String url) {
        try {
            Custom_Link__c cl = new Custom_Link__c();
            cl.Link_Label__c = label;
            cl.Link_Category__c = categoryID;
            cl.Link_URL__c = url;
    
            insert cl;
        } catch(Exception e) {
            System.debug('AP02_CustomLinksHandler - An error occurred while CREATING the LINK : ' + e.getMessage());
        }
    }

    // Update link method
    public void updateLink(Id linkID, String url, String categoryID, String linkLabel) {
        try {
            Custom_Link__c clToUpdate = new Custom_Link__c(Id = linkID);
            clToUpdate.Link_URL__c = url;
            clToUpdate.Link_Category__c = categoryID;
            clToUpdate.Link_Label__c = linkLabel;
    
            update clToUpdate;
        } catch(Exception e) {
            System.debug('AP02_CustomLinksHandler - An error occurred while UPDATING the LINK : ' + e.getMessage());
        }
    }

    // Delete link method
    public void deleteLink(Id idLink) {
        try {
            Custom_Link__c clToDelete = new Custom_Link__c(Id = idLink);

            delete clToDelete;
        } catch (Exception e) {
            System.debug('AP02_CustomLinksHandler - An error occurred while DELETING the LINK : ' + e.getMessage());
        }
    }

}