import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Sign from '../models/Sign';
import Planet from '../models/Planet';
import House from '../models/House';

dotenv.config();

const signs = [
  { name: 'Aries', element: 'Fuego', quality: 'Cardinal', ruler: 'Marte', symbol: '♈', description: 'El primer signo del zodíaco, representa los comienzos, la iniciativa y la energía.' },
  { name: 'Tauro', element: 'Tierra', quality: 'Fijo', ruler: 'Venus', symbol: '♉', description: 'Signo de tierra enfocado en la estabilidad, los recursos y la sensualidad.' },
  { name: 'Géminis', element: 'Aire', quality: 'Mutable', ruler: 'Mercurio', symbol: '♊', description: 'Signo de aire comunicativo, adaptable y curioso.' },
  { name: 'Cáncer', element: 'Agua', quality: 'Cardinal', ruler: 'Luna', symbol: '♋', description: 'Signo de agua asociado a las emociones, la familia y la protección.' },
  { name: 'Leo', element: 'Fuego', quality: 'Fijo', ruler: 'Sol', symbol: '♌', description: 'Signo de fuego que busca la autoexpresión, el brillo y el liderazgo.' },
  { name: 'Virgo', element: 'Tierra', quality: 'Mutable', ruler: 'Mercurio', symbol: '♍', description: 'Signo de tierra detallista, analítico y servicial.' },
  { name: 'Libra', element: 'Aire', quality: 'Cardinal', ruler: 'Venus', symbol: '♎', description: 'Signo de aire enfocado en las relaciones, la armonía y la belleza.' },
  { name: 'Escorpio', element: 'Agua', quality: 'Fijo', ruler: 'Plutón', symbol: '♏', description: 'Signo de agua intenso, transformador y profundo.' },
  { name: 'Sagitario', element: 'Fuego', quality: 'Mutable', ruler: 'Júpiter', symbol: '♐', description: 'Signo de fuego aventurero, filosófico y optimista.' },
  { name: 'Capricornio', element: 'Tierra', quality: 'Cardinal', ruler: 'Saturno', symbol: '♑', description: 'Signo de tierra ambicioso, estructurado y disciplinado.' },
  { name: 'Acuario', element: 'Aire', quality: 'Fijo', ruler: 'Urano', symbol: '♒', description: 'Signo de aire original, humanitario y desapegado.' },
  { name: 'Piscis', element: 'Agua', quality: 'Mutable', ruler: 'Neptuno', symbol: '♓', description: 'Signo de agua soñador, empático y espiritual.' }
];

const planets = [
  { name: 'Sol', type: 'Luminar', symbol: '☀️', description: 'Representa la esencia, el ego y la vitalidad.' },
  { name: 'Luna', type: 'Luminar', symbol: '🌙', description: 'Representa las emociones, las necesidades y el mundo subconsciente.' },
  { name: 'Mercurio', type: 'Personal', symbol: '☿️', description: 'Planeta de la comunicación, el intelecto y el aprendizaje.' },
  { name: 'Venus', type: 'Personal', symbol: '♀️', description: 'Planeta del amor, la belleza, los valores y las relaciones.' },
  { name: 'Marte', type: 'Personal', symbol: '♂️', description: 'Planeta de la acción, la energía, el deseo y la asertividad.' },
  { name: 'Júpiter', type: 'Social', symbol: '♃', description: 'Planeta de la expansión, el crecimiento, la suerte y la filosofía.' },
  { name: 'Saturno', type: 'Social', symbol: '♄', description: 'Planeta de la estructura, la responsabilidad, los límites y el tiempo.' },
  { name: 'Urano', type: 'Transpersonal', symbol: '♅', description: 'Planeta de la innovación, la rebeldía, lo repentino y la originalidad.' },
  { name: 'Neptuno', type: 'Transpersonal', symbol: '♆', description: 'Planeta de la inspiración, la ilusión, la espiritualidad y la confusión.' },
  { name: 'Plutón', type: 'Transpersonal', symbol: '♇', description: 'Planeta de la transformación, el poder, la muerte y el renacimiento.' }
];

const houses = Array.from({ length: 12 }, (_, i) => ({
  number: i + 1,
  name: `Casa ${i + 1}`,
  description: `Área de vida asociada a la casa ${i + 1}.` // A simplificar para el ejemplo
}));
houses[0].description = "El Yo, la apariencia, los comienzos (Ascendente).";
houses[1].description = "Los recursos, los valores, las posesiones.";
houses[2].description = "La comunicación, el entorno cercano, los hermanos.";
houses[3].description = "El hogar, las raíces, la familia (Fondo del Cielo).";
houses[4].description = "La creatividad, los romances, los hijos, la autoexpresión.";
houses[5].description = "El trabajo diario, la salud, las rutinas, el servicio.";
houses[6].description = "Las relaciones uno a uno, el matrimonio, los socios (Descendente).";
houses[7].description = "La transformación, los recursos compartidos, la intimidad.";
houses[8].description = "La filosofía, los viajes largos, la educación superior, las creencias.";
houses[9].description = "La carrera, el estatus público, la vocación (Medio Cielo).";
houses[10].description = "Los grupos, los amigos, las esperanzas y proyectos colectivos.";
houses[11].description = "El inconsciente, el aislamiento, la espiritualidad, los finales.";

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/constelaria');
    console.log('MongoDB Connected for seeding...');

    await Sign.deleteMany();
    await Planet.deleteMany();
    await House.deleteMany();

    await Sign.insertMany(signs);
    await Planet.insertMany(planets);
    await House.insertMany(houses);

    console.log('Data successfully seeded!');
    process.exit();
  } catch (error) {
    console.error('Error with seeding data:', error);
    process.exit(1);
  }
};

seedDB();
