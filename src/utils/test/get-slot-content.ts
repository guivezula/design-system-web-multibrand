export default function getSlotContent<T extends Partial<HTMLElement>>(
  element: T,
  slotName?: string
): Node {
  const slot = element.shadowRoot!.querySelector(
    `slot${slotName ? `[name=${slotName}]` : ""}`
  ) as HTMLSlotElement;
  const nodes = slot!.assignedNodes();
  return nodes[0] as Text;
}
