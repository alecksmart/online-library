import { useFormikContext } from 'formik';

const FormReference = ({ setFormRef }) => {
  const formikContext = useFormikContext();
  if (setFormRef) {
    setFormRef(formikContext);
  }

  return null;
};

export default FormReference;
