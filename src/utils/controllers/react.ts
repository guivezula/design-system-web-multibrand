export function reactControllers(host: object, event: Event): void {
  if (!("__REACT__" in window)) return;

  const eventType =
    event.type === "input"
      ? "onChange"
      : `on${event.type.charAt(0).toUpperCase() + event.type.slice(1)}`;
  // @ts-ignore
  const reactProps =
    host[
      Object.getOwnPropertyNames(host).find(prop =>
        prop.includes("_reactProps"),
      ) as keyof typeof host
    ] ?? {};
  const eventHandler = reactProps[eventType] as
    | ((event: Event) => void)
    | undefined;

  if (!eventHandler) return;
  else {
    eventHandler(event);
  }
}
