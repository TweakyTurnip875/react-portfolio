import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
	faTrash,
	faSignOutAlt,
	faEdit,
	faTimes,
	faSpinner,
	faServer,
	faHome,
	faPlusSquare,
} from "@fortawesome/free-solid-svg-icons";

const Icons = () => {
	return library.add(
		faTrash,
		faSignOutAlt,
		faEdit,
		faTimes,
		faSpinner,
		faServer,
		faHome,
		faPlusSquare
	);
};

export default Icons;
