import layout from '../templates/components/full-calendar';
import { Calendar } from '@fullcalendar/core';
import deepEqual from 'fast-deep-equal';

import { computed, observer } from '@ember/object';
import { getOwner } from '@ember/application';
import Component from '@ember/component';
import { schedule } from '@ember/runloop';
import { InvokeActionMixin } from './invoke-action-mixin';

export default Component.extend(InvokeActionMixin, {
  /////////////////////////////////////
  // PROPERTIES
  /////////////////////////////////////

  layout: layout,
  classNames: ['full-calendar'],
  calendar: undefined,

  /////////////////////////////////////
  // FULLCALENDAR OPTIONS
  /////////////////////////////////////

  // scheduler defaults to non-commercial license
  schedulerLicenseKey: computed(function() {

    // load the consuming app's config
    const applicationConfig = getOwner(this).resolveRegistration('config:environment');
    const defaultSchedulerLicenseKey = 'GPL-My-Project-Is-Open-Source';

    if (applicationConfig &&
        applicationConfig.emberFullCalendar &&
        applicationConfig.emberFullCalendar.schedulerLicenseKey) {
      return applicationConfig.emberFullCalendar.schedulerLicenseKey;
    }

    return defaultSchedulerLicenseKey;
  }),

  fullCalendarOptions: [
    'rerenderDelay', 'defaultRangeSeparator',

    // toolbar
    'headerToolbar', 'footerToolbar', 'titleFormat', 'titleRangeSeparator', 'buttonText', 'buttonIcons', 'customButtons',

    // theme
    'themeSystem', 'bootstrapGlyphicons', 'bootstrapFontawesome',

    // sizing
    'height', 'contentHeight', 'aspectRatio', 'handleWindowResize', 'windowResizeDelay', 'stickyHeaderDates', 'stickyFooterScrollbar',

    // views
    'views', 'initialView', 'fixedWeekCount', 'showNonCurrentDates', 'slotEventOverlap',
    'eventMinHeight', 'allDaySlot',

    // views hooks
    'allDayClassNames', 'allDayContent', 'allDayDidMount', 'allDayWillUnmount',

    // list
    'listDayFormat', 'listDaySideFormat',

    // list hooks
    'noEventsClassNames', 'noEventsContent', 'noEventsDidMount', 'noEventsWillUnmount',

    // resource
    'resourceGroupField', 'resourceAreaWidth', 'resourceAreaColumns', 'resourcesInitiallyExpanded',
    'slotMinWidth', 'datesAboveResources',

    // resource hooks
    'resourceGroupLabelClassNames', 'resourceGroupLabelContent', 'resourceGroupLabelDidMount', 'resourceGroupLabelWillUnmount',
    'resourceGroupLaneClassNames', 'resourceGroupLaneContent', 'resourceGroupLaneDidMount', 'resourceGroupLaneWillUnmount',
    'resourceAreaHeaderClassNames', 'resourceAreaHeaderContent', 'resourceAreaHeaderDidMount', 'resourceAreaHeaderWillUnmount',


    // slot hooks
    'slotLabelClassNames', 'slotLabelContent', 'slotLabelDidMount', 'slotLabelWillUnmount', 'slotLaneClassNames',
    'slotLaneContent', 'slotLaneDidMount', 'slotLaneWillUnmount',

    // custom views
    'duration', 'dayCount', 'visibleRange',

    // date & time
    'weekends', 'hiddenDays', 'dayHeaders', 'dayHeaderFormat', 'slotDuration', 'slotLabelInterval', 'slotLabelFormat',
    'slotMinTime', 'slotMaxTime', 'scrollTime',

    // date & time hooks
    'dayHeaderClassNames', 'dayHeaderContent', 'dayHeaderDidMount', 'dayHeaderWillMount',

    // date navigation
    'initialDate', 'dateIncrement', 'dateAlignment', 'validRange',

    // date nav links
    'navLinks', 'navLinkDayClick', 'navLinkWeekClick',

    // week numbers
    'weekNumbers', 'weekNumbersWithinDays', 'weekNumberCalculation', 'weekText', 'weekNumberFormat',

    // Week numbers hooks
    'weekNumberClassNames', 'weekNumberContent', 'weekNumberDidMount', 'weekNumberWillUnmount',

    // selection
    'selectable', 'selectMirror', 'unselectAuto', 'unselectCancel', 'selectOverlap', 'selectConstraint', 'selectAllow',
    'selectMinDistance',

    // now indicator
    'nowIndicator', 'now',

    // how indicator hooks
    'nowIndicatorClassNames', 'nowIndicatorContent', 'nowIndicatorDidMount', 'nowIndicatorWillUnmount',

    // business hours
    'businessHours',

    // event model
    'eventDataTransform', 'defaultAllDay', 'defaultTimedEventDuration', 'defaultAllDayEventDuration', 'forceEventDuration',

    // event sources
    'events', 'eventSources', 'startParam', 'endParam', 'timezoneParam', 'lazyFetching',

    // event display
    'eventColor', 'eventBackgroundColor', 'eventBorderColor', 'eventTextColor', 'eventTimeFormat',
    'displayEventTime', 'displayEventEnd', 'nextDayThreshold', 'eventOrder', 'progressiveeventRendering',

    // event dragging & resizing
    'editable', 'eventStartEditable', 'eventResizableFromStart', 'eventDurationEditable', 'eventResourceEditable',
    'droppable', 'eventDragMinDistance', 'dragRevertDuration', 'dragScroll', 'snapDuration', 'allDayMaintainDuration',
    'eventOverlap', 'eventConstraint', 'eventAllow', 'dropAccept',

    // event popover
    'dayMaxEventRows', 'moreLinkClick', 'dayPopoverFormat', 'moreLinkClassNames', 'moreLinkContent', 'moreLinkDidMount',
    'moreLinkWillUnmount',

    // resource data
    'resources', 'refetchResourcesOnNavigate',

    // resources
    'resourceOrder', 'filterResourcesWithEvents', 'resourceLabelClassNames', 'resourceLabelContent', 'resourceLabelDidMount',
    'resourceLabelWillUnmount', 'resourceLaneClassNames', 'resourceLaneContent', 'resourceLaneDidMount', 'resourceLaneWillUnmount',

    // international
    'locale', 'locales', 'firstDay', 'direction',

    // timezone
    'timeZone',

    // accessibility
    'longPressDelay', 'eventLongPressDelay', 'selectLongPressDelay',

    // plugins
    'plugins',
  ],

  fullCalendarEvents: [
    // sizing
    'windowResize',

    // view api
    'viewClassNames', 'viewDidMount', 'viewWillUnmount', 'datesSet',

    // for injecting classNames
    'dayCellClassNames',
    // for if you injected DOM content via dayRender
    'dayCellContent',
    // for if you needed the DOM element in dayRender
    'dayCellDidMount',
    'dayCellWillUnmount',
    'dayMinWidth',

    // date clicking & selecting
    'dateClick', 'select', 'unselect',

    // event sources
    'eventSourceSuccess', 'eventSourceFailure', 'loading',

    // event display hooks
    'eventClassNames', 'eventContent', 'eventDidMount', 'eventWillUnmount',

    // clicking and hovering
    'eventClick', 'eventMouseEnter', 'eventMouseLeave',

    // event dragging & resizing
    'eventDragStart', 'eventDragStop', 'eventDrop', 'drop', 'eventReceive', 'eventLeave',
    'eventResizeStart', 'eventResizeStop', 'eventResize',

    // resource rendering
    'resourceRender',

    // manipulation
    'eventDrop', 'eventResize', 'eventReceive', 'eventLeave', 'eventAdd', 'eventChange', 'eventRemove', 'eventsSet',
    'initialEvents',

    // resource hooks
    'resourceAdd', 'resourceChange', 'resourceRemove', 'resourcesSet',


  ],

  /////////////////////////////////////
  // SETUP/TEARDOWN
  /////////////////////////////////////

  didInsertElement() {
    const calendarOptions = this.getOptions();
    const calendarEvents = this.getEvents();

    const options =
      Object.assign(
        {},
        calendarOptions,
        calendarEvents
      );

    this.setProperties({
      calendarOptions: calendarOptions,
      calendarEvents: calendarEvents
    });

    // Temporary patch for `eventDataTransform` method throwing error
    options.eventDataTransform = this.get('eventDataTransform');

    // add the license key for the scheduler
    options.schedulerLicenseKey = this.get('schedulerLicenseKey');
    const calendar = new Calendar(this.element, options);
    this.set('calendar', calendar);
    calendar.render();
  },

  willDestroyElement() {
    this.get('calendar').destroy();
  },

  didUpdateAttrs() {
    this._super(...arguments);
    let updates = {};
    let removals = [];
    let newOptions = this.getOptions();

    removals = this.removedAttrs(this.calendarOptions, newOptions, removals);
    updates = this.updatedAttrs(this.calendarOptions, newOptions, updates);

    if (!deepEqual(this.calendarOptions, newOptions)) {
      this.setProperties({
        calendarOptions: newOptions
      });
    }

    Object.entries(updates).forEach(([key, value]) => {
      this.calendar.setOption(key, value)
    });

    Object.entries(removals).forEach(([key, value]) => {
      this.calendar.setOption(key, value)
    });
  },

  /*
   * Get removed attributes
   */
  removedAttrs(prevAttrs, attrs, removals) {
    for (const attrName in prevAttrs) {
      if (!(attrName in attrs)) {
        removals.push(attrName)
      }
    }
    return removals;
  },

  /*
   * Get updated attributes
   */
  updatedAttrs(prevAttrs, attrs, updates) {
    for (const attrName in attrs) {
      if (!deepEqual(attrs[attrName], prevAttrs[attrName])) {
        updates[attrName] = attrs[attrName]
      }
    }
    return updates;
  },

  /*
   * Returns all of the valid Fullcalendar options that
   * were passed into the component.
   */
  getOptions() {
    const fullCalendarOptions = this.get('fullCalendarOptions');
    const options = {};

    // Apply FullCalendar options based on property name
    fullCalendarOptions.forEach(optionName => {
      if (this.get(optionName) !== undefined) {
        options[optionName] = this.get(optionName);
      }
    });

    // Handle overriden properties
    if (this.get('viewName') !== undefined) {
      options['initialView'] = this.get('viewName');
    }

    if (this.get('date') !== undefined) {
      options['initialDate'] = this.get('date');
    }

    return options;
  },

  /*
   * Returns all valid actions of Full calendar
   * that were passed into the component
   */
  getEvents() {
    const actions = {};
    this.getPassedEvents().forEach((eventName) => {

      // create an event handler that runs the function inside an event loop.
      actions[eventName] = (...args) => {
        schedule('actions', this, () => {
          this.invokeAction(eventName, ...args, this.get('calendar'));
        });
      };

    });

    return actions;
  },

  /*
   * Returns all of the valid Fullcalendar callback event
   * names that were passed into the component.
   */
  getPassedEvents() {
    return this.get('fullCalendarEvents').filter(eventName => {
      const methodName = `_${eventName}`;
      return this.get(methodName) !== undefined || this.get(eventName) !== undefined;
    });
  },

  /////////////////////////////////////
  // OBSERVERS
  /////////////////////////////////////

  /**
   * Observe the events array for any changes and
   * re-render if changes are detected
   */
  observeEvents: observer('events.[]', function () {
    const events = this.get('events');
    this.get('calendar').batchRendering(() => {
      this.get('calendar').getEvents().forEach(e => e.remove());
      if (events) {
        this.get('calendar').addEventSource(this.get('events'));
      }
    });
  }),

  /**
   * Observe the eventSources array for any changes and
   * re-render if changes are detected
   */
  observeEventSources: observer('eventSources.[]', function () {
     this.get('calendar').batchRendering(() => {
       this.get('calendar').getEventSources().forEach(e => e.remove());

       this.get('eventSources').forEach(source => {
         if (source) {
           this.get('calendar').addEventSource(source);
         }
       });
     });
  }),

  /**
   * Observes the resources array and refreshes the resource view
   * if any changes are detected
   * @type {[type]}
   */
  observeResources: observer('resources.[]', function() {
    this.get('calendar').refetchResources();
  }),

  /**
   * Observes the 'viewName' property allowing FullCalendar view to be
   * changed from outside of the component.
   */
  viewNameDidChange: observer('viewName', function() {
    const viewName = this.get('viewName');
    const viewRange = this.get('viewRange');

    this.get('calendar').changeView(viewName, viewRange);

    // Call action if it exists
    if (this.get('onViewChange')) {
      this.get('onViewChange')(viewName, viewRange);
    }
  }),

  /**
   * Observes `date` property allowing date to be changed from outside
   * of the component.
   */
  dateDidChange: observer('date', function() {
    let date = this.get('date');
    this.get('calendar').gotoDate(date);
  })
});
