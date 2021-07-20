import React from 'react';

import portfolioPicture from '../../../static/assets/images/portfolio.png';

export default function (props) {
	return (
		<div className="about-page-container">
			<div
				className="left-side"
				style={{
					background: `url(${portfolioPicture})`,
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
				}}
			/>

			<div className="right-side">
				<div className="about-page-content">
					<div>
						<h1>About Me</h1>
						Maecenas faucibus mollis interdum. Integer posuere erat a ante
						venenatis dapibus posuere velit aliquet. Sed posuere consectetur est
						at lobortis. Etiam porta sem malesuada magna mollis euismod. Donec
						sed odio dui. Aenean lacinia bibendum nulla sed consectetur.
						Maecenas sed diam eget risus varius blandit sit amet non magna.
						Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Donec
						id elit non mi porta gravida at eget metus. Donec sed odio dui. Cras
						mattis consectetur purus sit amet fermentum. Etiam porta sem
						malesuada magna mollis euismod. Nulla vitae elit libero, a pharetra
						augue. Aenean eu leo quam. Pellentesque ornare sem lacinia quam
						venenatis vestibulum. Duis mollis, est non commodo luctus, nisi erat
						porttitor ligula, eget lacinia odio sem nec elit. Praesent commodo
						cursus magna, vel scelerisque nisl consectetur et. Lorem ipsum dolor
						sit amet, consectetur adipiscing elit. Praesent commodo cursus
						magna, vel scelerisque nisl consectetur et. Nullam quis risus eget
						urna mollis ornare vel eu leo. Morbi leo risus, porta ac consectetur
						ac, vestibulum at eros. Vestibulum id ligula porta felis euismod
						semper.
					</div>
				</div>
			</div>
		</div>
	);
}
