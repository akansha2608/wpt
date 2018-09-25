import * as module from './export-on-dynamic-import-script.js';

let promises = [];
promises.push((async () => {
  // DedicatedWorkerGlobalScope doesn't fill in e.source,
  // so use e.target instead.
  const e = await new Promise(resolve => self.onmessage = resolve);
  return e.source ? e.source : e.target;
})());

promises.push((async () => {
  try {
    await module.ready;
    return module.importedModules;
  } catch(error) {
    return `Failed to do dynamic import: ${error}`;
  }
})());

Promise.all(promises).then((results) => {
  results[0].postMessage(results[1]);
});
