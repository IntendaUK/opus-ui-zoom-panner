//Imports
import React from 'react';
import { createRoot } from 'react-dom/client';

import Opus from '@intenda/opus-ui';
import './library';

//Sample
createRoot(document.getElementById('root'))
	.render(
		<Opus
			startupMda={{
				type: 'containerSimple',
				prps: {
					singlePage: true,
					backgroundColor: 'lightGrey'
				},
				wgts: [{
					type: 'zoomPanner',
					wgts: [{
						type: 'mover',
						prps: {
							position: 'absolute',
							left: 100,
							top: 100
						},
						wgts: [{
							type: 'label',
							prps: {
								cpt: 'Label 1',
							}
						}]
					}]
				}]
			}}
		/>
	);
