import type { fontType } from '.';

type sizeType = 'small' | 'medium' | 'large';
type componentType = 'tag' | 'button';

export const TypographyPresets: Record<componentType, Record<sizeType, fontType>> = {
  tag: {
    small: 'body4',
    medium: 'body3',
    large: 'body2',
  },
  button: {
    small: 'title4',
    medium: 'title3',
    large: 'title2',
  },
};

export const getFontType = (component: componentType, size?: sizeType) => {
  return TypographyPresets[component][size ?? 'medium'];
};
