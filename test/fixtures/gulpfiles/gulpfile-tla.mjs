const dynamicNoop = await Promise.resolve(function noop(cb) {
  cb();
});

export const registered = dynamicNoop;
export function exported(){};
export const string = 'no function';
