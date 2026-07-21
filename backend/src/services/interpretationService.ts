import { calculateChart } from './ephemerisService';
import Sign from '../models/Sign';
import Planet from '../models/Planet';
import House from '../models/House';

const getZodiacSign = (longitude: number) => {
  const signs = [
    'Aries', 'Tauro', 'Géminis', 'Cáncer', 'Leo', 'Virgo',
    'Libra', 'Escorpio', 'Sagitario', 'Capricornio', 'Acuario', 'Piscis'
  ];
  const signIndex = Math.floor(longitude / 30);
  const degrees = longitude % 30;
  return { signName: signs[signIndex] as string, degrees };
};

export const getChartInterpretation = async (
  year: number, month: number, day: number, hour: number, lat: number, lng: number
) => {
  const chartData = await calculateChart(year, month, day, hour, lat, lng);
  
  const interpretations = [];
  const chartResult: any = { planets: [], houses: [], ascendant: {} };

  // Ascendant
  const ascSignInfo = getZodiacSign(chartData.ascendant);
  const ascSignDb = await Sign.findOne({ name: ascSignInfo.signName });
  chartResult.ascendant = {
    sign: ascSignInfo.signName,
    degrees: ascSignInfo.degrees,
    description: `Ascendente en ${ascSignInfo.signName}: La máscara que presentas al mundo. ${ascSignDb?.description || ''}`
  };
  interpretations.push(chartResult.ascendant.description);

  // Planets
  for (const p of chartData.planets) {
    const signInfo = getZodiacSign(p.longitude);
    const planetDb = await Planet.findOne({ name: p.name as string });
    const signDb = await Sign.findOne({ name: signInfo.signName });

    const interpretationText = `${p.name} en ${signInfo.signName}: ${planetDb?.description || ''} Se expresa de manera ${signDb?.description || ''}`;
    
    chartResult.planets.push({
      name: p.name,
      sign: signInfo.signName,
      degrees: signInfo.degrees,
      longitude: p.longitude,
      interpretation: interpretationText
    });
    interpretations.push(interpretationText);
  }

  // Houses (Equal houses)
  for (let i = 0; i < chartData.houses.length; i++) {
    const cuspideLongitude = chartData.houses[i] as number;
    const signInfo = getZodiacSign(cuspideLongitude);
    chartResult.houses.push({
      number: i + 1,
      sign: signInfo.signName,
      degrees: signInfo.degrees,
      longitude: cuspideLongitude
    });
  }

  return { chartData: chartResult, interpretations };
};
