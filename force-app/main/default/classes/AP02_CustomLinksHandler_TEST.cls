/*
  @description       : Test class for the Class 'AP02_CustomLinksHandler'
  @author            : Thomas Boulvard
  @group             : Boulvard Corp.
  @last modified on  : 03/08/2023
  @last modified by  : Thomas Boulvard
  @coverage          : 86%
*/

@isTest
public with sharing class AP02_CustomLinksHandler_TEST {

    // *************************************
    // *
    // * TEST SETUP
    // *
    // *************************************

    @TestSetup
    static void makeData(){
        // Create a user
        User user = Utils_TEST.createSysAdminUser('Alex', 'Terieur', 'alexterieur@example.com');
        insert user;

        Custom_Link_Category__c clc = Utils_TEST.createCustomLinkCategory(user.Id, 'label clc');
        insert clc;
    }
    
    // *************************************
    // *
    // * TEST of calls to the DAO class
    // *
    // *************************************

    @isTest
    public static void callDaoTEST() {
        Custom_Link_Category__c clc = [SELECT Id FROM Custom_Link_Category__c WHERE Category_Label__c = 'label clc'];
        AP02_CustomLinksHandler.getCategoriesListController();
        AP02_CustomLinksHandler.getLinksListController(clc.Id);
    }


    // *************************************
    // *
    // * TEST of the methods CREATE, UPDATE, DELETE of CATEGORIES
    // *
    // *************************************

    // Add Method
    @isTest
    public static void addCategoryTEST() {
        User user = [SELECT Id FROM User WHERE Email = 'alexterieur@example.com'];
        Id userId = user.Id;
        String categoryLabel = 'Test category';

        Test.startTest();

        AP02_CustomLinksHandler handler = new AP02_CustomLinksHandler();
        handler.addCategory(userId, categoryLabel);

        List<Custom_Link_Category__c> categories =
            [
                SELECT Id, User__c, Category_Label__c
                FROM Custom_Link_Category__c
                WHERE User__c =: userId
                AND Category_Label__c =: categoryLabel
            ];

        System.assertEquals(1, categories.size(), 'Category should be created successfully');
        Custom_Link_Category__c createdCategory = categories[0];
        System.assertEquals(userId, createdCategory.User__c, 'The Category should be assigned to the user Alex');
        System.assertEquals(categoryLabel, createdCategory.Category_Label__c, 'The label should be Test Category');

        Test.stopTest();
    }

    // Update Method
    @isTest
    public static void updateCategoryTEST() {
        User user = [SELECT Id FROM User WHERE Email = 'alexterieur@example.com'];
        String userId = user.Id;
        Custom_Link_Category__c cat = Utils_TEST.createCustomLinkCategory(userId, 'Test label');
        insert cat;
        String catId = cat.Id;
        String newLabel = 'New label';

        Test.startTest();

        AP02_CustomLinksHandler handler = new AP02_CustomLinksHandler();
        handler.updateCategory(catId, newLabel);

        List<Custom_Link_Category__c> categories = 
            [
                SELECT Id, User__c, Category_Label__c
                FROM Custom_Link_Category__c
                WHERE Id =: catId
            ];
        
        System.assertEquals(1, categories.size(), 'Category should be created successfully');
        Custom_Link_Category__c createdCategory = categories[0];
        System.assertEquals(userId, createdCategory.User__c, 'The Category should be assigned to the user Alex');
        System.assertEquals(newLabel, createdCategory.Category_Label__c, 'The label should be New label and not Test label');

        Test.stopTest();
    }

    // Delete Method
    @isTest
    public static void deleteCategoryTEST() {
        User user = [SELECT Id FROM User WHERE Email = 'alexterieur@example.com'];
        String userId = user.Id;
        Custom_Link_Category__c cat = Utils_TEST.createCustomLinkCategory(userId, 'Test label');
        insert cat;

        Test.startTest();

        AP02_CustomLinksHandler handler = new AP02_CustomLinksHandler();
        handler.deleteCategory(cat.Id);

        List<Custom_Link_Category__c> categories = 
            [
                SELECT Id, User__c, Category_Label__c
                FROM Custom_Link_Category__c
                WHERE Id =: cat.Id
            ];

        System.assertEquals(0, categories.size(), 'Category should be deleted successfully');

        Test.stopTest();
    }


    // *************************************
    // *
    // * TEST of the methods CREATE, UPDATE, DELETE of LINKS
    // *
    // *************************************

    // Add Method
    @isTest
    public static void addLinkTEST() {
        User user = [SELECT Id FROM User WHERE Email = 'alexterieur@example.com'];
        String userId = user.Id;
        Custom_Link_Category__c cat = Utils_TEST.createCustomLinkCategory(userId, 'Category label');
        insert cat;
        String catId = cat.Id;
        String url = Label.CL_HomePageURL;
        //Custom_Link__c link = Utils_TEST.createCustomLink(catId, 'Link label', url);

        Test.startTest();

        AP02_CustomLinksHandler handler = new AP02_CustomLinksHandler();
        handler.addLink('Link label', catId, url);

        List<Custom_Link__c> links =
            [
                SELECT Id, Link_Label__c, Link_Category__c, Link_URL__c
                FROM Custom_Link__c
                WHERE Link_Category__c =: catId
            ];

        System.assertEquals(1, links.size(), 'The custom Link should be created successfully');
        Custom_Link__c createdlink = links[0];
        System.assertEquals(url, createdlink.Link_URL__c, 'The URL of the link should be the HomePage of Salesforce');
        System.assertEquals(catId, createdlink.Link_Category__c, 'The link should be linked to a Category');

        Test.stopTest();
    }

    // Update Method
    @isTest
    public static void updateLinkTEST() {
        User user = [SELECT Id FROM User WHERE Email = 'alexterieur@example.com'];
        String userId = user.Id;
        Custom_Link_Category__c cat = Utils_TEST.createCustomLinkCategory(userId, 'Category label');
        insert cat;
        String catId = cat.Id;
        String url = Label.CL_HomePageURL;
        Custom_Link__c link = Utils_TEST.createCustomLink(catId, 'Link label 1', url);
        insert link;

        Test.startTest();

        AP02_CustomLinksHandler handler = new AP02_CustomLinksHandler();
        handler.updateLink(link.Id, 'https://www.google.com', catId, 'Link label 2');

        List<Custom_Link__c> links =
            [
                SELECT Id, Link_Label__c, Link_Category__c, Link_URL__c
                FROM Custom_Link__c
                WHERE Id =: link.Id
            ];

        System.assertEquals(1, links.size(), 'The custom Link should be created successfully');
        Custom_Link__c createdlink = links[0];
        System.assertEquals('https://www.google.com', createdlink.Link_URL__c, 'The URL of the link should not be the HomePage of Salesforce anymore');
        System.assertEquals('Link label 2', createdlink.Link_Label__c, 'The label of the Link should have been modified');
    
        Test.stopTest();
    }

    // Delete Method
    @isTest
    public static void deleteLinkTEST() {
        User user = [SELECT Id FROM User WHERE Email = 'alexterieur@example.com'];
        String userId = user.Id;
        Custom_Link_Category__c cat = Utils_TEST.createCustomLinkCategory(userId, 'Category label');
        insert cat;
        String catId = cat.Id;
        String url = Label.CL_HomePageURL;
        Custom_Link__c link = Utils_TEST.createCustomLink(catId, 'Link label', url);
        insert link;

        Test.startTest();

        AP02_CustomLinksHandler handler = new AP02_CustomLinksHandler();
        handler.deleteLink(link.Id);

        List<Custom_Link__c> links =
            [
                SELECT Id, Link_Label__c, Link_Category__c, Link_URL__c
                FROM Custom_Link__c
                WHERE Id =: link.Id
            ];

        System.assertEquals(0, links.size(), 'The custom Link should be deleted successfully');

        Test.stopTest();
    }

}