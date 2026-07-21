import { Link } from 'react-router-dom';
import { Sparkles, Moon, Sun } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full bg-primary-dark/80 backdrop-blur-md border-b border-primary-light sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Sparkles className="h-6 w-6 text-gold-accent" />
            <span className="font-serif text-2xl font-bold text-gold-accent">Constelaria</span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link to="/signs" className="text-gray-300 hover:text-gold-accent transition-colors duration-200">Signos</Link>
            <Link to="/planets" className="text-gray-300 hover:text-gold-accent transition-colors duration-200">Planetas</Link>
            <Link to="/houses" className="text-gray-300 hover:text-gold-accent transition-colors duration-200">Casas</Link>
            <Link to="/chart" className="text-gold-accent font-semibold hover:text-gold-light transition-colors duration-200">Carta Astral</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
