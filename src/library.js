//Components
import { ZoomPanner } from './components/zoomPanner';

//PropSpecs
import propsZoomPanner from './components/zoomPanner/props';

import { registerComponentTypes } from '@intenda/opus-ui';
import 'opus-ui-components';

registerComponentTypes([{
	type: 'zoomPanner',
	component: ZoomPanner,
	propSpec: propsZoomPanner
}]);
