public with sharing class AP01_DAO_CustomLinks {

    @AuraEnabled(cacheable=true)
    public static List<Custom_Link_Category__c> getCategoriesList() {
        try {
            return 
                [
                    SELECT Id, Name, Category_Label__c, User__c 
                    FROM Custom_Link_Category__c 
                    WHERE User__c =: UserInfo.getUserId()
                ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled(cacheable=true)
    public static List<Custom_Link__c> getLinksList() {
        try {
            return 
                [
                    SELECT Id, Link_Label__c, Link_URL__c, Link_Category__c
                    FROM Custom_Link__c 
                ];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}