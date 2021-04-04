import { version } from 'd3';

import { pointer } from 'd3-selection';
import { groups } from 'd3-array';

import { config } from './config';

const majorVer = +version[0];

if (majorVer > 5) {
    Object.assign(config._d3compat, {
        eventHandler: handler => function eventHandler (a, b) {
            handler.call(this, b, a);
        },
        nester: ({key, sortKeys, sortValues, entries}) => {
            if (sortValues) {
                entries = [...entries].sort(sortValues);
            }
            let out = groups(entries, key);
            if (sortKeys) {
                out = out.sort(sortKeys);
            }
        
            // remap to d3@v5 structure
            return out.map(e => ({
                key: `${e[0]}`, // d3@v5 always returns key as string
                values: e[1]
            }));
        },
        pointer
    });
}