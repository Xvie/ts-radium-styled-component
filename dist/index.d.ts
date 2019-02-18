import * as React from 'react';
export declare function deepMerge(rootAcc: any, ...elements: any[]): any;
export declare function getStyle<Theme = {}, Props = {}>(givenOverrideStyle: any, givenConstructorStyle: any, givenPropsStyle: any, constants: Theme, props: Props): any;
export declare const memoizeGetStyle: any;
export declare function createStyledComponent<Theme>(constants: Theme): {
    new <Props = {}, State = {}>(props: {
        style?: {} | undefined;
    } & Props): {
        calculateStyle: (givenOverrideStyle: any, givenConstructorStyle: any, givenPropsStyle: any, constants: Theme, props: any) => any;
        style: (theme: Theme, props: Props) => any;
        getStyle(overrideStyle?: ((theme: Theme) => any) | undefined): any;
        context: any;
        setState<K extends keyof State>(state: State | ((prevState: Readonly<State>, props: Readonly<{
            style?: {} | undefined;
        } & Props>) => State | Pick<State, K> | null) | Pick<State, K> | null, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        render(): React.ReactNode;
        readonly props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<{
            style?: {} | undefined;
        } & Props>;
        state: Readonly<State>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    contextType?: React.Context<any> | undefined;
};
