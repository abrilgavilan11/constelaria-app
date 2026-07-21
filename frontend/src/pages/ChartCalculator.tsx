import { useState, useEffect } from 'react';
import axios from 'axios';
import { Country, State, City } from 'country-state-city';
import ZodiacWheel from '../components/ZodiacWheel';

const ChartCalculator = () => {
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    country: '',
    state: '',
    city: ''
  });
  
  const [countries, setCountries] = useState<any[]>([]);
  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [chartData, setChartData] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    setCountries(Country.getAllCountries());
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      
      // Update dependent dropdowns
      if (name === 'country') {
        setStates(State.getStatesOfCountry(value));
        setCities([]);
        updated.state = '';
        updated.city = '';
      } else if (name === 'state') {
        setCities(City.getCitiesOfState(updated.country, value));
        updated.city = '';
      }
      
      return updated;
    });
  };

  const calculateChart = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setChartData(null);

    try {
      // Find selected city to get accurate lat/lng
      const selectedCity = cities.find(c => c.name === formData.city);
      if (!selectedCity) {
        throw new Error('Por favor, selecciona una ciudad válida de la lista.');
      }
      
      const lat = parseFloat(selectedCity.latitude);
      const lng = parseFloat(selectedCity.longitude);

      // 2. Parse Date and Time
      const [year, month, day] = formData.date.split('-').map(Number);
      const [hourStr, minStr] = formData.time.split(':');
      const hourDec = parseInt(hourStr) + parseInt(minStr) / 60;
      
      // Send the Local Time to the backend. The backend will use lat/lng to find timezone.
      const chartRes = await axios.post('http://localhost:3000/api/chart/calcular-carta', {
        name: formData.name,
        year, month, day, hour: hourDec, lat, lng
      });

      setChartData(chartRes.data);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'Error al calcular la carta.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-8 max-w-4xl mx-auto px-4">
      <h1 className="text-4xl md:text-5xl font-serif text-gold-accent font-bold mb-8 text-center">
        Calcula tu Carta Astral
      </h1>
      
      <div className="bg-primary-light/30 backdrop-blur-sm border border-primary-light p-8 rounded-2xl shadow-xl mb-12">
        <form onSubmit={calculateChart} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="md:col-span-2">
            <label className="block text-gray-300 text-sm font-bold mb-2">Nombre</label>
            <input 
              type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Tu nombre"
              className="w-full bg-primary-dark border border-primary-light rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold-accent"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2">Fecha de Nacimiento</label>
            <input 
              type="date" name="date" required value={formData.date} onChange={handleChange}
              className="w-full bg-primary-dark border border-primary-light rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold-accent"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2">Hora de Nacimiento (Local)</label>
            <input 
              type="time" name="time" required value={formData.time} onChange={handleChange}
              className="w-full bg-primary-dark border border-primary-light rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold-accent"
            />
          </div>

          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2">País</label>
              <select 
                name="country" required value={formData.country} onChange={handleChange}
                className="w-full bg-primary-dark border border-primary-light rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold-accent"
              >
                <option value="">Selecciona un País</option>
                {countries.map(c => (
                  <option key={c.isoCode} value={c.isoCode}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2">Estado / Provincia</label>
              <select 
                name="state" required value={formData.state} onChange={handleChange} disabled={!formData.country}
                className="w-full bg-primary-dark border border-primary-light rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold-accent disabled:opacity-50"
              >
                <option value="">Selecciona un Estado</option>
                {states.map(s => (
                  <option key={s.isoCode} value={s.isoCode}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2">Ciudad</label>
              <select 
                name="city" required value={formData.city} onChange={handleChange} disabled={!formData.state}
                className="w-full bg-primary-dark border border-primary-light rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gold-accent disabled:opacity-50"
              >
                <option value="">Selecciona una Ciudad</option>
                {cities.map(c => (
                  <option key={c.name} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="md:col-span-2 flex justify-center mt-4">
            <button 
              type="submit" disabled={loading}
              className="px-8 py-3 bg-gold-accent text-primary-dark font-bold rounded-full hover:bg-gold-light transition-colors disabled:opacity-50"
            >
              {loading ? 'Calculando...' : 'Descubrir mi mapa'}
            </button>
          </div>
        </form>
        {error && <p className="text-red-400 mt-4 text-center">{error}</p>}
      </div>

      {chartData && (
        <div className="animate-fade-in flex flex-col items-center">
          {chartData.name && (
             <h2 className="text-3xl font-serif text-gold-accent mb-8">Carta Astral de {chartData.name}</h2>
          )}
          <ZodiacWheel data={chartData.chartData} />
          
          <div className="mt-12 w-full space-y-6">
            <h2 className="text-3xl font-serif text-gold-accent mb-6">Tus Interpretaciones</h2>
            {chartData.interpretations.map((text: string, idx: number) => (
              <div key={idx} className="bg-primary-light/20 border border-primary-light/50 p-6 rounded-xl">
                <p className="text-gray-200 leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartCalculator;
