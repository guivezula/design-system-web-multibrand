import { expect, fixture, html } from '@open-wc/testing';
import { describe, it } from 'vitest';
import Loading from './loading';

describe('Loading', () => {
  it('should render component', async () => {
    const el = await fixture<Loading>(html`<ds-loading></ds-loading>`);
    await el.updateComplete;

    expect(el).to.exist;
  });

  it("should match Shadow DOM structure", async () => {
    const el = await fixture<Loading>(html`<ds-loading></ds-loading>`);
    await el.updateComplete;

    await expect(el).shadowDom.to.eq(`
        <div class=\"ds-loading\">
            <span class=\"ds-loading__dot\" aria-hidden=\"true\"></span>
            <span class=\"ds-loading__dot\" aria-hidden=\"true\"></span>
            <span class=\"ds-loading__dot\" aria-hidden=\"true\"></span>
        </div>
    `);
  });
});
