import Ajv from 'ajv-draft-04';
import addFormats from 'ajv-formats';
import OAS3Schema from '../../../schemas/OAS3';
import { Validator } from '../intefaces';

const validate: Validator = (schema: unknown) => {
  const ajv = new Ajv({ strict: false });

  addFormats(ajv);
  const isValid = ajv.validate(OAS3Schema, schema);

  return {
    result: isValid,
    info: isValid ? '' : 'Error en validacion',
  };
};

validate.type = 'error';

export default validate;
