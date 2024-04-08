/* eslint-disable max-lines-per-function, max-lines */

//System
import React from 'react';
import ReactDOM from 'react-dom/client';

//Components
import { ZoomPanner } from './components/zoomPanner';

//PropSpecs
import propsZoomPanner from './components/zoomPanner/props';

//Opus Lib
import Opus from '@intenda/opus-ui';
import '@intenda/opus-ui-components';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<Opus
		registerComponentTypes={[{
			type: 'zoomPanner',
			component: ZoomPanner,
			propSpec: propsZoomPanner
		}]}
		startupMda={{
			type: 'containerSimple',
			prps: {
				singlePage: true,
				mainAxisAlign: 'center',
				crossAxisAlign: 'center'
			},
			wgts: [{
				type: 'zoomPanner',
				prps: { }
			}]
		}}
	/>
);
