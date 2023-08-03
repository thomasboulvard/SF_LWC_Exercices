/*
  @description       : Test class for the Class 'AP01_DAO_CustomLinks'
  @author            : Thomas Boulvard
  @group             : Boulvard Corp.
  @last modified on  : 03/08/2023
  @last modified by  : Thomas Boulvard
  @coverage          : 100%
*/

@isTest
public with sharing class AP01_DAO_CustomLinks_TEST {

    @TestSetup
    static void makeData(){
        // Create a user
        User user = Utils_TEST.createSysAdminUser('Alex', 'Terieur', 'alexterieur@example.com');
        insert user;

        // Create a Category
        Custom_Link_Category__c cat = Utils_TEST.createCustomLinkCategory(user.Id, 'Test label');
        insert cat;

        // Create a Link
        String url = Label.CL_HomePageURL;
        Custom_Link__c link = Utils_TEST.createCustomLink(cat.Id, 'Link label', url);
        insert link;
    }

    @isTest
    public static void getCategoriesListTEST() {
        User user = [SELECT Id FROM User WHERE Email = 'alexterieur@example.com'];
        Custom_Link_Category__c category = [SELECT Id FROM Custom_Link_Category__c WHERE Category_Label__c = 'Test label'];

        Test.startTest();

        AP01_DAO_CustomLinks handler = new AP01_DAO_CustomLinks();
        handler.getCategoriesList();

        List<Custom_Link_Category__c> categories = 
            [
                SELECT Id, User__c, Category_Label__c
                FROM Custom_Link_Category__c
                WHERE Id =: category.Id
            ];
        
        System.assertEquals(1, categories.size(), 'Category should be created successfully');
        Custom_Link_Category__c createdCategory = categories[0];
        System.assertEquals(user.Id, createdCategory.User__c, 'The Category should be assigned to the user Alex');
        System.assertEquals('Test label', createdCategory.Category_Label__c, 'The label should be New label and not Test label');

        Test.stopTest();
    }

    @isTest
    public static void getLinksListTEST() {
        User user = [SELECT Id FROM User WHERE Email = 'alexterieur@example.com'];
        Custom_Link_Category__c category = [SELECT Id FROM Custom_Link_Category__c WHERE Category_Label__c = 'Test label'];
        Custom_Link__c link = [SELECT Id FROM Custom_Link__c WHERE Link_Label__c = 'Link label'];
        String url = Label.CL_HomePageURL;

        Test.startTest();

        AP01_DAO_CustomLinks handler = new AP01_DAO_CustomLinks();
        handler.getLinksList();

        List<Custom_Link__c> links =
            [
                SELECT Id, Link_Label__c, Link_Category__c, Link_URL__c
                FROM Custom_Link__c
                WHERE Link_Category__c =: category.Id
            ];
        
        System.assertEquals(1, links.size(), 'The custom Link should be created successfully');
        Custom_Link__c createdlink = links[0];
        System.assertEquals(url, createdlink.Link_URL__c, 'The URL of the link should be the HomePage of Salesforce');
        System.assertEquals(category.Id, createdlink.Link_Category__c, 'The link should be linked to a Category');
    
        Test.stopTest();
    }
}