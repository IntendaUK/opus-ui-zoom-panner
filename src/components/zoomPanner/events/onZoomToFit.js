/* eslint-disable max-lines-per-function */

//Event
const onZoomToFit = ({ id, setState, state: { tZoomToFit, zoomToFitElementsSelector } }, ref) => {
	if (!tZoomToFit)
		return;

	const idCanvas = `${id}-canvas`;

	const canvas = document.getElementById(idCanvas);
	const ownerSize = canvas.parentNode.parentNode.getBoundingClientRect();

	let xLow = Infinity;
	let xHigh = -Infinity;
	let yLow = Infinity;
	let yHigh = -Infinity;

	const zoomToFitElements = zoomToFitElementsSelector ?
		canvas.querySelectorAll(zoomToFitElementsSelector) :
		canvas.childNodes;

	zoomToFitElements.forEach(({ offsetLeft, offsetTop, offsetWidth, offsetHeight }) => {
		if (offsetLeft < xLow)
			xLow = offsetLeft;
		if (offsetTop < yLow)
			yLow = offsetTop;
		if (offsetLeft + offsetWidth > xHigh)
			xHigh = offsetLeft + offsetWidth;
		if (offsetTop + offsetHeight > yHigh)
			yHigh = offsetTop + offsetHeight;
	});

	const showW = xHigh - xLow;
	const showH = yHigh - yLow;

	const scaleX = ownerSize.width / showW;
	const scaleY = ownerSize.height / showH;
	const scale = Math.min(scaleX, scaleY);

	const x = -((xLow * scale) - ((ownerSize.width - (showW * scale))) / 2);
	const y = -((yLow * scale) - ((ownerSize.height - (showH * scale))) / 2);
	ref.current.setTransform(x, y, scale);

	setState({ tZoomToFit: false });
};

export default onZoomToFit;
