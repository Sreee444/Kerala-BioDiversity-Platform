# Kerala BioDiversity Platform 🌿

A comprehensive React-based biodiversity exploration platform showcasing the rich flora and fauna of Kerala, India. Discover, learn, and connect with nature through advanced species identification, conservation insights, and interactive features.

## 🌟 Features

### 🔍 Species Discovery
- **AI-Powered Plant Identification**: Upload images for instant plant identification using PlantNet API
- **Comprehensive Species Database**: Explore thousands of species with detailed information from iNaturalist
- **Random Species Discovery**: "Surprise me" feature to discover new species daily
- **Advanced Search & Filtering**: Find species by category, conservation status, and more

### 📚 Species Information
- **Detailed Species Pages**: Comprehensive information including taxonomy, habitat, and ecology
- **Conservation Status**: Real-time conservation status and protection information
- **Seasonal Information**: Best times to spot different species throughout the year
- **High-Quality Images**: Beautiful galleries of species photography

### 🎯 Personal Features
- **Favorites & Bookmarks**: Save and organize your favorite species discoveries
- **Species Comparison**: Compare up to 3 species side-by-side with detailed analysis
- **Discovery History**: Track your species exploration journey
- **Personal Gallery**: Curated collection of discovered species

### 🖼️ Visual Experience
- **Species Gallery**: Dedicated gallery view with filtering and sorting options
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Grid & Masonry Layouts**: Multiple viewing options for the best visual experience
- **Conservation Badges**: Visual indicators for species protection status

## 🛠️ Technology Stack

- **Frontend**: React 17.0.2 with React Router DOM v5
- **APIs**: 
  - iNaturalist API for biodiversity data
  - PlantNet API for AI plant identification
- **Styling**: CSS3 with Grid and Flexbox layouts
- **Data Storage**: LocalStorage for client-side persistence
- **Responsive Design**: Mobile-first approach with CSS Grid

## 🚀 Live Demo

Visit the live application: **[Kerala BioDiversity Platform](https://kerala-botaniq.vercel.app)**

Experience the full platform with all features including species discovery, AI plant identification, favorites management, and conservation insights.

## 📱 How to Use

### 🔍 Discovering Species
1. **Browse by Category**: Use the navigation to explore different types of species
2. **Upload Images**: Use the image search feature to identify plants instantly
3. **Random Discovery**: Click "Surprise Me" for daily species recommendations

### ⭐ Managing Favorites
1. **Save Species**: Click the heart icon on any species card to add to favorites
2. **View Collection**: Access your saved species through the Favorites page
3. **Organize**: Remove or clear your favorites as needed

### 🔄 Comparing Species
1. **Add to Comparison**: Select species you want to compare
2. **Detailed Analysis**: View side-by-side comparison with key differences
3. **Conservation Insights**: Understand conservation status and threats

### 🖼️ Gallery Experience
1. **Filter by Category**: Birds, Plants, Mammals, Reptiles, and more
2. **Sort Options**: Alphabetical, recent, or conservation status
3. **View Modes**: Switch between grid and masonry layouts

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.js       # Navigation header
│   ├── PlantCard.js    # Species display cards
│   ├── PlantList.js    # Species listing component
│   ├── SearchBar.js    # Search functionality
│   ├── ImageSearch.js  # AI image identification
│   └── Footer.js       # Site footer
├── pages/              # Main application pages
│   ├── Home.js         # Homepage with featured content
│   ├── About.js        # About page
│   ├── Gallery.js      # Species gallery view
│   ├── SpeciesDetails.js # Detailed species information
│   ├── Favorites.js    # User's saved species
│   ├── Compare.js      # Species comparison tool
│   └── RandomDiscovery.js # Random species discovery
├── api/                # External API integrations
│   ├── gbif.js         # GBIF API integration
│   └── plantnet.js     # PlantNet API integration
├── styles/             # CSS stylesheets
│   └── main.css        # Main stylesheet
└── assets/             # Static assets
    └── logo.svg        # Application logo
```

## 🌍 Conservation Impact

This platform aims to:
- **Raise Awareness**: Educate users about Kerala's biodiversity and conservation needs
- **Promote Conservation**: Highlight endangered and protected species
- **Encourage Exploration**: Make biodiversity discovery accessible and engaging
- **Support Research**: Provide easy access to scientific species information

## 🤝 Contributing

We welcome contributions to improve the Kerala BioDiversity Platform! Here's how you can help:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Commit your changes: `git commit -m 'Add new feature'`
4. Push to the branch: `git push origin feature/new-feature`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **iNaturalist**: For providing comprehensive biodiversity data
- **PlantNet**: For AI-powered plant identification services
- **Kerala Forest Department**: For conservation status information
- **Nature Photographers**: For beautiful species imagery
- **Open Source Community**: For the tools and libraries that make this possible

## 📞 Contact

- **Repository**: [Kerala-Botaniq](https://github.com/Sreee444/Kerala-Botaniq)
- **Issues**: [Report bugs or request features](https://github.com/Sreee444/Kerala-Botaniq/issues)

---

**Explore. Discover. Conserve.** 🌱

> "In every walk with nature, one receives far more than they seek." - John Muir
