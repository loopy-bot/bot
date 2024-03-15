export function logMethodName(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey}...`);
    const result = originalMethod.apply(this, args);
    return result;
  };

  return descriptor;
}
