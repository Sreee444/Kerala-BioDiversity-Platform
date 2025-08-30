
import React from 'react';
import PlantCard from './PlantCard';


const PlantList = ({ plants }) => (
	<div style={{
		display: 'flex',
		flexWrap: 'wrap',
		gap: '1.5rem',
		justifyContent: 'flex-start',
		margin: '1rem 0 2rem 0',
	}}>
		{plants.length === 0 ? (
			<div>No plants found.</div>
		) : (
			plants.map(plant => <PlantCard key={plant.id} plant={plant} />)
		)}
	</div>
);

export default PlantList;
