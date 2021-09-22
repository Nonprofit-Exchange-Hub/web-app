// set.defaults.ts
// https://dev.to/bytebodger/default-props-in-react-ts-part-deux-2ic3
export default function setDefaults<Props, Defaults>(props: Props, defaults: Defaults): Required<Props> {
    let newProps: Required<Props> = {...props} as Required<Props>;
    const defaultKeys = Object.keys(defaults) as (string)[];
    defaultKeys.forEach(key => {
       const propKey = key as keyof Props;
       const defaultKey = key as keyof Defaults;
       Object.defineProperty(newProps, key, {
          value: props[propKey] !== undefined ? props[propKey] : defaults[defaultKey],
       });
    });
    return newProps;
 }