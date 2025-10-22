import '../components/crusher-section-title.js';

export default {
  title: 'Components/Crusher Section Title',
  component: 'crusher-section-title',
  argTypes: {
    slot: {
      control: 'text',
      description: 'The text content for the title',
    },
  },
};

const Template = ({ slot }) => `<crusher-section-title>${slot}</crusher-section-title>`;

export const Default = Template.bind({});
Default.args = {
  slot: 'My Awesome Section',
};

export const LongerTitle = Template.bind({});
LongerTitle.args = {
  slot: 'Qualifications & Experience',
};