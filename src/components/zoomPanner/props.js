/* eslint-disable max-len */

//Props
const props = {
	canvasSize: {
		type: 'integer',
		desc: 'The square size of the canvas. If the size is 1000, the midpoint will actually be [0, 0] and the top-left point will be [-500, -500]',
		dft: 10000
	},
	tZoomToFit: {
		type: 'boolean',
		desc: 'Set to true to auto pan and zoom the canvas to display all child components',
		dft: false
	},
	tZoomTo: {
		type: 'integer',
		desc: 'When set, the canvas will zoom by this scale'
	},
	zoomToFitElementsSelector: {
		type: 'string',
		desc: 'When set, only child components that match this CSS selector will be included in the calculation. See examples here: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_selectors'
	},
	excludedClassesPanning: {
		type: 'array',
		desc: 'An array of class names that, when hovered over, should not allow panning',
		dft: () => [
			'cpnButton',
			'cpnContainer',
			'cpnContainerSimple',
			'cpnIcon',
			'cpnLabel',
			'cpnLineDragger',
			'material-icons'
		]
	},
	excludedClassesWheelZooming: {
		type: 'array',
		desc: 'An array of class names that, when hovered over, should not allow \'mouse wheel zooming\'',
		dft: () => []
	},
	excludedClassesPinchZooming: {
		type: 'array',
		desc: 'An array of class names that, when hovered over, should not \'piunch gesture zooming\'',
		dft: () => []
	}
};

export default props;
