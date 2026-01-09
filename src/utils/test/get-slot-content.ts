/**
 * Get the slot content of a **DOM** element
 * @param element The **DOM** element get by fixture API
 * @param slotName The slot name to search for the slot content when the component has more than one slot
 * @returns The content node of the slot
 * @example
 * const button = await fixture<TgrButtonMini>(html`<tgr-button-mini>Button</tgr-button-mini>`);
 *
 * expect(getSlotContent(button).textContent).toContain('Button');
 *
 */
export default function getSlotContent<T extends Partial<HTMLElement>>(
  element: T,
  slotName?: string,
): Node {
  const slot = element.shadowRoot!.querySelector(
    `slot${slotName ? `[name=${slotName}]` : ""}`,
  ) as HTMLSlotElement;
  const nodes = slot!.assignedNodes();
  return nodes[0] as Text;
}
