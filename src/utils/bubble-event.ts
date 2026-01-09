import { reactControllers } from "./controllers/react";
import { vueControllers } from "./controllers/vue";


export function bubbleEvent(
  host: object,
  event: Event,
  targetElement: Element,
): void {
  Object.defineProperties(event, {
    composed: {value: true},
    bubbles: {value: true},
    target: {value: targetElement},
  });

  reactControllers(host, event);
  vueControllers(host, event);
}
