import '../components/crusher-button.js'; // Import the component

// This is the documentation configuration for the component
export default {
  title: 'Components/Crusher Button',
  component: 'crusher-button',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary'],
    },
    slot: {
      control: 'text',
    }
  },
};

// This is the template for a single story
const Template = ({ variant, slot }) => `
  <crusher-button variant="${variant}">${slot}</crusher-button>
`;

// This creates the "Primary" story
export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
  slot: 'Primary Button',
};

// This creates the "Secondary" story
export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
  slot: 'Secondary Button',
};
