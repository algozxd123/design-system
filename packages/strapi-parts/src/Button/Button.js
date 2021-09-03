import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import LoadingIcon from '@strapi/icons/LoadingIcon';
import { Text, ButtonText } from '../Text';
import { Box } from '../Box';
import { getDisabledStyle, getHoverStyle, getActiveStyle, getVariantStyle } from './utils';
import { VARIANTS, BUTTON_SIZES } from './constants';
import { BaseButton } from '../BaseButton';

const rotation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
`;

const LoadingWrapper = styled.div`
  animation: ${rotation} 2s infinite linear;
`;

// TODO: Check the L size button with Maeva
export const ButtonWrapper = styled(BaseButton)`
  padding: ${({ theme, size }) => `${size === 'S' ? theme.spaces[2] : '10px'} ${theme.spaces[4]}`};
  background: ${({ theme }) => theme.colors.primary600};
  border: none;
  ${Box} {
    display: flex;
    align-items: center;
  }
  ${Text} {
    color: ${({ theme }) => theme.colors.neutral0};
  }
  &[aria-disabled='true'] {
    ${getDisabledStyle}
    &:active {
      ${getDisabledStyle}
    }
  }
  &:hover {
    ${getHoverStyle}
  }
  &:active {
    ${getActiveStyle}
  }
  ${getVariantStyle}
  ${({ fullWidth }) =>
    fullWidth &&
    `
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  `}
`;

export const Button = React.forwardRef(
  ({ variant, startIcon, endIcon, disabled, children, onClick, size, loading, fullWidth, ...props }, ref) => {
    const isDisabled = disabled || loading;

    const handleClick = (e) => {
      if (!isDisabled && onClick) {
        onClick(e);
      }
    };

    return (
      <ButtonWrapper
        ref={ref}
        aria-disabled={isDisabled}
        disabled={isDisabled}
        size={size}
        variant={variant}
        onClick={handleClick}
        fullWidth={fullWidth}
        {...props}
      >
        {(startIcon || loading) && (
          <Box aria-hidden={true} paddingRight={2}>
            {loading ? (
              <LoadingWrapper>
                <LoadingIcon />
              </LoadingWrapper>
            ) : (
              startIcon
            )}
          </Box>
        )}

        {size === 'S' ? (
          <Text small={size === 'S'} bold>
            {children}
          </Text>
        ) : (
          <ButtonText>{children}</ButtonText>
        )}

        {endIcon && (
          <Box aria-hidden={true} paddingLeft={2}>
            {endIcon}
          </Box>
        )}
      </ButtonWrapper>
    );
  },
);

Button.displayName = 'Button';

Button.defaultProps = {
  disabled: false,
  endIcon: undefined,
  fullWidth: false,
  loading: false,
  onClick: undefined,
  size: 'S',
  startIcon: undefined,
  variant: 'default',
};
Button.propTypes = {
  children: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  endIcon: PropTypes.element,
  fullWidth: PropTypes.bool,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  size: PropTypes.oneOf(BUTTON_SIZES),
  startIcon: PropTypes.element,
  variant: PropTypes.oneOf(VARIANTS),
};
