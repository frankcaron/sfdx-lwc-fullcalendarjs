global class parseEmail implements Messaging.InboundEmailHandler {
    
    global Messaging.InboundEmailResult handleInboundEmail(Messaging.InboundEmail email, Messaging.InboundEnvelope envelope) {
        
        Messaging.InboundEmailResult result = new Messaging.InboundEmailresult();    
        
        System.debug('=====Email Parser=====');
        
        String contentSubject = email.subject;
        String contentSender = email.fromAddress;
        String contentBody = email.htmlBody;
        
        System.debug('|| Email HTML Body Raw: ' + contentBody);
        System.debug('|| Email HTML Subject: ' + contentSubject);
        System.debug('|| Email HTML Sender: ' + contentSender);
        
        // For decisioning later
        String emailType = 'None'; // Approval, Preview
        
        // Find the Creative Name
        
        Matcher creativeIdRegex = Pattern.compile('CR-(\\d*) .* (\\w*)').matcher(contentSubject);
        Boolean foundCreativeId = creativeIdRegex.find();
        String creativeId = '';
        String creativeStatus = '';
        
        system.debug('|| Creative ID Regex result: ' + foundCreativeId);
        
        if (foundCreativeId == true) {
            creativeId = 'CR-' + creativeIdRegex.group(1);
            creativeStatus = creativeIdRegex.group(2);
        	system.debug('|| Creative ID Regex ID: ' + creativeId);
        }
        
        // Find the Web Page View Link
        
        Matcher viewAsRegex = Pattern.compile('To view this email as a web page, go.*<a href=["](.*[?][q][s][=](\\w*))["].*>.*<\\/a>').matcher(contentBody);
        Boolean foundWebPageLink = viewAsRegex.find();
        String webPageLinkURL = '';
        String webPageGUID = '';
        
        system.debug('|| Web Page Regex result: ' + foundWebPageLink);
        
        if (foundWebPageLink == true) {
            webPageLinkURL = viewAsRegex.group(1);
            webPageGUID = viewAsRegex.group(2);
        	system.debug('|| Web Page Regex result: ' + webPageLinkURL);
            system.debug('|| Web Page Regex guid: ' + webPageGUID);
        }
        
        // Find the Approval Link
        
        Matcher reviewRegex = Pattern.compile('<a href="(.*?m=(\\w*)&a=Approvals.*&u=(.*)") style.*>').matcher(contentBody);
        Boolean reviewFound = reviewRegex.find();
        String reviewURL = '';
        String reviewModel = '';
        String reviewsubURL = '';
        
        system.debug('|| Approval Regex result: ' + reviewFound);
        
        if (reviewFound == true) {
            reviewURL = reviewRegex.group(1);
            reviewModel = reviewRegex.group(2);
            reviewsubURL = reviewRegex.group(3);
        	system.debug('|| Approval Regex result: ' + reviewURL);
            system.debug('|| Approval Regex model: ' + reviewModel);
            system.debug('|| Approval Regex subURL: ' + reviewsubURL);
        }
        
        // Set type
        if (reviewFound == true && foundCreativeId == true) {
            emailType = 'Approval';
        }
        
        //Do the org magic
        
        if(emailType == 'Approval') {
            
            System.debug('|| Email is an Approval email. Parsing accordingly.');
            System.debug('|| Creative Status ' + creativeStatus);
            
            //Find matching creative for the hard-coded Campaign record
            //Creative__c creative = [SELECT Id, Name, Campaign__c, Marketing_Cloud_Ref_ID__c, Approval_Status__c from Creative__c WHERE Campaign__c = '7013t000001dHWKAA2' AND Marketing_Cloud_Ref_ID__c = 'NTIzMDA0MDA2OjE5OjA']; 
            Creative__c creative = [SELECT Id, Name, Campaign__c, Marketing_Cloud_Ref_ID__c, Approval_Status__c from Creative__c WHERE Name = :creativeId];
  			//creativeStatus
            
            //Update status
            switch on creativeStatus {
                when 'Submitted' {
                	creative.Approval_Status__c = 'In Revision';
                }
                when 'Approved' {
                	creative.Approval_Status__c = 'Legal Approval';
                }
                when 'Reviewed' {
                	creative.Approval_Status__c = 'Creative Approval';
            	}	
            }
            
            //Update approval URL
            creative.Marketing_Cloud_Approval_URL__c = EncodingUtil.URLDECODE(reviewsubURL,'UTF-8');
            creative.Marketing_Cloud_Ref_ID__c = reviewModel;
            
            //Update record
            update creative;
            
            System.debug('|| Moved the record ' + creative.Name + ' to approved status automatically.');
        }
                 
        //Return
        result.success = true;
        return result;
    }
    
}