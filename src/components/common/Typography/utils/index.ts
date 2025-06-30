import type { fontType } from '..';

type sizeType = 'small' | 'medium' | 'large';

type componentType = 'tag' | 'button' | 'input' | 'dropDown';

export const TypographyPresets: Record<componentType, Record<sizeType, fontType>> = {
  tag: {
    small: 'body4',
    medium: 'body3',
    large: 'body2',
  },
  button: {
    small: 'title3',
    medium: 'title2',
    large: 'title1',
  },
  input: {
    small: 'body5',
    medium: 'body4',
    large: 'body3',
  },
  dropDown: {
    small: 'body3',
    medium: 'body2',
    large: 'body1',
  },
};

export const getFontType = (component: componentType, size?: sizeType) => {
  return TypographyPresets[component][size ?? 'medium'];
};
