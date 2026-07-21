import { useState, useEffect } from 'react';
import axios from 'axios';
import { House } from '../types/dictionary';

const Houses = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/dictionary/houses');
        setHouses(response.data);
      } catch (error) {
        console.error('Error fetching houses', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHouses();
  }, []);

  if (loading) return <div className="text-center py-20 text-gold-accent animate-pulse text-2xl font-serif">Construyendo las casas...</div>;

  return (
    <div className="py-8">
      <h1 className="text-4xl md:text-5xl font-serif text-gold-accent font-bold mb-12 text-center">
        Las 12 Casas Astrológicas
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {houses.map((house) => (
          <div 
            key={house._id} 
            className="bg-primary-light/30 backdrop-blur-sm border border-primary-light p-6 rounded-2xl hover:border-gold-accent/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(212,175,55,0.1)] relative overflow-hidden"
          >
            <div className="absolute -top-4 -right-4 text-8xl font-serif text-white/[0.03] pointer-events-none font-bold">
              {house.number}
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl font-serif text-white group-hover:text-gold-accent transition-colors mb-4">
                {house.name}
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm">
                {house.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Houses;
