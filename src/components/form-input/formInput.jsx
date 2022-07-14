// Styled components
import {
  FormInputLabelStyles,
  InputStyles,
  GroupStyles,
} from "./formInput.styles";

export const FormInput = ({ label, ...inputOptions }) => {
  return (
    <GroupStyles>
      <InputStyles {...inputOptions} />
      {label && (
        <FormInputLabelStyles shrink={inputOptions.value.length}>
          {label}
        </FormInputLabelStyles>
      )}
    </GroupStyles>
  );
};
