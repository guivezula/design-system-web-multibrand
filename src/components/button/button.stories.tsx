import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import { ifDefined } from "lit/directives/if-defined.js";
import { fn } from 'storybook/test';


import "./index";

const typeArray = ["button", "submit", "reset"];
const sizeArray = ["sm", "lg"];
const variantArray = ["primary", "secondary"];


const meta: Meta = {
  title: "Action/Button",
  argTypes: {
    variant: {
      name: "variant",
      description: "Define o estilo do botão",
      type: {name: "string", required: false},
      control: "select",
      options: variantArray,
      table: {
        category: "ATTRIBUTES",
        type: {summary: variantArray.join(" | ").toLowerCase()},
        defaultValue: {summary: "primary"},
      },
    },
    disabled: {
      name: "disabled",
      description: "Define se o botão está desabilitado",
      type: {name: "boolean", required: false},
      table: {
        category: "ATTRIBUTES",
        type: {summary: "boolean"},
        defaultValue: {summary: 'false'},
      },
    },
    loading: {
      name: "loading",
      description: "Define o estado de carregamento do botão",
      type: {name: "boolean", required: false},
      table: {
        category: "ATTRIBUTES",
        type: {summary: "boolean"},
        defaultValue: {summary: 'false'},
      },
    },
    type: {
      name: "type",
      description: "Define o atributo type do elemento button",
      type: {name: "string", required: false},
      control: false,
      options: typeArray,
      table: {
        category: "ATTRIBUTES",
        type: {summary: typeArray.join(" | ").toLowerCase()},
        defaultValue: {summary: "button"},
      },
    },
    size: {
      name: "size",
      description: "Define o tamanho do botão",
      type: {name: "string", required: false},
      control: "select",
      options: sizeArray,
      table: {
        category: "ATTRIBUTES",
        type: {summary: sizeArray.join(" | ").toLowerCase()},
        defaultValue: {summary: "sm"},
      },
    },
    slot: {
      name: "slot",
      description: "Conteúdo interno do componente",
      type: {name: "string", required: false},
      table: {
        category: "CHILDREN ELEMENTS",
        type: {summary: "string|HTMLElement"},
        defaultValue: {summary: ""},
      },
    },
    ariaLabel: {
      name: "aria-label",
      control: false,
      description: "Define o atributo aria-label do elemento button",
      type: {name: "string", required: false},
      table: {
        category: "ACCESSIBILITY",
        type: {summary: "string"},
        defaultValue: {summary: ""},
      },
    },
    dsClick: {
      name: "ds-click",
      action: "ds-click",
      description: "Evento disparado ao clicar no botão",
      table: {
        category: "EVENTS",
        type: {summary: "CustomEvent", detail: "{detail: { clicked: true }}"},
      },
    },
  },
  render: args => {
    return html`
      <ds-button
        ?disabled=${args.disabled}
        ?loading=${args.loading}
        .ariaLabel=${args.loading ? 'Carregando' : null}
        type=${ifDefined(args.type)}
        size=${ifDefined(args.size)}
        variant=${ifDefined(args.variant)}
        @ds-click=${args.dsClick}
      >
        ${args.slot}
      </ds-button>
    `;
  },
  parameters: {
    docs: {
      source: {
        code: `
<ds-button
    variant="primary"
    size="lg"
    type="button"
>
    Button
</ds-button>
                `,
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Primary: Story = {
  args: {
    slot: "Button",
    disabled: false,
    loading: false,
    type: "button",
    size: "lg",
    variant: "primary",
    dsClick: fn(),
  },
};

export const Secondary: Story = {
  args: {
    slot: "Button",
    disabled: false,
    loading: false,
    type: "button",
    size: "lg",
    variant: "secondary",
    dsClick: fn(),
  },
};

export const Disabled: Story = {
  args: {
    ...Primary.args,
    disabled: true,
  },
};

export const Loading: Story = {
  args: {
    ...Primary.args,
    loading: true,
  },
};
