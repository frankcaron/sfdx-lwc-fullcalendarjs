import { LightningElement, api, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';

import RECORD_URL from '@salesforce/schema/Creative__c.Preview_Site__c';
import RECORD_IMG from '@salesforce/schema/Creative__c.Preview_Thumbnail__c';
const FIELDS = [RECORD_URL, RECORD_IMG];

export default class EmailPreview extends NavigationMixin(LightningElement) {

    //Record ID
    @api recordId;

    //URL
    url = 'https://www.google.com';

    //Wire Fetch
    @wire(getRecord, { recordId: '$recordId', FIELDS })
    creative;

    get record_url() {
        this.url = getFieldValue(this.creative.data, RECORD_URL);
        return this.url;
    }

    get record_img() {
        return getFieldValue(this.creative.data, RECORD_IMG);
    }

    //Button control
    openPreview() {
        this[NavigationMixin.Navigate]({
            "type": "standard__webPage",
            "attributes": {
                "url": this.url
            }
        });
    }
}