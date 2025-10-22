import '../components/crusher-style-switcher.js';
import '../components/crusher-card.js';
import '../components/crusher-button.js';

export default {
  title: 'Components/Crusher Style Switcher',
  component: 'crusher-style-switcher',
};

const Template = () => `
  <crusher-card>
    <h3>Interactive Demo</h3>
    <p>The style switcher is a global component. Use the controls on the right to change the theme of this entire page and all components within it.</p>
    <crusher-button style="margin-top: 1rem;">Themed Button</crusher-button>
  </crusher-card>
  <crusher-style-switcher></crusher-style-switcher>
`;

export const Default = Template.bind({});