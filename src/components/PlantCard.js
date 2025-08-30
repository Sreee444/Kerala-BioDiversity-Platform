
import React from 'react';


const cardStyle = {
	border: '1px solid #e0e0e0',
	borderRadius: 12,
	padding: '1.2rem',
	width: 260,
	background: '#fff',
	boxShadow: '0 2px 12px #0002',
	transition: 'transform 0.15s, box-shadow 0.15s',
	cursor: 'pointer',
	marginBottom: '1rem',
};

const cardHoverStyle = {
	transform: 'translateY(-4px) scale(1.03)',
	boxShadow: '0 6px 24px #0003',
};


const PlantCard = ({ plant }) => {
	const [hover, setHover] = React.useState(false);
	const [imgSrc, setImgSrc] = React.useState(plant.image);
	const placeholder = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
	return (
		<div
			style={hover ? { ...cardStyle, ...cardHoverStyle } : cardStyle}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			<img
				src={imgSrc}
				alt={plant.name}
				style={{ width: '100%', height: 130, objectFit: 'cover', borderRadius: 8, marginBottom: 8, background: '#f0f0f0' }}
				onError={() => setImgSrc(placeholder)}
			/>
			<h4 style={{ margin: '0.5rem 0 0.2rem 0', fontSize: '1.1rem', color: '#222' }}>{plant.name}</h4>
			<div style={{ fontStyle: 'italic', color: '#388e3c', fontSize: '1rem' }}>{plant.scientificName}</div>
			<div style={{ color: '#666', fontSize: '0.97rem', marginBottom: 4 }}>{plant.family}</div>
			<p style={{ fontSize: '0.97rem', marginTop: '0.5rem', color: '#444' }}>{plant.description}</p>
		</div>
	);
};

export default PlantCard;
