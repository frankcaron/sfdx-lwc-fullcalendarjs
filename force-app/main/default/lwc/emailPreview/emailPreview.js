import { LightningElement } from 'lwc';

export default class EmailPreview extends LightningElement {
    value = 'Frank';

    get options() {
        return [
            { label: 'ID 14123: Frank Caron', value: 'Frank' },
            { label: 'ID 12321: Jon Simms', value: 'Jon' },
            { label: 'ID 51323: Tony Dotson', value: 'Tony' },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
    }
}