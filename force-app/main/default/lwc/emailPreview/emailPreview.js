import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS = [
    'Creative__c.Preview_Site__c',
    'Creative__c.Preview_Thumbnail__c',
    'Creative__c.Marketing_Cloud_Approval_URL__c'
];

export default class EmailPreview extends NavigationMixin(LightningElement) {

    //Record ID
    @api recordId;

    //Wire Fetch
    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    creative;

    get recordUrl() {
        return this.creative.data.fields.Preview_Site__c.value;
    }

    get recordImg() {
        return this.creative.data.fields.Preview_Thumbnail__c.value;
    }

    //Button control
    openPreview() {
        this[NavigationMixin.Navigate]({
            "type": "standard__webPage",
            "attributes": {
                "url": this.creative.data.fields.Preview_Site__c.value
            }
        });
    }

    openMC() {
        this[NavigationMixin.Navigate]({
            "type": "standard__webPage",
            "attributes": {
                "url": this.creative.data.fields.Marketing_Cloud_Approval_URL__c.value ? this.creative.data.fields.Marketing_Cloud_Approval_URL__c.value : "https://mc.s4.exacttarget.com/cloud/#app/Content%20Builder/"
            }
        });
    }
}