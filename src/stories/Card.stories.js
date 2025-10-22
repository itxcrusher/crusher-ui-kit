import '../components/crusher-card.js';

// Documentation configuration
export default {
  title: 'Components/Crusher Card',
  component: 'crusher-card',
  // We can add arguments for content if needed, but a simple slot is often enough
  argTypes: {
    slot: {
      control: 'text', // Allows typing content directly in Storybook controls
      description: 'The content inside the card (HTML allowed)',
    }
  },
};

// Template for the story
const Template = ({ slot }) => `
  <crusher-card>
    ${slot || `
      <h3>Default Card Title</h3>
      <p>This is some default paragraph text inside the card. You can put any HTML content here.</p>
      <crusher-button style="margin-top: 1rem;">Action</crusher-button>
    `}
  </crusher-card>
`;

// Default story
export const Default = Template.bind({});
Default.args = {
  // You can set default slot content here if desired, otherwise the template's default is used.
};

// Story with custom content example
export const CustomContent = Template.bind({});
CustomContent.args = {
  slot: `
    <h2>Custom Title</h2>
    <p>This card demonstrates passing custom HTML content through the slot.</p>
    <img src="https://placehold.co/400x200/22c55e/ffffff?text=Placeholder" alt="Placeholder" style="max-width: 100%; border-radius: 0.5rem; margin-top: 1rem;">
  `,
};
