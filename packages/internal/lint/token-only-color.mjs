// STUB — not yet enforced (U0). U2 implements the real check.
//
// Contract (blueprint §3): tokens.css is the only source file allowed to
// contain raw color values (hex, rgb()/hsl()/etc. with literal channels,
// named colors). Everything else must use var(). U2 fills in the walker
// below and switches the rule on in stylelint.config.mjs.
import stylelint from 'stylelint';

const ruleName = 'moldy/token-only-color';

const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: (value) => `Raw color value "${value}" outside tokens.css — use var() (enforced from U2)`
});

const rule = (enabled) => (root, result) => {
  if (!enabled) return;
  // U2: walk declarations, skip files named tokens.css, report raw colors.
};

rule.ruleName = ruleName;
rule.messages = messages;

export default stylelint.createPlugin(ruleName, rule);
