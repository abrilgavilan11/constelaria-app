interface ZodiacWheelProps {
  data: {
    planets: any[];
    houses: any[];
    ascendant: any;
  }
}

const ZodiacWheel = ({ data }: ZodiacWheelProps) => {
  // A simplified SVG Zodiac Wheel for the MVP.
  // In a production app, this would involve complex D3.js or Canvas rendering.
  
  const renderPlanet = (planet: any, idx: number) => {
    // 0 degrees is left (Ascendant traditionally), standard math:
    // We offset by Ascendant to put Ascendant on the left (180 deg in SVG)
    const angle = (planet.longitude - data.ascendant.degrees + 180) % 360;
    const rad = angle * (Math.PI / 180);
    const radius = 120; // radius of planet placement
    const cx = 200 + radius * Math.cos(rad);
    const cy = 200 + radius * Math.sin(rad);

    const symbols: Record<string, string> = {
      'Sol': '☀️', 'Luna': '🌙', 'Mercurio': '☿️', 'Venus': '♀️',
      'Marte': '♂️', 'Júpiter': '♃', 'Saturno': '♄',
      'Urano': '♅', 'Neptuno': '♆', 'Plutón': '♇'
    };

    return (
      <g key={idx}>
        <text x={cx} y={cy} fontSize="20" textAnchor="middle" dominantBaseline="middle" className="select-none">
          {symbols[planet.name] || '•'}
        </text>
        <line x1="200" y1="200" x2={cx} y2={cy} stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.3" />
      </g>
    );
  };

  return (
    <div className="relative w-full max-w-md mx-auto aspect-square">
      <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-2xl">
        {/* Background Circles */}
        <circle cx="200" cy="200" r="190" fill="#1A0B2E" stroke="#D4AF37" strokeWidth="2" />
        <circle cx="200" cy="200" r="150" fill="none" stroke="#3B1C5A" strokeWidth="1" />
        <circle cx="200" cy="200" r="90" fill="none" stroke="#3B1C5A" strokeWidth="1" />
        
        {/* Zodiac Signs (Simplified 12 sections) */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = i * 30;
          const rad = angle * (Math.PI / 180);
          const x2 = 200 + 190 * Math.cos(rad);
          const y2 = 200 + 190 * Math.sin(rad);
          return (
            <line key={`sign-${i}`} x1="200" y1="200" x2={x2} y2={y2} stroke="#3B1C5A" strokeWidth="1" />
          )
        })}

        {/* Ascendant Line */}
        <line x1="10" y1="200" x2="390" y2="200" stroke="#D4AF37" strokeWidth="2" strokeDasharray="5,5" />
        <text x="20" y="190" fill="#D4AF37" fontSize="12" fontWeight="bold">AC</text>

        {/* Planets */}
        {data.planets.map((planet, idx) => renderPlanet(planet, idx))}
        
        {/* Center Node */}
        <circle cx="200" cy="200" r="4" fill="#D4AF37" />
      </svg>
    </div>
  );
};

export default ZodiacWheel;
