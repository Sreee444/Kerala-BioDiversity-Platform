
import React from 'react';
import PlantCard from './PlantCard';

const PlantList = ({ plants }) => (
	<div style={{
		display: 'grid',
		gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
		gap: '1.5rem',
		margin: '1rem 0 2rem 0',
		padding: '0',
		justifyItems: 'center',
		alignItems: 'start'
	}}>
		{plants.length === 0 ? (
			<div style={{
				gridColumn: '1 / -1',
				textAlign: 'center',
				padding: '3rem',
				color: '#666',
				fontSize: '1.1rem',
				backgroundColor: '#f5f5f5',
				borderRadius: '12px',
				border: '2px dashed #ddd'
			}}>
				<div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
				<div>No species found. Try a different search term!</div>
			</div>
		) : (
			plants.map(plant => <PlantCard key={plant.id} plant={plant} />)
		)}
	</div>
);

export default PlantList;
