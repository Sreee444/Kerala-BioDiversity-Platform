import React from 'react';

function About() {
  return (
    <div className="about">
      <h1>About Kerala BioDiversity</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>🌿🦎 Mission</h2>
        <p>
          Kerala BioDiversity is dedicated to showcasing and preserving the incredible natural heritage 
          of Kerala, India's tropical paradise. Our platform combines modern technology with traditional 
          ecological knowledge to help users explore, identify, and learn about both the flora and fauna 
          of "God's Own Country."
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>🔬 Features</h2>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><strong>AI Species Identification:</strong> Upload photos to identify both plants and animals using advanced AI</li>
          <li><strong>Real-time Search:</strong> Search thousands of species with live biodiversity data</li>
          <li><strong>Scientific Information:</strong> Access accurate taxonomic classifications and ecological data</li>
          <li><strong>Kerala Focus:</strong> Special emphasis on species native to Kerala's diverse ecosystems</li>
          <li><strong>Educational Resource:</strong> Learn about families, characteristics, and habitats</li>
          <li><strong>Biodiversity Explorer:</strong> Discover both plants and animals in one platform</li>
        </ul>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>🌱🦅 Kerala's Rich Biodiversity</h2>
        <p>
          Kerala is one of India's most biodiverse states, home to over 4,000 species of flowering plants 
          and countless animal species. From the Western Ghats' montane forests to coastal mangroves and 
          backwaters, our state harbors incredible biological treasures:
        </p>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem' }}>
          <div>
            <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>🌿 Flora Highlights:</h3>
            <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>Neelakurinji - blooms once every 12 years</li>
              <li>State flower: Kanikonna (Cassia fistula)</li>
              <li>Medicinal plants used in Ayurveda</li>
              <li>Spice plants: cardamom, pepper, cinnamon</li>
              <li>Unique orchids and tropical species</li>
            </ul>
          </div>
          
          <div>
            <h3 style={{ color: '#2e7d32', marginBottom: '1rem' }}>🦎 Fauna Highlights:</h3>
            <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
              <li>Asian elephants in wildlife sanctuaries</li>
              <li>Over 500 bird species including hornbills</li>
              <li>Endemic frogs and reptiles</li>
              <li>Tigers in Periyar and Wayanad reserves</li>
              <li>Marine life in coastal waters</li>
            </ul>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>💻 Technology</h2>
        <p>
          Our platform leverages cutting-edge APIs and databases for comprehensive biodiversity data:
        </p>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><strong>iNaturalist API:</strong> Global biodiversity database with real observations of plants and animals</li>
          <li><strong>PlantNet API:</strong> AI-powered plant identification from photos</li>
          <li><strong>Wikipedia Integration:</strong> Comprehensive species information and images</li>
          <li><strong>React Frontend:</strong> Modern, responsive user interface</li>
          <li><strong>Real-time Data:</strong> Live updates from scientific databases</li>
        </ul>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>🎯 Explore Biodiversity</h2>
        <p>
          Ready to discover Kerala's amazing wildlife and plant life? You can:
        </p>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>Search for specific plants or animals using the search bar</li>
          <li>Upload photos of unknown species for AI identification</li>
          <li>Browse by category: All Species, Plants, or Animals</li>
          <li>Use quick explore buttons for popular Kerala species</li>
          <li>Learn about scientific names, families, and characteristics</li>
        </ul>
      </div>

      <div style={{ 
        backgroundColor: '#e8f5e8', 
        padding: '1.5rem', 
        borderRadius: '8px', 
        textAlign: 'center',
        marginTop: '2rem'
      }}>
        <h3 style={{ color: '#2e7d32', margin: '0 0 1rem 0' }}>🌺🦎 Discover Kerala's BioDiversity Today!</h3>
        <p style={{ margin: '0', color: '#555' }}>
          Join us in exploring and preserving the natural heritage of Kerala - from tiny insects to majestic elephants, 
          from delicate orchids to towering trees.
        </p>
      </div>
    </div>
  );
}

export default About;
