import { SimplexNoise } from 'three/examples/jsm/Addons';

const simplex = new SimplexNoise();

export default function noise(x, y, params) {
  const xs = x / params.scale + params.seed;
  const ys = y / params.scale + params.seed;

  const G = 2.0 ** -params.persistence;

  let amplitude = 1;
  let frequency = 1;
  let normalization = 0;
  let total = 0;

  for (let o = 0; o < params.octaves; o++) {
    const noiseValue = simplex.noise(xs * frequency, ys * frequency) * 0.5 + 0.5;
    total += noiseValue * amplitude;
    normalization += amplitude;
    amplitude *= G;
    frequency *= params.lacunarity;
  }

  total /= normalization;

  return Math.pow(total, params.exponentiation) * params.height;
}
