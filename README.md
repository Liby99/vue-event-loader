# Vue-Event-Loader

## Overview

vue-event-loader is a VueJs plugin for much more easier event setup as well as
event broadcasting. It's very light-weight and efficient.

There are two main functionalities in vue-event-loader. The first one is event
registration, and the second is event broadcast.

## Installation

You can use NPM to install vue-event-loader:

``` bash
$ npm install vue-event-loader
```

After installation, you need to `use` vue-event-loader to include this plugin
for VueJs:

``` js
Vue.use(require("vue-event-loader"));
```

## Introduction

### Event Registration

In your regular VueJs component setup, along with all the original data, methods
and other things, you add a new field called "events" and add items within it.
Like:

``` js
var vm = new Vue({
  data: { a: 1 },
  methods: {
    plus: function () {
      this.a++
    }
  },
  events: {
    "event.a.change": function (newValue) {
      this.a = newValue;
    }
  }
})
```

The event must has a key, which is called `event.a.change` in the following
example. To trigger the event, simply call

``` js
vm.$emit("event.a.change", 42);
```

This is basically an alias for the original `$on` method, but much easier to
setup. If you don't want to use a quoted string as the key, you definitely can.
You can also use the ES2016 function definition syntax (if you want to use it
in browser you may want to use webpack or babel to compile it correctly).

``` js
  ...
  events: {
    change (value) {
      this.value = value;
    }
  }
  ...
```

Note that using arrow definition in events is strictly prohibited (will led
to unexpected behavior), like

``` js
  ...
  events: {
    "event.a.change": (value) => {
      // THIS IS WRONG!!!!!!!!!!!!
    }
  }
  ...
```

### Event broadcast

All the events you written in `events` field will be registered to the
broadcaster - which means, the broadcaster will know which component it should
emit the event to by default. The logics are really straight forward:

``` js
Vue.broadcast("[EVENT]", value1, value2, value3, ...);
```

The above statement will broadcast a event to every component which is
registered to the `[EVENT]` (which means, there's a `[EVENT]` in the component's
`events` field), along with all the values following the event afterwards.

For example, we have a component which registered to `panel.show` event. If this
event is broadcasted and the id is `my_panel`, then we will call the `show`
method of this instance.

``` js
var myComponent = new Vue({
  ...
  events: {
    "component.show": function (id) {
      if (id == "my_component") this.show();
    }
  }
})
```

When we broadcast the event, we would do

``` js
Vue.broadcast("component.show", "my_component");
```

to show that component.
