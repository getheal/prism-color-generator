import { useState } from 'react';
import ColorSwatch from './ColorSwatch';

const App = () => {
  const SEED_COLOR = { h: 341, s: 78, l: 51 };
  const [numColors, setNumColors] = useState(2);

  function generateColors(numColors: number, seedColor = { h: 341, s: 78, l: 51 }) {
    const colors = [seedColor];
    const hueDistance = 360 / numColors;

    const SATURATION_MIN = 50;
    const SATURATION_MAX = 100;
    const SATURATION_RANGE = SATURATION_MAX - SATURATION_MIN;
    const SATURATION_PARTITIONS = 3;
    const saturationDistance = SATURATION_RANGE / SATURATION_PARTITIONS;

    const LIGHTNESS_MIN = 40;
    const LIGHTNESS_MAX = 85;
    const LIGHTNESS_RANGE = LIGHTNESS_MAX - LIGHTNESS_MIN;
    const LIGHTNESS_PARTITIONS = 3;
    const lightnessDistance = LIGHTNESS_RANGE / LIGHTNESS_PARTITIONS;

    for (let i = 1; i < numColors; i++) {
      colors.push({
        h: (seedColor.h + hueDistance * i) % 360,
        s: SATURATION_MIN + ((saturationDistance * i) % SATURATION_RANGE),
        l: LIGHTNESS_MIN + ((lightnessDistance * i) % LIGHTNESS_RANGE),
      });
    }

    return colors;
  }

  return (
    <div className="container py-5">
      <header className="d-flex align-items-center justify-content-between">
        <h1 className="title">
          Prism <span>Color Generator</span>
        </h1>

        <section className="controls">
          <div className="d-flex align-items-center">
            <div className="form-group">
              <label htmlFor="numColors" className="form-label">
                Number of colors
              </label>
              <input type="range" className="form-range" min="2" max="32" step="1" id="numColors" value={numColors} onChange={(e) => setNumColors(parseInt(e.target.value))} />
            </div>

            <div className="numColors">{numColors}</div>
          </div>
        </section>
      </header>

      <main>
        <div className="row">
          {generateColors(numColors, SEED_COLOR).map((color, index) => (
            <div className="col-4" key={index}>
              <ColorSwatch index={index} h={color.h} s={color.s} l={color.l} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default App;
