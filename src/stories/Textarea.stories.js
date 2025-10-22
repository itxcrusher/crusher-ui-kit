import '../components/crusher-textarea.js';

export default {
  title: 'Components/Crusher Textarea',
  component: 'crusher-textarea',
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    rows: { control: 'number' },
  },
};

const Template = ({ label, placeholder, value, rows }) => `
  <crusher-textarea
    label="${label}"
    placeholder="${placeholder}"
    value="${value}"
    rows="${rows}"
  ></crusher-textarea>
`;

export const Default = Template.bind({});
Default.args = {
  label: 'Your Message',
  placeholder: 'Type your detailed message here...',
  value: '',
  rows: 4,
};

export const Longer = Template.bind({});
Longer.args = {
  label: 'Project Description',
  placeholder: 'Describe your project in detail...',
  value: '',
  rows: 8,
};