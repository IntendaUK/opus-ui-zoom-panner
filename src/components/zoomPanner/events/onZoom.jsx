//Internal
const scaleMultiplier = 0.14;
const minScale = 0.2;
const maxScale = 3;

//Helper
export const calculateTransformDataFromZoomDelta = (ownerEl, canvasEl, zoomDelta) => {
	const ownerRect = ownerEl.getBoundingClientRect();
	const canvasRect = canvasEl.getBoundingClientRect();

	const originalScale = canvasRect.width / canvasEl.offsetWidth;
	const calcScale = originalScale + (originalScale * scaleMultiplier * zoomDelta);

	//Clamp the new scale to 0.2, 3
	const newScale = Math.max(Math.min(calcScale, maxScale), minScale);

	//Figure out the viewport midpoint
	const midpointX = (ownerRect.x - canvasRect.x + (ownerRect.width / 2)) / originalScale;
	const midpointY = (ownerRect.y - canvasRect.y + (ownerRect.height / 2)) / originalScale;

	//Get new width, height
	const newWidth = ownerRect.width / newScale;
	const newHeight = ownerRect.height / newScale;

	//Offset x and y by diff
	const x = -(midpointX - (newWidth / 2)) * newScale;
	const y = -(midpointY - (newHeight / 2)) * newScale;

	return {
		x,
		y,
		newScale
	};
};

//Event
const onZoom = ({ id, setState, state: { tZoom } }, ref) => {
	if (!tZoom)
		return;

	const canvasEl = document.getElementById(`${id}-canvas`);
	const ownerEl = canvasEl.parentNode.parentNode;

	const { x, y, newScale } = calculateTransformDataFromZoomDelta(ownerEl, canvasEl, tZoom);

	ref.current.setTransform(x, y, newScale);

	setState({ tZoom: false });
};

export default onZoom;
