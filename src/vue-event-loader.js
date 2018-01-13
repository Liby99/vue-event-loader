module.exports = {
    install (Vue, options) {
        
        // Initiate event cache
        Vue._events = {};
        
        /**
         * Broadcast function: Broadcast any event along with data to all the
         * components associated with the event.
         * @param {String} event the event name
         * @param args.. [optional], the arguments associate with this event
         */
        Vue.broadcast = function (str) {
            var args = Array.from(arguments), evt = args[0], comps = Vue._events[evt];
            if (comps) {
                for (var i = 0; i < comps.length; i++) {
                    comps[i].$emit.apply(comps[i], args);
                }
            }
        };
        
        Vue.mixin({
            
            /**
             * When created, register all the events in the options.events
             * field to the broadcaster, and add event listener to the component
             */
            created: function () {
                var evts = this.constructor.options.events;
                if (evts) {
                    for (var k in evts) {
                        
                        // Register event for broadcast
                        if (Vue._events[k])
                            Vue._events[k].push(this);
                        else
                            Vue._events[k] = [ this ];
                        
                        // Add event listener to component
                        this.$on(k, evts[k].bind(this));
                    }
                }
            }
        });
    }
}
