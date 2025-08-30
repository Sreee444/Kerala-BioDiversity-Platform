import React from 'react';

function About() {
  return (
    <div className="about">
      <h1>About Kerala Botaniq</h1>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2>🌿 Mission</h2>
        <p>
          Kerala Botaniq is dedicated to showcasing and preserving the incredible botanical diversity 
          of Kerala, India's tropical paradise. Our platform combines modern technology with traditional 
          botanical knowledge to help users explore, identify, and learn about the rich flora of "God's Own Country."
        </p>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>🔬 Features</h2>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><strong>AI Plant Identification:</strong> Upload photos to identify plant species using advanced AI</li>
          <li><strong>Real-time Search:</strong> Search thousands of plant species with live data</li>
          <li><strong>Scientific Data:</strong> Access accurate botanical information and classifications</li>
          <li><strong>Kerala Focus:</strong> Special emphasis on plants native to Kerala's diverse ecosystems</li>
          <li><strong>Educational Resource:</strong> Learn about plant families, characteristics, and habitats</li>
        </ul>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>🌱 Kerala's Biodiversity</h2>
        <p>
          Kerala is home to over 4,000 species of flowering plants, including many endemic species found 
          nowhere else on Earth. From the Western Ghats' montane forests to coastal mangroves, our state 
          harbors incredible botanical treasures including:
        </p>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>Neelakurinji (Strobilanthes kunthiana) - blooms once every 12 years</li>
          <li>Kerala's state flower: Kanikonna (Cassia fistula)</li>
          <li>Medicinal plants used in traditional Ayurveda</li>
          <li>Spice plants like cardamom, pepper, and cinnamon</li>
          <li>Unique orchids and exotic tropical species</li>
        </ul>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>💻 Technology</h2>
        <p>
          Our platform leverages cutting-edge APIs and databases:
        </p>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
          <li><strong>PlantNet API:</strong> AI-powered plant identification from photos</li>
          <li><strong>iNaturalist API:</strong> Global biodiversity database with real observations</li>
          <li><strong>Wikipedia Integration:</strong> Comprehensive plant information and images</li>
          <li><strong>React Frontend:</strong> Modern, responsive user interface</li>
        </ul>
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <h2>🎯 Get Started</h2>
        <p>
          Ready to explore Kerala's amazing plant life? You can:
        </p>
        <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
          <li>Search for specific plants using the search bar</li>
          <li>Upload photos of unknown plants for AI identification</li>
          <li>Browse popular Kerala plants using quick search buttons</li>
          <li>Learn about plant families, scientific names, and characteristics</li>
        </ul>
      </div>

      <div style={{ 
        backgroundColor: '#e8f5e8', 
        padding: '1.5rem', 
        borderRadius: '8px', 
        textAlign: 'center',
        marginTop: '2rem'
      }}>
        <h3 style={{ color: '#2e7d32', margin: '0 0 1rem 0' }}>🌺 Discover Kerala's Flora Today!</h3>
        <p style={{ margin: '0', color: '#555' }}>
          Join us in exploring and preserving the botanical heritage of Kerala.
        </p>
      </div>
    </div>
  );
}

export default About;
