
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import SpeciesDetails from './pages/SpeciesDetails';
import Favorites from './pages/Favorites';
import Gallery from './pages/Gallery';
import Compare from './pages/Compare';
import RandomDiscovery from './pages/RandomDiscovery';

const App = () => (
    <Router>
        <Header />
        <main style={{ minHeight: '70vh', padding: '2rem 0', background: '#f7faf7' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto', background: 'white', borderRadius: 12, boxShadow: '0 2px 16px #0001', padding: '2rem' }}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route path="/species/:id" component={SpeciesDetails} />
                    <Route path="/favorites" component={Favorites} />
                    <Route path="/gallery" component={Gallery} />
                    <Route path="/compare" component={Compare} />
                    <Route path="/discovery" component={RandomDiscovery} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </main>
        <Footer />
    </Router>
);

export default App;
