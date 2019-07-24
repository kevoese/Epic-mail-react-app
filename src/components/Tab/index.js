/* eslint-disable camelcase */
import React from 'react';
import './Tab.scss';

const Tab = ({ id, children, name, icon, handleSwitch }) => (
	<div className="tab">
		<input id={id} name={name} type="radio" onChange={handleSwitch} />
		<label htmlFor={id}>
			<div className="tabIcon">{icon}</div> {children}
		</label>
	</div>
);

export default Tab;
