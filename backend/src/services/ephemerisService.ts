// @ts-ignore
import ephemeris from 'ephemeris';
import { find } from 'geo-tz';
import moment from 'moment-timezone';

export interface ChartData {
  planets: any[];
  houses: number[];
  ascendant: number;
}

// Basic function to calculate Local Sidereal Time
const calculateLST = (date: Date, longitude: number): number => {
  const jd = (date.getTime() / 86400000.0) + 2440587.5;
  const d = jd - 2451545.0;
  const gmst = 18.697374558 + 24.06570982441908 * d;
  let lst = (gmst + longitude / 15) % 24;
  if (lst < 0) lst += 24;
  return lst;
};

export const calculateChart = async (
  year: number,
  month: number,
  day: number,
  hour: number, // Local decimal hour
  lat: number,
  lng: number
): Promise<ChartData> => {
  return new Promise((resolve) => {
    // 1. Find Timezone based on coordinates
    const timezones = find(lat, lng);
    const tz = timezones.length > 0 ? timezones[0] : 'UTC';

    // 2. Parse as Local Time and convert to UTC
    const h = Math.floor(hour);
    const m = Math.floor((hour - h) * 60);
    const localTimeStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')} ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    
    const mDate = moment.tz(localTimeStr, 'YYYY-MM-DD HH:mm', tz);
    const utcDate = mDate.toDate(); // Native Date object is already UTC internally for getTime()

    // 3. Ephemeris calculation uses UTC Date
    const result = ephemeris.getAllPlanets(utcDate, lng, lat, 0);

    const chartData: ChartData = {
      planets: [],
      houses: [],
      ascendant: 0
    };

    const observed = result.observed;
    const planetMap: Record<string, string> = {
      sun: 'Sol', moon: 'Luna', mercury: 'Mercurio', venus: 'Venus',
      mars: 'Marte', jupiter: 'Júpiter', saturn: 'Saturno',
      uranus: 'Urano', neptune: 'Neptuno', pluto: 'Plutón'
    };

    for (const [key, pName] of Object.entries(planetMap)) {
      if (observed[key]) {
        chartData.planets.push({
          name: pName,
          longitude: observed[key].apparentLongitudeDd
        });
      }
    }

    // 4. Accurate Ascendant Calculation
    const lst = calculateLST(utcDate, lng);
    const lstRad = (lst * 15) * (Math.PI / 180);
    const latRad = lat * (Math.PI / 180);
    const oblRad = 23.4392911 * (Math.PI / 180); // Earth's axial tilt

    // Formula: tan(ASC) = cos(LST) / (-sin(LST)*cos(obl) - tan(lat)*sin(obl))
    let ascRad = Math.atan2(Math.cos(lstRad), -(Math.sin(lstRad) * Math.cos(oblRad) + Math.tan(latRad) * Math.sin(oblRad)));
    if (ascRad < 0) ascRad += Math.PI * 2;
    
    chartData.ascendant = ascRad * (180 / Math.PI);

    // 5. Equal Houses system based on Ascendant
    for (let i = 0; i < 12; i++) {
      chartData.houses.push((chartData.ascendant + i * 30) % 360);
    }

    resolve(chartData);
  });
};
