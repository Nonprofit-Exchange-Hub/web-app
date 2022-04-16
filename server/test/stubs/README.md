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
      subject.firstName = 'new first name';
      expect(subject.firstName).not.toEqual(userEntityStub().firstName);
    });

    // Passes
    it('pojo should dirty test and fail', async () => {
      const og = {
        id: 234545,
        firstName: 'fakeUser',
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
      subject.firstName = 'new first name';
      expect(subject.firstName)not.toEqual(source.firstName).fail();
    });
```
