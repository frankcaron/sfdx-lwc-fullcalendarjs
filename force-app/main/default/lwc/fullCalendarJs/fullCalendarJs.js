import { LightningElement } from 'lwc';
import { loadScript, loadStyle } from 'lightning/platformResourceLoader';
import FullCalendarJS from '@salesforce/resourceUrl/FullCalendarJS';

/**
 * FullCalendarJs
 * @description Full Calendar JS - Lightning Web Components
 */
export default class FullCalendarJs extends LightningElement {

  fullCalendarJsInitialised = false;

  /**
   * @description Standard lifecyle method 'renderedCallback'
   *              Ensures that the page loads and renders the 
   *              container before doing anything else
   */
  renderedCallback() {

    // Performs this operation only on first render
    if (this.fullCalendarJsInitialised) {
      return;
    }
    this.fullCalendarJsInitialised = true;
    console.log("All good so far in the Community");

    // Executes all loadScript and loadStyle promises
    // and only resolves them once all promises are done
    Promise.all([
      loadScript(this, FullCalendarJS + '/jquery.min.js'),
      loadScript(this, FullCalendarJS + '/moment.min.js'),
      loadScript(this, FullCalendarJS + '/fullcalendar.min.js'),
      loadStyle(this, FullCalendarJS + '/fullcalendar.min.css'),
      // loadStyle(this, FullCalendarJS + '/fullcalendar.print.min.css')
    ])
    .then(() => {
      // Initialise the calendar configuration
      this.initialiseFullCalendarJs();
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.error({
        message: 'Error occured on FullCalendarJS',
        error
      });
    })
  }

  /**
   * @description Initialise the calendar configuration
   *              This is where we configure the available options for the calendar.
   *              This is also where we load the Events data.
   */
  initialiseFullCalendarJs() {
    
    const ele = this.template.querySelector('div.fullcalendarjs');

    // eslint-disable-next-line no-undef
    $(ele).fullCalendar({
      header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,basicWeek,basicDay'
      },
      defaultDate: '2020-09-01',
      // defaultDate: new Date(), // default day is today
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: [
        {
            id: 999,
            title: 'Finalize approvals',
            start: '2020-09-01T16:00:00',
            backgroundColor: '#41bef0'
        },
        {
          id: 998,
          title: 'Finalize approvals',
          start: '2020-09-12T08:00:00',
          backgroundColor: '#41bef0'
      },
      {
        id: 997,
        title: 'Finalize approvals',
        start: '2020-09-17T17:00:00',
        backgroundColor: '#41bef0'
    },
        {
          title: 'Black Card Upsell Campaign',
          url: '',
          start: '2020-09-12',
          end: '2020-09-14'
        },
        {
            title: 'Green Card Upsell Campaign',
            url: 'https://jsimms-20200724-demo.lightning.force.com/lightning/r/Campaign/7013t000001dHWKAA2/view',
            start: '2020-09-22',
            end: '2020-10-22'
        }
      ]
    });
  }
}