let promises = [];
promises.push((async () => {
  // DedicatedWorkerGlobalScope doesn't fill in e.source,
  // so use e.target instead.
  const e = await new Promise(resolve => self.onmessage = resolve);
  return e.source ? e.source : e.target;
})());

promises.push((async () => {
  try {
    const module = await import('./export-on-load-script.js');
    return module.importedModules;
  } catch(error) {
    return `Failed to do dynamic import: ${error}`;
  }
})());

Promise.all(promises).then(results => {
  results[0].postMessage(results[1]);
});
