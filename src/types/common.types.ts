import { QueryClient } from '@tanstack/react-query';
import type { ReactNode } from 'react';
import type { IconType } from 'react-icons';

export type RouterContext = {
  queryClient: QueryClient;
};

export type ChildrenWrapperProps = {
  children: ReactNode;
};

export type ThemeStore = {
  theme: 'light' | 'dark';
  toggle: () => void;
};

export type Social = {
  link: string;
  icon: IconType;
};

export type SocialIconProps = {
  link: string;
  icon: ReactNode;
};
