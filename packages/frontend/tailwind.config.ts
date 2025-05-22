import { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        rorik: `#123123`,
      },
    },
  },
  plugins: [],
} satisfies Config;

export default config;
