import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-6xl md:text-8xl font-serif text-gold-accent font-bold mb-6 drop-shadow-lg">
        Constelaria
      </h1>
      <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mb-12">
        Tu guía interactiva para explorar el cosmos y descubrir tu mapa astral con precisión y belleza.
      </p>
      <div className="flex flex-col sm:flex-row gap-6">
        <Link 
          to="/signs" 
          className="px-8 py-4 bg-primary-light text-white rounded-full font-semibold hover:bg-gold-accent hover:text-primary-dark transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)]"
        >
          Explorar Diccionario
        </Link>
        <Link 
          to="/chart" 
          className="px-8 py-4 bg-transparent border-2 border-gold-accent text-gold-accent rounded-full font-semibold hover:bg-gold-accent/10 transition-all duration-300"
        >
          Calcular Carta Astral
        </Link>
      </div>
    </div>
  );
};

export default Home;
