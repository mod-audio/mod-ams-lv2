function (event) {
    /* common */
    var svg_height = 112;
    var svg_width = 211;

    function draw_adsr(elem, delay, attack, hold, decay, sustain, release) {
        var svg = elem.svg('get');
        svg.clear();

        var segment_width = svg_width / 6;
        var delay_w = delay * segment_width;
        var attack_w = attack * segment_width;
        var hold_w = hold * segment_width;
        var decay_w = decay * segment_width;
        var sustain_h = (1.0 - (sustain * 0.1)) * svg_height;
        var release_w = release * segment_width;

        var path = [
            // start
            [0, svg_height],
            // start
            [delay_w, svg_height],
            // attack
            [delay_w + attack_w, 0],
            // hold
            [delay_w + attack_w + hold_w, 0],
            // decay
            [delay_w + attack_w + hold_w + decay_w, sustain_h],
            // sustain
            [delay_w + attack_w + hold_w + decay_w + segment_width, sustain_h],
            // release
            [delay_w + attack_w + hold_w + decay_w + segment_width + release_w, svg_height],
        ];

        // setup gradient
        var defs = svg.defs();
        svg.linearGradient(defs, 'fadeBg', [[0, '#7c7c7c'], [1, '#151515']]);

        // draw polygon
        var g = svg.group({stroke: '#e0e0e0', strokeWidth: 2.0, fill: 'url(#fadeBg)'});
        svg.polygon(g, path, {});
    }

    function setup_svg(elem, width, height) {
        // enable svg element
        elem.svg();
        // setup svg size
        var svg = elem.svg('get');
        svg.configure({width: '' + width + 'px'}, false);
        svg.configure({height: '' + height + 'px'}, false);
    }

    if (event.type == 'start')
    {
        var symbol;

        // cache relevant values locally
        var values = event.data.values = {};
        for (var i in event.ports)
        {
            symbol = event.ports[i].symbol;

            if (symbol !== 'timeScale')
            {
                values[symbol] = event.ports[i].value;
            }
        }

        // get elements
        var env = event.icon.find('[mod-role=ams-dahsr-svg]');

        // setup svgs
        setup_svg(env, svg_width, svg_height);

        draw_adsr(env,
            values['delay'],
            values['attack'],
            values['hold'],
            values['decay'],
            values['sustain'],
            values['release']);
    }
    else if (event.type == 'change')
    {
        if (event.symbol === undefined)
            return;

        // update cached values
        if (event.symbol !== 'timeScale')
        {
            var values = event.data.values;
            values[event.symbol] = event.value;

            // draw new envelope
            draw_adsr(event.icon.find('[mod-role=ams-dahsr-svg]'),
                values['delay'],
                values['attack'],
                values['hold'],
                values['decay'],
                values['sustain'],
                values['release']);
        }

    }
}

/* GLOBAL functions */
