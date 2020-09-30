import { ofNullable } from './optional';

interface MemoizeOptions {
  name?: string;
  proxyReentrancy?: boolean;
}

abstract class AbstractMemoizer<T> {

  protected inInitialisation: boolean = false;
  protected hasValue: boolean = false;
  protected value?: T;

  public constructor(private readonly provider: () => T, protected readonly options: MemoizeOptions) { }

  protected abstract onReentrancy(): T;

  protected receivedValue(value: T): void {
    this.value = value;
  }

  public getValue(): T {
    if (this.inInitialisation) {
      return this.onReentrancy();
    }
    if (!this.hasValue) {
      this.inInitialisation = true;
      this.receivedValue(this.provider());
      this.inInitialisation = false;
      this.hasValue = true;
    }

    return this.value as T;
  }
}

class SimpleMemoizer<T> extends AbstractMemoizer<T> {

  protected onReentrancy(): T {
    const name = ofNullable(this.options.name)
      .map((n) => ` '${n}'`)
      .orElse('');
    throw new Error(`Singleton instance${name} has circular reference`);
  }
}

class ReentrantProxyMemoizer<T> extends AbstractMemoizer<T> {

  private proxyInstance?: any;
  private proxyTarget?: T;

  private checkValue(): void {
    if (!this.hasValue) {
      throw new Error('Proxy has not yet been initialised');
    }
  }

  protected onReentrancy(): T {
    if (!this.proxyInstance) {
      this.proxyInstance = new Proxy({}, {
        get: (target, prop) => {
          this.checkValue();
          return (this.proxyTarget as any)[prop];
        },
        set: (target, prop, value) => {
          this.checkValue();
          return (this.proxyTarget as any)[prop] = value;
        },
        apply: (target, thisArg, args) => {
          this.checkValue();
          return (this.proxyTarget as any).apply(thisArg, args);
        },
      });
      this.value = this.proxyInstance;
    }

    return this.proxyInstance;
  }

  protected receivedValue(value: T): void {
    if (this.proxyInstance) {
      this.proxyTarget = value;
    } else {
      super.receivedValue(value);
    }
  }
}

const selectMemoizer = <T>(provider: () => T, options: MemoizeOptions): AbstractMemoizer<T> => {
  if (options.proxyReentrancy) {
    return new ReentrantProxyMemoizer(provider, options);
  } else {
    return new SimpleMemoizer(provider, options);
  }
}

export function memo<T>(provider: () => T, options: MemoizeOptions = {}): () => T {
  const memoizer = selectMemoizer(provider, options);
  return () => memoizer.getValue();
}
