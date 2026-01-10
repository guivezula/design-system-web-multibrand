
const originalEmitWarning = process.emitWarning.bind(process);

process.emitWarning = ((...args: Parameters<typeof process.emitWarning>) => {
  const [warning] = args;

  if (
    typeof warning === "string" &&
    warning.includes("@open-wc/semantic-dom-diff")
  ) {
    return;
  }

  return originalEmitWarning(...args);
}) as typeof process.emitWarning;


const originalWarn = console.warn;

console.warn = (...args: unknown[]) => {
  if (
    typeof args[0] === "string" &&
    args[0].includes("Lit is in dev mode")
  ) {
    return;
  }

  originalWarn(...args);
};

