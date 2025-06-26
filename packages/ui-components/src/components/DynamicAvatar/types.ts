export interface AvatarItem {
    id?: string | number;
    image?: string | null;
    name?: string;
    label?: string;
  }
  
  export interface DynamicAvatarProps {
    items: AvatarItem[];
    maxDisplayed?: number;
    spacing?: 'small' | 'medium' | number;
    size?: 'small' | 'medium' | 'large';
    showTotal?: boolean;
    showName?: boolean;
    variant?: 'circular' | 'rounded' | 'square';
  }