const code =
  "let promises = [];" +
  "promises.push((async () => {" +
  "  const e = await new Promise(resolve => self.onmessage = resolve);" +
  "  return e.source ? e.source : e.target;" +
  "})());" +
  "promises.push((async () => {" +
  "  try {" +
  "    const module = await import('./export-on-static-import-script.js');" +
  "    return module.importedModules;" +
  "  } catch(error) {" +
  "    return `Failed to do dynamic import: ${error}`;"+
  "  }" +
  "})());" +
  "Promise.all(promises).then((results) => {" +
  "  results[0].postMessage(results[1]);" +
  "});";
eval(code);
