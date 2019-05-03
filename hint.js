import {Module} from "../module";
import Popper from 'popper.js'
/**
 * Insert hints on hover
 * @param options
 * @constructor
 */
function Hint(options) {
    let self = this;
    this.options = options;
    this.predefined_options = {
        target_item: 'js-hint-target'
    };

    this.super();

    init();

    // ------------
    // Инициализация
    // ------------

    function init() {
        setVars();
        setEvents();
    }

    function setVars() {
        self.cache('target_item', $(`.${self.options.target_item}`));
    }

    function setEvents() {
        self.cache('target_item').hover(onEnterHint, onLeaveHint);
    }

    // ------------
    // События
    // ------------

    function onEnterHint() {
        $('body > .js-hint-cont').remove();
        let $this_target_hint = $(this),
            $this_hint = $this_target_hint.find('.js-hint-cont').clone(),
            $arrow_element = $this_hint.find('.js-hint-arrow');
        $('body').append($this_hint);
        new Popper($this_target_hint, $this_hint, {
            placement: 'top-start',
            modifiers: {
                arrow: {
                    element: $arrow_element[0]
                }},
            onCreate: function (data) {
                $('body > .js-hint-cont .js-hint').css({
                    'transform': 'scale3d(1,1,1)',
                    '-webkit-transform': 'scale3d(1, 1, 1)'
                })
            }});
    }

    function onLeaveHint() {
        let $this_hint_cont = $('body > .js-hint-cont').eq(0),
            $this_hint = $this_hint_cont.find('.js-hint');
        $this_hint
            .css({
                'transform' : 'scale3d(0, 0, 0)',
                '-webkit-transform': 'scale3d(0, 0, 0)'
            });
        setTimeout( function() { 
            $this_hint_cont.remove();
        }, 100);
    }
}

Hint.prototype = new Module();


export {Hint};
