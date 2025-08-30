
import React from 'react';
import { useHistory } from 'react-router-dom';

const cardStyle = {
	border: '1px solid #e0e0e0',
	borderRadius: 12,
	padding: '1.2rem',
	width: '100%',
	maxWidth: '320px',
	minWidth: '280px',
	background: '#fff',
	boxShadow: '0 2px 12px #0002',
	transition: 'transform 0.15s, box-shadow 0.15s',
	cursor: 'pointer',
	marginBottom: '1rem',
	position: 'relative',
	display: 'flex',
	flexDirection: 'column',
	height: 'fit-content'
};

const cardHoverStyle = {
	transform: 'translateY(-4px) scale(1.03)',
	boxShadow: '0 6px 24px #0003',
};

const PlantCard = ({ plant }) => {
	const [hover, setHover] = React.useState(false);
	const [imgSrc, setImgSrc] = React.useState(plant.image);
	const [isFavorite, setIsFavorite] = React.useState(false);
	const history = useHistory();
	const placeholder = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';

	// Check if species is in favorites
	React.useEffect(() => {
		const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
		setIsFavorite(favorites.some(fav => fav.id === plant.id));
	}, [plant.id]);

	const toggleFavorite = (e) => {
		e.stopPropagation();
		const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
		
		if (isFavorite) {
			const updatedFavorites = favorites.filter(fav => fav.id !== plant.id);
			localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
			setIsFavorite(false);
		} else {
			favorites.push(plant);
			localStorage.setItem('favorites', JSON.stringify(favorites));
			setIsFavorite(true);
		}
	};

	const handleCardClick = () => {
		// Save species data to localStorage for details page
		const savedSpecies = JSON.parse(localStorage.getItem('speciesData') || '[]');
		if (!savedSpecies.find(s => s.id === plant.id)) {
			savedSpecies.push(plant);
			localStorage.setItem('speciesData', JSON.stringify(savedSpecies));
		}
		
		history.push(`/species/${plant.id}`);
	};

	const getConservationIndicator = () => {
		const obsMatch = plant.description.match(/Observations: (\d+)/);
		const observations = obsMatch ? parseInt(obsMatch[1]) : 0;
		
		if (observations < 100) return { color: '#f44336', text: 'Rare' };
		if (observations < 500) return { color: '#ff9800', text: 'Uncommon' };
		return { color: '#4caf50', text: 'Common' };
	};

	const conservation = getConservationIndicator();

	return (
		<div
			style={hover ? { ...cardStyle, ...cardHoverStyle } : cardStyle}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			onClick={handleCardClick}
		>
			{/* Favorite Button */}
			<button
				onClick={toggleFavorite}
				style={{
					position: 'absolute',
					top: '0.5rem',
					right: '0.5rem',
					backgroundColor: 'rgba(255,255,255,0.9)',
					border: 'none',
					borderRadius: '50%',
					width: '32px',
					height: '32px',
					cursor: 'pointer',
					fontSize: '1.2rem',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					zIndex: 1
				}}
				title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
			>
				{isFavorite ? '❤️' : '🤍'}
			</button>

			{/* Conservation Status Indicator */}
			<div
				style={{
					position: 'absolute',
					top: '0.5rem',
					left: '0.5rem',
					backgroundColor: conservation.color,
					color: 'white',
					padding: '0.2rem 0.5rem',
					borderRadius: '12px',
					fontSize: '0.7rem',
					fontWeight: 'bold'
				}}
			>
				{conservation.text}
			</div>

			<img
				src={imgSrc}
				alt={plant.name}
				style={{ width: '100%', height: 130, objectFit: 'cover', borderRadius: 8, marginBottom: 8, background: '#f0f0f0' }}
				onError={() => setImgSrc(placeholder)}
			/>
			<h4 style={{ margin: '0.5rem 0 0.2rem 0', fontSize: '1.1rem', color: '#222' }}>{plant.name}</h4>
			<div style={{ fontStyle: 'italic', color: '#388e3c', fontSize: '1rem' }}>{plant.scientificName}</div>
			<div style={{ color: '#666', fontSize: '0.97rem', marginBottom: 4 }}>{plant.family}</div>
			<p style={{ fontSize: '0.97rem', marginTop: '0.5rem', color: '#444', lineHeight: '1.4' }}>
				{plant.description.length > 100 ? plant.description.substring(0, 100) + '...' : plant.description}
			</p>

			{/* Action Buttons */}
			<div style={{ 
				display: 'flex', 
				gap: '0.5rem', 
				marginTop: '1rem',
				justifyContent: 'space-between'
			}}>
				<button
					onClick={(e) => {
						e.stopPropagation();
						history.push('/compare');
					}}
					style={{
						flex: 1,
						padding: '0.4rem 0.8rem',
						backgroundColor: '#9c27b0',
						color: 'white',
						border: 'none',
						borderRadius: '6px',
						cursor: 'pointer',
						fontSize: '0.8rem'
					}}
					title="Compare with other species"
				>
					⚖️ Compare
				</button>
				
				<button
					onClick={handleCardClick}
					style={{
						flex: 2,
						padding: '0.4rem 0.8rem',
						backgroundColor: '#2196f3',
						color: 'white',
						border: 'none',
						borderRadius: '6px',
						cursor: 'pointer',
						fontSize: '0.8rem'
					}}
				>
					📖 Details
				</button>
			</div>
		</div>
	);
};

export default PlantCard;
