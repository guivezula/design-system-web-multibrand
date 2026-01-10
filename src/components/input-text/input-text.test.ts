import { expect, fixture, html, oneEvent } from "@open-wc/testing";
import { describe, it } from "vitest";

import "./index";

import getElmByTestId from "../../utils/test/get-by-testid";
import InputText from "./input-text";

const InputTextDataId = {
  LABEL: "ds-input-text__label",
  INPUT: "ds-input-text__input",
  WRAPPER: "ds-input-text__wrapper",
  SUPPORT_TEXT: "ds-input-text__support-text",
} as const;

describe("InputText", () => {
  it("should render the component", async () => {
    const el = await fixture<InputText>(html`<ds-input-text></ds-input-text>`);

    await el.updateComplete;

    expect(el.disabled).to.be.false;
    expect(el.error).to.be.false;
    expect(el.label).to.equal("");
    expect(el.placeholder).to.equal("");
    expect(el.supportText).to.equal("");
    expect(el.value).to.equal("");
  });

  it("should render the label", async () => {
    const el = await fixture<InputText>(
      html`<ds-input-text id="text" label="Input Label"></ds-input-text>`
    );

    await el.updateComplete;

    const label = getElmByTestId(el, InputTextDataId.LABEL);

    expect(el.label).to.eq("Input Label");
    expect(label?.textContent).to.contain("Input Label");
  });

  it("should render the support text", async () => {
    const el = await fixture<InputText>(
      html`<ds-input-text id="text" supportText="Support Text"></ds-input-text>`
    );

    await el.updateComplete;

    const supportText = getElmByTestId(el, InputTextDataId.SUPPORT_TEXT);

    expect(el.supportText).to.eq("Support Text");
    expect(supportText?.textContent).to.contain("Support Text");
  });

  it("should render the placeholder", async () => {
    const el = await fixture<InputText>(
      html`<ds-input-text id="text" placeholder="Placeholder"></ds-input-text>`
    );

    await el.updateComplete;

    const input = getElmByTestId(el, InputTextDataId.INPUT);

    expect(el.placeholder).to.eq("Placeholder");
    expect(input?.getAttribute("placeholder")).to.eq("Placeholder");
  });

  it("should disable the input", async () => {
    const el = await fixture<InputText>(
      html`<ds-input-text id="text" .disabled=${true}></ds-input-text>`
    );

    await el.updateComplete;

    const input = getElmByTestId(el, InputTextDataId.INPUT);

    expect(el.disabled).to.be.true;
    expect(input?.hasAttribute("disabled")).to.be.true;
  });

  it("should set error state", async () => {
    const el = await fixture<InputText>(
      html`<ds-input-text id="text" .error=${true}></ds-input-text>`
    );

    await el.updateComplete;

    const input = getElmByTestId(el, InputTextDataId.INPUT);

    expect(el.error).to.be.true;
    expect(input?.getAttribute("aria-invalid")).to.eq("true");
  });

  it("should set the value", async () => {
    const el = await fixture<InputText>(
      html`<ds-input-text id="text" .value=${"Input Value"}></ds-input-text>`
    );

    await el.updateComplete;

    const input = getElmByTestId(el, InputTextDataId.INPUT);

    expect(el.value).to.eq("Input Value");
    expect(input.value).to.eq("Input Value");
  });

  it("should dispatch focus on input", async () => {
    const el = await fixture<InputText>(
      html`<ds-input-text id="text"></ds-input-text>`
    );

    await el.updateComplete;

    const listener = oneEvent(el, "ds-focus");

    getElmByTestId(el, InputTextDataId.INPUT).dispatchEvent(new Event("focus"));
    const { detail } = await listener;
    expect(detail).to.have.deep.equal({ focused: true });
  });

  it("should dispatch blur on input", async () => {
    const el = await fixture<InputText>(
      html`<ds-input-text id="text"></ds-input-text>`
    );

    await el.updateComplete;

    const listener = oneEvent(el, "ds-blur");

    getElmByTestId(el, InputTextDataId.INPUT).dispatchEvent(new Event("blur"));
    const { detail } = await listener;
    expect(detail).to.have.deep.equal({ focused: false });
  });

  it("should dispatch change on input", async () => {
    const el = await fixture<InputText>(
      html`<ds-input-text id="text"></ds-input-text>`
    );

    await el.updateComplete;

    const listener = oneEvent(el, "ds-change");
    const input = getElmByTestId(el, InputTextDataId.INPUT);

    input.value = "New Value";
    input.dispatchEvent(new Event("change"));
    const { detail } = await listener;
    expect(detail).to.have.deep.equal({ value: "New Value" });
  });

  it("should dispatch input on input", async () => {
    const el = await fixture<InputText>(
      html`<ds-input-text id="text"></ds-input-text>`
    );

    await el.updateComplete;

    const listener = oneEvent(el, "ds-input");
    const input = getElmByTestId(el, InputTextDataId.INPUT);

    input.value = "New Value";
    input.dispatchEvent(new Event("input"));
    const { detail } = await listener;
    expect(detail).to.have.deep.equal({ value: "New Value" });
  });

  it("should match Shadow DOM structure", async () => {
    const el = await fixture<InputText>(
      html`<ds-input-text
        label="Input Label"
        placeholder="Placeholder"
        supportText="Support Text"
        id="text-id"
      ></ds-input-text>`
    );

    await el.updateComplete;

    expect(el).shadowDom.to.eq(`
      <div aria-disabled="false" class="ds-input-text">
        <div class="ds-input-text__wrapper" data-expanded="false" data-testid="ds-input-text__wrapper">
          <label class="ds-input-text__label" data-testid="ds-input-text__label" for="text-id">
          Input Label
          </label>
          <input id="text-id" aria-describedby="text-id-support-text" aria-invalid="false" class="ds-input-text__input" data-testid="ds-input-text__input" placeholder="Placeholder" type="text">
        </div>
        <div aria-live="polite" class="ds-input-text__support-text" data-testid="ds-input-text__support-text" id="text-id-support-text">
          Support Text
        </div>
      </div>
    `);
  });
});
