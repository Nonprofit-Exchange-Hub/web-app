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

How this impacts test? -> if you mutate a mutable stub, it will dirty other tests.
```typescript
    // Passes
    it('immuntable should not dirty test', async () => {
      const subject = userEntityStub();
      subject.first_name = 'new first name';
      expect(subject.first_name).not.toEqual(userEntityStub().first_name);
    });

    // Passes
    it('pojo should dirty test and fail', async () => {
      const og = {
        id: 234545,
        first_name: 'fakeUser',
        last_name: 'John',
        email: 'Doe',
        password: 'Secret1234$',
        assets: [],
        messages: [],
        transactions: [],
        organizations: [],
      };
      const subject = og;
      const source = og;
      subject.first_name = 'new first name';
      expect(subject.first_name)not.toEqual(source.first_name).fail();
    });
```
