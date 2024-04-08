//React
import React, { useEffect, useRef } from 'react';

//System
import { ThemedComponent } from '@intenda/opus-ui';

//Events
import onZoomToFit from './events/onZoomToFit';
import onZoom from './events/onZoom';

//Styles
import './styles.css';

//Plugins
import { TransformWrapper, TransformComponent } from '@kokarn/react-zoom-pan-pinch';

/* eslint-disable max-lines-per-function */
export const ZoomPanner = props => {
	const { id, getHandler, wgts, state } = props;
	const { canvasSize, prpsContainer, tZoomToFit, tZoom } = state;
	const { excludedClassesPanning, excludedClassesWheelZooming, excludedClassesPinchZooming } = state;

	const ref = useRef();

	useEffect(getHandler(onZoomToFit, ref), [tZoomToFit]);
	useEffect(getHandler(onZoom, ref), [tZoom]);

	return (
		<TransformWrapper
			ref={ref}
			minScale={0.2}
			maxScale={3}
			initialScale={1}
			initialPositionX={0}
			initialPositionY={0}
			minPositionX={-canvasSize}
			minPositionY={-canvasSize}
			maxPositionX={canvasSize}
			maxPositionY={canvasSize}
			limitToBounds={false}
			panning={{ excluded: excludedClassesPanning }}
			wheel={{ excluded: excludedClassesWheelZooming }}
			pinch={{ excluded: excludedClassesPinchZooming }}
		>
			{() => (
				<TransformComponent
					wrapperStyle={{
						width: '100%',
						height: '100%'
					}}
					contentStyle={{}}
				>
					<ThemedComponent mda={{
						id: id + '-canvas',
						parentId: id,
						type: 'containerMovable',
						prps: {
							height: `${canvasSize}px`,
							width: `${canvasSize}px`,
							wgts,
							overflow: 'hidden',
							...prpsContainer
						},
						auth: ['wgts']
					}} />
				</TransformComponent>
			)}
		</TransformWrapper>
	);
};
