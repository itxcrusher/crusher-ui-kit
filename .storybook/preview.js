import '../src/css/tokens.css';
import '../src/css/modes.css';
import '../src/css/themes/glass.css';
import '../src/css/themes/brutal.css';
import '../src/scss/main.scss';

export default {
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Design dialect',
      defaultValue: 'glass',
      toolbar: { icon: 'paintbrush', items: ['glass', 'brutal'] }
    },
    mode: {
      name: 'Mode',
      description: 'Light/Dark',
      defaultValue: 'light',
      toolbar: { icon: 'mirror', items: ['light', 'dark'] }
    }
  },
  decorators: [
    (Story, ctx) => {
      const { theme, mode } = ctx.globals;
      document.documentElement.setAttribute('data-theme', theme);
      document.documentElement.setAttribute('data-mode', mode);
      return Story();
    }
  ],
  parameters: {
    backgrounds: {
      default: 'gradient',
      values: [
        { name: 'gradient', value: 'linear-gradient(to right top, #61dafb, #d946ef, #f97316, #3b82f6)' },
        { name: 'light', value: '#f8fafc' },
        { name: 'dark', value: '#020617' }
      ]
    }
  }
};
