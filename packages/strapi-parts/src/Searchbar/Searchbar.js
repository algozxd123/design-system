import React, { forwardRef, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import SearchIcon from '@strapi/icons/SearchIcon';
import CloseAlertIcon from '@strapi/icons/CloseAlertIcon';
import { sizes } from '../themes/sizes';
import { Field, FieldLabel, FieldAction, FieldInput, InputWrapper } from '../Field';
import { VisuallyHidden } from '../VisuallyHidden';
import { Row } from '../Row';

const CloseIconWrapper = styled(Row)`
  font-size: 0.5rem;
  svg path {
    fill: ${({ theme }) => theme.colors.neutral400};
  }
`;

const SearchIconWrapper = styled(Row)`
  font-size: 0.8rem;

  svg path {
    fill: ${({ theme }) => theme.colors.neutral800};
  }
`;

const SearchbarWrapper = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius};
  box-shadow: ${({ theme }) => theme.shadows.filterShadow};

  &:focus-within {
    ${SearchIconWrapper} {
      svg path {
        fill: ${({ theme }) => theme.colors.primary600};
      }
    }
  }

  ${InputWrapper} {
    border: 1px solid transparent;
  }

  ${InputWrapper}:focus-within {
    outline: none;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.6);
  }

  /**
  Focused is managed at the wrapper level */
  input {
    outline: none;
  }
`;

export const Searchbar = forwardRef(({ name, size, children, value, onClear, clearLabel, ...props }, ref) => {
  const inputRef = useRef(null);
  const isCompleting = value.length > 0;

  const handleClear = (e) => {
    onClear(e);
    inputRef.current.focus();
  };

  const actualRef = ref || inputRef;

  return (
    <SearchbarWrapper>
      <Field name={name}>
        <VisuallyHidden>
          <FieldLabel>{children}</FieldLabel>
        </VisuallyHidden>

        <FieldInput
          ref={actualRef}
          value={value}
          startAction={
            <SearchIconWrapper>
              <SearchIcon aria-hidden={true} />
            </SearchIconWrapper>
          }
          size={size}
          endAction={
            isCompleting ? (
              <FieldAction label={clearLabel} onClick={handleClear}>
                <CloseIconWrapper>
                  <CloseAlertIcon />
                </CloseIconWrapper>
              </FieldAction>
            ) : undefined
          }
          {...props}
        />
      </Field>
    </SearchbarWrapper>
  );
});

Searchbar.displayName = 'Searchbar';

Searchbar.defaultProps = {
  value: '',
  size: 'M',
};

Searchbar.propTypes = {
  children: PropTypes.string.isRequired,
  clearLabel: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClear: PropTypes.func.isRequired,
  size: PropTypes.oneOf(Object.keys(sizes.input)),
  value: PropTypes.string,
};
