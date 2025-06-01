/* eslint-disable @typescript-eslint/no-namespace */

export namespace GroupedNavigationTypes {
  export type name = string;
  export type link = string;

  export type NavigationGroups = Record<name, NavigationGroup>;
  export type NavigationGroup = Record<name, link | NavigationSubGroup>;
  export type NavigationSubGroup = Record<name, link>;
}
