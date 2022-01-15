# Stubbing Entities

## Return a new instance every time

The stubs need to return a new object every time to avoid referencing the same instance:

Ok:

```typescript
export const sampleStub = (): SampleEntity => {
  return {
    prop1: 'fakeval',
  };
};
```

Will run into problems:

```typescript
export const sampleStub: SampleEntity = {
  prop1: 'fakeval',
};
```
