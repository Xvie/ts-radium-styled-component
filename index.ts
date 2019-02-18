import * as React from 'react';
const memoize = require('fast-memoize');

function deepMergeObject(rootAcc: any, element: any): {} {
  if (
    typeof element === 'string' ||
    typeof element === 'number' ||
    typeof element === 'function' ||
    typeof element === 'undefined' ||
    typeof element === 'boolean' ||
    element === null
  ) {
    return element;
  }

  return Object.keys(element).reduce(
    (acc, key) => ({
      ...acc,
      [key]: deepMergeObject(rootAcc[key] || {}, element[key]),
    }),
    rootAcc,
  );
}

export function deepMerge(rootAcc: any, ...elements: any[]) {
  return elements.reduce(
    (acc, element) => deepMergeObject(acc, element),
    rootAcc,
  );
}

export function getStyle<Theme = {}, Props = {}>(
  givenOverrideStyle: any,
  givenConstructorStyle: any,
  givenPropsStyle: any,
  constants: Theme,
  props: Props,
) {
  const localStyle = resolveStyleObject<Theme>(
    givenOverrideStyle,
    constants,
    props,
  );

  const staticStyle = resolveStyleObject<Theme>(
    givenConstructorStyle,
    constants,
    props,
  );

  const propsStyle = Array.isArray(givenPropsStyle)
    ? deepMerge(
        {},
        ...givenPropsStyle.map(s =>
          resolveStyleObject<Theme>(s, constants, props),
        ),
      )
    : resolveStyleObject<Theme>(givenPropsStyle, constants, props);

  return deepMerge({}, staticStyle, propsStyle, localStyle);
}

export const memoizeGetStyle = memoize(getStyle);

function resolveStyleObject<Theme = {}>(
  functionOrObject = {},
  constants: Theme,
  props: any,
) {
  return typeof functionOrObject === 'function'
    ? functionOrObject(constants, props)
    : functionOrObject;
}

export function createStyledComponent<Theme>(constants: Theme) {
  return class StyledComponent<
    Props = {},
    State = {}
  > extends React.PureComponent<{ style?: {} } & Props, State> {
    calculateStyle: (
      givenOverrideStyle: any,
      givenConstructorStyle: any,
      givenPropsStyle: any,
      constants: Theme,
      props: any,
    ) => any;
    style!: (theme: Theme, props: Props) => any;

    constructor(props: { style?: {} } & Props) {
      super(props);
      this.calculateStyle = memoize(getStyle);
    }

    getStyle(overrideStyle?: (theme: Theme) => any) {
      const { style, ...restProps } = this.props;
      const diffProps = restProps as any;
      const fixedProps = Object.keys(restProps)
        .filter(
          key =>
            typeof diffProps[key] === 'string' ||
            typeof diffProps[key] === 'number' ||
            typeof diffProps[key] === 'boolean',
        )
        .reduce((acc, key) => ({ ...acc, [key]: diffProps[key] }), {});
      return this.calculateStyle(
        overrideStyle,
        this.style,
        style,
        constants,
        fixedProps,
      );
    }
  };
}
