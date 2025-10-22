import { html } from 'lit';
import '../components/crusher-modal.js';
import '../components/crusher-button.js';
import '../components/crusher-input.js';

export default {
  title: 'Components/Crusher Modal',
  component: 'crusher-modal',
  argTypes: {
    open: { control: 'boolean' },
  },
};

const Template = ({ open }) => html`
  <crusher-button 
    @click=${() => { 
      const modal = document.querySelector('crusher-modal'); 
      modal.open = true; 
    }}
  >
    Open Modal
  </crusher-button>

  <crusher-modal 
    ?open=${open} 
    @close=${() => { 
      const modal = document.querySelector('crusher-modal'); 
      modal.open = false; 
    }}
  >
    <h2 slot="header">Create New Project</h2>
    <p>Fill out the details below to create your new project.</p>
    <crusher-input label="Project Name" placeholder="e.g., My Awesome App"></crusher-input>
    
    <div slot="footer">
      <crusher-button 
        variant="secondary"
        @click=${() => document.querySelector('crusher-modal').open = false}
      >
        Cancel
      </crusher-button>
      <crusher-button 
        @click=${() => document.querySelector('crusher-modal').open = false}
      >
        Create
      </crusher-button>
    </div>
  </crusher-modal>
`;

export const Default = Template.bind({});
Default.args = {
  open: false,
};
