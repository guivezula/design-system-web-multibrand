import { expect, fixture, html, oneEvent } from "@open-wc/testing";
import { describe, it, vi, expect as viExpect } from "vitest";
import getSlotContent from "../../utils/test/get-slot-content";
import Button from "./button";
import "./index";

describe("Button", () => {
  it("should render component with default attributes", async () => {
    const element = await fixture<Button>(html`<ds-button>Button</ds-button>`);
    await element.updateComplete;

    expect(element.type).to.be.eq("button");
    expect(element.size).to.be.eq("lg");
    expect(element.disabled).to.be.eq(false);
    expect(element.loading).to.be.eq(false);
    expect(element.ariaLabel).to.be.eq(null);
    expect(element.variant).to.be.eq("primary");
  });

  it("should render component with custom attributes", async () => {
    const element = await fixture<Button>(html`
      <ds-button size="sm" disabled loading ariaLabel="label">Button</ds-button>
    `);
    await element.updateComplete;

    expect(element.size).to.be.eq("sm");
    expect(element.disabled).to.be.eq(true);
    expect(element.loading).to.be.eq(true);
    expect(element.ariaLabel).to.be.eq("label");
  });

  it("should render component with the right content", async () => {
    const element = await fixture<Button>(html`<ds-button>Button</ds-button>`);
    await element.updateComplete;

    expect(getSlotContent(element).textContent).to.be.eq("Button");
  });

  it('should submit the form when the button type is "submit"', async () => {
    document.body.innerHTML = `
    <form>
      <ds-button type="submit">Button</ds-button>
    </form>
  `;

    await customElements.whenDefined("ds-button");

    const el = document.querySelector("ds-button") as Button;
    const form = document.querySelector("form") as HTMLFormElement;

    await el.updateComplete;

    const submitSpy = vi
      .spyOn(form, "requestSubmit")
      .mockImplementation(() => {});

    const button = el.shadowRoot!.querySelector("button") as HTMLButtonElement;
    button.click();

    viExpect(submitSpy).toHaveBeenCalled();
  });

  it("should dispatch focus on input", async () => {
    const el = await fixture<Button>(html`<ds-button>Button</ds-button>`);

    await el.updateComplete;

    const listener = oneEvent(el, "ds-click");

    el.shadowRoot?.querySelector("button")?.dispatchEvent(new Event("click"));
    const { detail } = await listener;
    expect(detail).to.have.deep.equal({ clicked: true });
  });

  it("should component match Shadow DOM structure", async () => {
    const el = await fixture<Button>(html`<ds-button>Button</ds-button>`);

    expect(el).shadowDom.to.eq(`
      <button
        class=\"ds-button ds-button--lg ds-button--primary\"
        aria-busy=\"false\"
      >
        <slot></slot>
      </button>`);
  });
});
