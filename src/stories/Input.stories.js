import '../components/crusher-input.js';

export default {
  title: 'Components/Crusher Input',
  component: 'crusher-input',
  argTypes: {
    label: { control: 'text' },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'date', 'number'],
    },
    placeholder: { control: 'text' },
    value: { control: 'text' },
  },
};

const Template = ({ label, type, placeholder, value }) => `
  <crusher-input
    label="${label}"
    type="${type}"
    placeholder="${placeholder}"
    value="${value}"
  ></crusher-input>
`;

export const Default = Template.bind({});
Default.args = {
  label: 'Full Name',
  type: 'text',
  placeholder: 'e.g., John Doe',
  value: '',
};

export const Email = Template.bind({});
Email.args = {
  label: 'Email Address',
  type: 'email',
  placeholder: 'you@example.com',
  value: '',
};

export const Password = Template.bind({});
Password.args = {
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
  value: '',
};
