// Shared stylelint config for all framework packages.
//
// The custom token-only-color rule (raw color values allowed only in
// tokens.css — blueprint §3/§7) lives in ./token-only-color.mjs. It is a
// stub at U0 and is NOT YET ENFORCED; U2 (token layer) implements it and
// flips it on here.
import tokenOnlyColor from './token-only-color.mjs';

export default {
  plugins: [tokenOnlyColor],
  rules: {
    'moldy/token-only-color': null // enabled in U2
  }
};
