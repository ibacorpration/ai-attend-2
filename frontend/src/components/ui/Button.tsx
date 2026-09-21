import React from 'react';
import { Button as HeroButton, ButtonProps as HeroButtonProps } from '@heroui/react';

interface ButtonProps extends Omit<HeroButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'solid' | 'flat' | 'ghost' | 'light';
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  icon,
  className = '',
  ...props 
}) => {
  let mappedColor: HeroButtonProps['color'] = 'primary';
  let mappedVariant: HeroButtonProps['variant'] = 'solid';

  if (variant === 'primary') { mappedColor = 'primary'; mappedVariant = 'solid'; }
  else if (variant === 'secondary') { mappedColor = 'default'; mappedVariant = 'flat'; }
  else if (variant === 'danger') { mappedColor = 'danger'; mappedVariant = 'solid'; }
  else if (variant === 'outline') { mappedColor = 'primary'; mappedVariant = 'bordered'; }
  else { mappedVariant = variant as HeroButtonProps['variant']; }

  return (
    <HeroButton 
      color={mappedColor} 
      variant={mappedVariant} 
      startContent={icon}
      className={className}
      {...props}
    >
      {children}
    </HeroButton>
  );
};
