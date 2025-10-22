import '../components/crusher-timeline.js';
import '../components/crusher-timeline-item.js';

export default {
  title: 'Components/Crusher Timeline',
  component: 'crusher-timeline',
};

// Template for showing multiple items
const Template = () => `
  <crusher-timeline>
    <crusher-timeline-item>
      <span slot="date" style="font-size: var(--crusher-font-size-sm); color: var(--crusher-text-secondary);">
        <i class="fa fa-calendar" style="margin-right: 0.5rem;"></i>Oct 2025
      </span>
      <h4 style="font-size: var(--crusher-font-size-lg); font-weight: var(--crusher-font-weight-semibold); margin: 0.25rem 0 0.5rem;">Phase 1: Foundation</h4>
      <p style="font-size: var(--crusher-font-size-base); color: var(--crusher-text-secondary);">Built the core design tokens and the CSS framework.</p>
    </crusher-timeline-item>
    
    <crusher-timeline-item>
      <span slot="date" style="font-size: var(--crusher-font-size-sm); color: var(--crusher-text-secondary);">
        <i class="fa fa-calendar" style="margin-right: 0.5rem;"></i>Nov 2025
      </span>
      <h4 style="font-size: var(--crusher-font-size-lg); font-weight: var(--crusher-font-weight-semibold); margin: 0.25rem 0 0.5rem;">Phase 2: Components</h4>
      <p style="font-size: var(--crusher-font-size-base); color: var(--crusher-text-secondary);">Created framework-agnostic web components with Lit.</p>
    </crusher-timeline-item>

    <crusher-timeline-item>
      <span slot="date" style="font-size: var(--crusher-font-size-sm); color: var(--crusher-text-secondary);">
        <i class="fa fa-calendar" style="margin-right: 0.5rem;"></i>Dec 2025
      </span>
      <h4 style="font-size: var(--crusher-font-size-lg); font-weight: var(--crusher-font-weight-semibold); margin: 0.25rem 0 0.5rem;">Phase 3: Finalization</h4>
      <p style="font-size: var(--crusher-font-size-base); color: var(--crusher-text-secondary);">Finalize the component library and publish for global use.</p>
    </crusher-timeline-item>
  </crusher-timeline>
`;

export const Default = Template.bind({});
