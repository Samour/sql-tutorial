
type Predicate<T> = (value: T) => boolean;
type MapFunction<T, R> = (value: T) => R;
type Provider<T> = () => T;

export interface Optional<T> {
  filter: (predicate: Predicate<T>) => Optional<T>;
  map: <R>(mapper: MapFunction<T, R>) => Optional<R>;
  get: () => T;
  orElse: (alt: T) => T;
  orElseGet: (provider: Provider<T>) => T;
  isPresent: () => boolean;
  isEmpty: () => boolean;
}

const emptyValue = (value: any): boolean => value === null || value === undefined;

class EmptyOptional<T> implements Optional<T> {

  public filter(predicate: Predicate<T>): Optional<T> {
    return this;
  }

  public map<R>(mapper: MapFunction<T, R>): Optional<R> {
    return this as unknown as Optional<R>;
  }

  public get(): T {
    throw new Error('Optional is empty');
  }

  public orElse(value: T): T {
    return value;
  }

  public orElseGet(provider: Provider<T>): T {
    return provider();
  }

  public isPresent(): boolean {
    return false;
  }

  public isEmpty(): boolean {
    return true;
  }
}

const emptyOptional: Optional<any> = new EmptyOptional();

class ValueOptional<T> implements Optional<T> {

  constructor(private readonly value: T) { }

  public filter(predicate: Predicate<T>): Optional<T> {
    if (predicate(this.value)) {
      return this;
    } else {
      return emptyOptional;
    }
  }

  public map<R>(mapper: MapFunction<T, R>): Optional<R> {
    const mappedValue = mapper(this.value);
    if (emptyValue(mappedValue)) {
      return emptyOptional;
    } else {
      return new ValueOptional(mappedValue);
    }
  }

  public get(): T {
    return this.value;
  }

  public orElse(value: T): T {
    return this.value;
  }

  public orElseGet(provider: Provider<T>): T {
    return this.value;
  }

  public isPresent(): boolean {
    return true;
  }

  public isEmpty(): boolean {
    return false;
  }
}

export const of = <T>(value: T): Optional<T> => {
  if (emptyValue(value)) {
    throw new Error('Null value');
  } else {
    return new ValueOptional(value);
  }
};

export const ofNullable = <T>(value: T | null | undefined): Optional<T> => {
  if (emptyValue(value)) {
    return emptyOptional;
  } else {
    return new ValueOptional(value as T);
  }
}

export const empty = <T>(): Optional<T> => emptyOptional;
