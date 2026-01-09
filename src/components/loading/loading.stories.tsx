import type { Meta, StoryObj } from "@storybook/web-components";
import { html } from "lit";
import "./index";

const meta: Meta = {
  title: "Status/Loading",
  render: () => {
    return html`<ds-loading></ds-loading>`;
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      source: {
        code: `
<ds-loading></ds-loading>
                `,
      },
    },
  },
};
