import { useState, useEffect } from 'react';
import axios from 'axios';
import { Planet } from '../types/dictionary';

const Planets = () => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/dictionary/planets');
        setPlanets(response.data);
      } catch (error) {
        console.error('Error fetching planets', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlanets();
  }, []);

  if (loading) return <div className="text-center py-20 text-gold-accent animate-pulse text-2xl font-serif">Alineando planetas...</div>;

  return (
    <div className="py-8">
      <h1 className="text-4xl md:text-5xl font-serif text-gold-accent font-bold mb-12 text-center">
        Los Planetas
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {planets.map((planet) => (
          <div 
            key={planet._id} 
            className="bg-primary-light/30 backdrop-blur-sm border border-primary-light p-6 rounded-2xl hover:border-gold-accent/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)]"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-3xl font-serif text-white group-hover:text-gold-accent transition-colors">
                {planet.name}
              </h2>
              <span className="text-4xl">{planet.symbol}</span>
            </div>
            <div className="flex gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-gray-400">
              <span className="px-2 py-1 bg-primary-dark rounded">{planet.type}</span>
            </div>
            <p className="text-gray-300 leading-relaxed text-sm">
              {planet.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Planets;
