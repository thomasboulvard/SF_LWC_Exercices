/*
  @description       : DAO for the project 'CustomLinks' which hold all of ours SOQL requests
  @author            : Thomas Boulvard
  @group             : Boulvard Corp.
  @last modified on  : 03/08/2023
  @last modified by  : Thomas Boulvard
*/

public with sharing class AP01_DAO_CustomLinks {

    public List<Custom_Link_Category__c> getCategoriesList() {
        return 
            [
                SELECT Id, Name, Category_Label__c, User__c 
                FROM Custom_Link_Category__c 
                WHERE User__c =: UserInfo.getUserId()
            ];
    }

    public List<Custom_Link__c> getLinksList() {
        return 
            [
                SELECT Id, Link_Label__c, Link_URL__c, Link_Category__c
                FROM Custom_Link__c 
            ];
    }
}