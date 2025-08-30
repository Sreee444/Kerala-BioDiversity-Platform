
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';


const App = () => (
    <Router>
        <Header />
        <main style={{ minHeight: '70vh', padding: '2rem 0', background: '#f7faf7' }}>
            <div style={{ maxWidth: 1100, margin: '0 auto', background: 'white', borderRadius: 12, boxShadow: '0 2px 16px #0001', padding: '2rem' }}>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/about" component={About} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </main>
        <Footer />
    </Router>
);

export default App;
