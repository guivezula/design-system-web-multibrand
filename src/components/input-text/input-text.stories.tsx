import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { fn } from 'storybook/test';

import "./index";

const meta: Meta = {
  title: "Input/Input Text",
  argTypes: {
    disabled: {
      name: "disabled",
      description: "Define se o input está desabilitado",
      type: { name: "boolean", required: false },
      table: {
        category: "ATTRIBUTES",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    error: {
      name: "error",
      description: "Define se o input está em estado de erro",
      type: { name: "boolean", required: false },
      table: {
        category: "ATTRIBUTES",
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    id: {
      name: "id",
      description: "Atributo id do elemento",
      type: { name: "string", required: false },
      table: {
        category: "ACCESSIBILITY",
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
    value: {
      name: "value",
      description: "Valor do input",
      type: { name: "string", required: false },
      table: {
        category: "ATTRIBUTES",
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
    placeholder: {
      name: "placeholder",
      description: "Texto de placeholder do input",
      type: { name: "string", required: false },
      table: {
        category: "ATTRIBUTES",
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
    label: {
      name: "label",
      description: "Label exibida acima do input",
      type: { name: "string", required: false },
      table: {
        category: "ATTRIBUTES",
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
    supportText: {
      name: "support-text",
      description: "Texto de suporte abaixo do input",
      type: { name: "string", required: false },
      table: {
        category: "ATTRIBUTES",
        type: { summary: "string" },
        defaultValue: { summary: "" },
      },
    },
    dsInput: {
      name: "ds-input",
      action: "ds-input",
      description: "Evento disparado ao digitar",
      table: {
        category: "EVENTS",
        type: { summary: "CustomEvent" },
      },
    },
    dsChange: {
      name: "ds-change",
      action: "ds-change",
      description: "Evento disparado ao alterar o valor",
      table: {
        category: "EVENTS",
        type: { summary: "CustomEvent" },
      },
    },
    dsFocus: {
      name: "ds-focus",
      action: "ds-focus",
      description: "Evento disparado ao focar o input",
      table: {
        category: "EVENTS",
        type: { summary: "CustomEvent" },
      },
    },
    dsBlur: {
      name: "ds-blur",
      action: "ds-blur",
      description: "Evento disparado ao desfocar o input",
      table: {
        category: "EVENTS",
        type: { summary: "CustomEvent" },
      },
    },
  },
  render: args => {
    return html`
      <ds-input-text
        ?disabled=${args.disabled}
        ?error=${args.error}
        id=${ifDefined(args.id)}
        .value=${ifDefined(args.value)}
        .placeholder=${ifDefined(args.placeholder)}
        .label=${ifDefined(args.label)}
        .supportText=${ifDefined(args.supportText)}
        @ds-input=${args.dsInput}
        @ds-change=${args.dsChange}
        @ds-focus=${args.dsFocus}
        @ds-blur=${args.dsBlur}
      ></ds-input-text>
    `;
  },
  parameters: {
    docs: {
      source: {
        code: `
<ds-input-text
  label="Nome"
  placeholder="Digite seu nome"
  support-text="Ex.: Fulano de Tal"
></ds-input-text>
                `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    id: "input-text-1",
    value: "",
    disabled: false,
    error: false,
    placeholder: "Type the value here...",
    label: "Label",
    supportText: "Support text",
    dsInput: fn(),
    dsChange: fn(),
    dsFocus: fn(),
    dsBlur: fn(),
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    error: true,
    supportText: "Invalid value provided.",
  },
};

export const WithValue: Story = {
  args: {
    ...Default.args,
    value: "Lorem ipsum",
  },
};

