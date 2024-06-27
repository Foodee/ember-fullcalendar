# ember-fullcalendar

[![dependencies](https://david-dm.org/scoutforpets/ember-fullcalendar.svg)](https://david-dm.org/scoutforpets/ember-fullcalendar) [![npm version](https://badge.fury.io/js/ember-fullcalendar.svg)](https://badge.fury.io/js/ember-fullcalendar)


**ember-fullcalendar** brings the power of [FullCalendar](http://fullcalendar.io/) and [FullCalendar Scheduler](http://fullcalendar.io/scheduler/) to Ember.

## Installation

This addon works in Ember 2.12+ with no deprecations.

To install it run:

```yarn add -D https://git@github.com/Foodee/ember-fullcalendar.git```

## Overview
This addon currently supports every option and callback currently available for FullCalendar and FullCalendar Scheduler 6. Please see the [FullCalendar documentation](https://fullcalendar.io/docs#toc) for more information.

## Usage

A simple example:

```javascript
import dayGridPlugin from '@fullcalendar/daygrid';

let events = Ember.A([{
  title: 'Event 1',
  start: '2016-05-05T07:08:08',
  end: '2016-05-05T09:08:08'
}, {
  title: 'Event 2',
  start: '2016-05-06T07:08:08',
  end: '2016-05-07T09:08:08'
}, {
  title: 'Event 3',
  start: '2016-05-10T07:08:08',
  end: '2016-05-10T09:48:08'
}, {
  title: 'Event 4',
  start: '2016-05-11T07:15:08',
  end: '2016-05-11T09:08:08'
}]);

let plugins = [dayGridPlugin];
```

### FullCalendar Methods

To call FullCalendar methods, you need a reference to the calendar object.

A reference gets passed with every FullCalendar callback as last parameter, so you can use e.g. `viewDidMount` to get the object:

```javascript
// app/controllers/application.js
import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    viewDidMount(info, calendar) {
      this.set('calendar', calendar);
    },

    nextMonth() {
      this.calendar.next();
    },
  }
});
```

```handlebars
// app/controllers/application.hbs

<FullCalendar
  @plugins={{plugins}}
  @events={{eventsArray}}
  @viewName={{viewName}}
  @date={{startDate}}
  @viewDidMount={{action "viewDidMount"}}
  @timezone="UTC"
  @eventRender={{this.eventRender}}
  @resources={{this.resources}}
  @datesAboveResources={{true}}
  @groupByDateAndResource={{true}}
  @firstDay={{0}}
  @headerToolbar={{false}}
  @dayHeaderFormat={{hash weekday="long"}}
  @weekday="long"
  @slotEventOverlap={{false}}
  @slotDuration="00:15:00"
  @slotLabelInterval="01:00"
  @slotMinTime="06:00"
  @slotMaxTime="23:00"
  @nowIndicator={{false}}
  @selectable={{true}}
  @editable={{true}}
  @selectHelper={{false}}
/>
```

### DDAU

Where possible, this addon takes advantage of DDAU (Data Down, Actions Up) to allow your Ember app to interact with FullCalendar from outside of the component. Below are a list of properties that override default FullCalendar properties:

- `viewName` _(replaces `initialView`)_ - allows you to change the view mode from outside of the component. For example, when using `header=false`, you can use your own buttons to modify the `viewName` property to change the view of the calendar.

- `viewRange` - can be used in conjunction with `viewName` to simultaneously navigate to a new date when switching to a new view. [See the docs](https://fullcalendar.io/docs/Calendar-changeView).

- `date` _(replaces `initialDate`)_ - allows you to change the date from outside of the component.

### FullCalendar Callbacks
All FullCalendar and FullCalendar Scheduler callbacks are supported and can be handled using Ember Actions. Here's a simple example:

Add the component to your template:

```handlebars
// app/templates/application.hbs
<FullCalendar
  @plugins={{plugins}}
  @events={{eventsArray}}
  @eventClick="{{action 'clicked'}}"
/>
```

Add some events:

```javascript
// app/routes/application.js
import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return {
      events: Ember.A([{
        title: 'Partayyyy', start: new Date()
      }])
    };
  }
});
```

Register the action in your controller or component:

```javascript
// app/controllers/application.js
import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    clicked({event, jsEvent, view}){
      this.showModal(event);
    }
  }
});
```

## FullCalendar Scheduler
By default, the addon uses the [Free Trial License Key](http://fullcalendar.io/scheduler/download/) provided by FullCalendar. If you have a paid license key, you may set it by explicitly passing it into the component as `schedulerLicenseKey` or, the better option, is to set it in your `config/environment.js` file like so:

```javascript
var ENV = {
  emberFullCalendar: {
    schedulerLicenseKey: '<your license key>',
  }
  // Other options here, as needed.
};
```

## FullCalendar Locales
To use locales, import and pass them in the `locales` option. [See the docs for more info](https://fullcalendar.io/docs/locale)
