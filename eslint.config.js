import eslintPluginAstro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  // '.claude/**' è gitignored (worktree di Claude Code): senza questo ignore
  // `npm run lint` in locale annega in centinaia di errori su file generati.
  {
    ignores: ['dist/**', '.astro/**', '.vercel/**', 'node_modules/**', '.claude/**'],
  },
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
);
