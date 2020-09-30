
export function memo<T>(provider: () => T): () => T {
  let inInitialisation: boolean = false;
  let hasValue: boolean = false;
  let value: T;

  return () => {
    if (inInitialisation) {
      throw new Error('Singleton instance has circular reference');
    }
    if (!hasValue) {
      inInitialisation = true;
      value = provider();
      inInitialisation = false;
      hasValue = true;
    }

    return value;
  };
}
