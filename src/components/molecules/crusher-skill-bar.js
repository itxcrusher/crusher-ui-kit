import { LitElement, html, css } from 'lit';

export class CrusherSkillBar extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin-bottom: var(--crusher-spacing-6);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      margin-bottom: var(--crusher-spacing-2);
    }
    .label {
      font-weight: var(--crusher-font-weight-medium);
      font-size: var(--crusher-font-size-base);
      color: var(--crusher-text-primary);
    }
    .percent-text {
      font-size: var(--crusher-font-size-sm);
      color: var(--crusher-text-secondary);
    }
    .progress {
      background-color: var(--crusher-border-primary);
      height: 8px;
      border-radius: var(--crusher-radius-full);
      width: 100%;
      overflow: hidden; /* Ensures the inner bar respects the radius */
    }
    .progress-in {
      height: 100%;
      border-radius: var(--crusher-radius-full);
      background-color: var(--crusher-color-brand-primary);
      transition: width 0.5s ease-in-out;
    }
  `;

  static properties = {
    label: { type: String },
    percentage: { type: Number },
  };

  constructor() {
    super();
    this.label = 'Skill';
    this.percentage = 50;
  }

  render() {
    // Ensure percentage is between 0 and 100
    const clampedPercentage = Math.max(0, Math.min(100, this.percentage));
    
    return html`
      <div class="skill-item">
        <div class="header">
          <h5 class="label">${this.label}</h5>
          <span class="percent-text">${clampedPercentage}%</span>
        </div>
        <div class="progress">
          <div class="progress-in" style="width: ${clampedPercentage}%"></div>
        </div>
      </div>
    `;
  }
}

customElements.define('crusher-skill-bar', CrusherSkillBar);