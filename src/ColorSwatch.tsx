interface Props {
  index: number;
  h: number;
  s: number;
  l: number;
}

const ColorSwatch: React.FC<Props> = ({ index, h, s, l }) => {
  const renderDecimal = (number: number) => (Math.round(number) === number ? number : number.toFixed(2));

  function HSLToHex(h: number, s: number, l: number) {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;

    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    let rHex = r.toString(16);
    let gHex = g.toString(16);
    let bHex = b.toString(16);

    // Prepend 0s, if necessary
    if (rHex.length === 1) rHex = '0' + rHex;
    if (gHex.length === 1) gHex = '0' + gHex;
    if (bHex.length === 1) bHex = '0' + bHex;

    return '#' + rHex + gHex + bHex;
  }

  return (
    <div className="colorSwatch">
      <div className="d-flex align-items-center">
        <div className="colorIndex">{index + 1}</div>
        <div className="colorTile" style={{ backgroundColor: `hsl(${h}, ${s}%, ${l}%)` }}></div>
        <div className="colorValue">
          <div className="hsl">
            HSL(<span>{renderDecimal(h)}</span>, <span>{renderDecimal(s)}%</span>, <span>{renderDecimal(l)}%</span>)
          </div>
          <div className="hex">{HSLToHex(h, s, l)}</div>
        </div>
      </div>
    </div>
  );
};

export default ColorSwatch;
