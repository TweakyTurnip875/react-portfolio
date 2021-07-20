import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
	faTrash,
	faSignOutAlt,
	faEdit,
	faTimes,
	faSpinner,
	faHome,
	faPlusSquare,
	faPhone,
	faEnvelope,
	faMapMarkedAlt,
} from '@fortawesome/free-solid-svg-icons';

const Icons = () => {
	return library.add(
		faTrash,
		faSignOutAlt,
		faEdit,
		faTimes,
		faSpinner,
		faHome,
		faPlusSquare,
		faPhone,
		faEnvelope,
		faMapMarkedAlt
	);
};

export default Icons;
