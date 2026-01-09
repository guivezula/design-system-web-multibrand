export function vueControllers(host: object, event: Event): void {
  //@ts-ignore
  if (!window.__VUE__) return;
  if (event.type !== "input") return;

  //@ts-ignore
  host.__vnode.props["onUpdate:modelValue"](host.__value);
}
