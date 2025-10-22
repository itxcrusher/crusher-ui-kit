import '../components/crusher-skill-bar.js';

export default {
  title: 'Components/Crusher Skill Bar',
  component: 'crusher-skill-bar',
  argTypes: {
    label: { control: 'text' },
    percentage: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
    },
  },
};

const Template = ({ label, percentage }) => `
  <crusher-skill-bar
    label="${label}"
    percentage="${percentage}"
  ></crusher-skill-bar>
`;

export const Default = Template.bind({});
Default.args = {
  label: 'DevOps',
  percentage: 85,
};

export const Beginner = Template.bind({});
Beginner.args = {
  label: 'Web3',
  percentage: 25,
};

export const Expert = Template.bind({});
Expert.args = {
  label: 'Cloud Infrastructure',
  percentage: 95,
};