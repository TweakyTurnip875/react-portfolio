import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import contactPicture from '../../../static/assets/images/auth/login.jpg';

export default function (props) {
	return (
		<div className="content-page-container">
			<div
				className="left-side"
				style={{
					background: `url(${contactPicture})`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
				}}
			/>

			<div className="right-side">
				<div className="bullet-point-group">
					<div className="bullet-item">
						<div className="icon">
							<FontAwesomeIcon icon="phone" />
						</div>
						<div className="text">555-555-5555</div>
					</div>

					<div className="bullet-item">
						<div className="icon">
							<FontAwesomeIcon icon="envelope" />
						</div>
						<div className="text">example@example.com</div>
					</div>

					<div className="bullet-item">
						<div className="icon">
							<FontAwesomeIcon icon="map-marked-alt" />
						</div>
						<div className="text">Location</div>
					</div>
				</div>
			</div>
		</div>
	);
}
