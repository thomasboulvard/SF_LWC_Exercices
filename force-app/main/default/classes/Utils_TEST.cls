@isTest
public with sharing class Utils_TEST {
    
    public static Account createAccount(String accName, String accType, String accNumber) {
        Account accTest = new Account();
        accTest.Name = accName;
        accTest.Type = accType;
        accTest.AccountNumber = accNumber;

        return accTest;
    }

    public static Custom_Link_Category__c createCustomLinkCategory(String userID, String catLabel) {
        Custom_Link_Category__c catTest = new Custom_Link_Category__c();
        catTest.User__c = userID;
        catTest.Category_Label__c = catLabel;

        return catTest;
    }

    public static Custom_Link__c createCustomLink(String categoryID, String linkLabel, String linkURL) {
        Custom_Link__c linkTest = new Custom_Link__c();
        linkTest.Link_Category__c = categoryID;
        linkTest.Link_Label__c = linkLabel;
        linkTest.Link_URL__c = linkURL;

        return linkTest;
    }

    public static User createSysAdminUser(String firstName, String lastName, String email) {
        User newAdminUser = new User();
        newAdminUser.FirstName = firstName;
        newAdminUser.LastName = lastName;
        newAdminUser.Email = email;
        newAdminUser.Username = email;
        newAdminUser.Alias = 'admin';
        newAdminUser.TimeZoneSidKey = 'Europe/Paris';
        newAdminUser.LocaleSidKey = 'fr_FR_EURO';
        newAdminUser.EmailEncodingKey = 'UTF-8';
        newAdminUser.LanguageLocaleKey = 'en_US';

        String profileName = Label.CL_Profile_SysAdmin;
        Profile profileId = [SELECT Id FROM Profile WHERE Name =: profileName LIMIT 1];

        newAdminUser.ProfileId = profileId.Id;
        return newAdminUser;
    }
}