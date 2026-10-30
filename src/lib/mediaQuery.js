// Older Safari exposes addListener instead of the EventTarget methods.
export function listenToMediaQuery(query, listener) {
  if (typeof query.addEventListener === 'function') {
    query.addEventListener('change', listener);
    return () => query.removeEventListener('change', listener);
  }
  if (typeof query.addListener === 'function') {
    query.addListener(listener);
    return () => query.removeListener(listener);
  }
  return () => {};
}
