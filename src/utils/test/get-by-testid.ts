export default function getElmByTestId<T extends HTMLElement>(
  element: T,
  testid: string,
): T {
  return element.shadowRoot!.querySelector(`[data-testid="${testid}"]`)!;
}
