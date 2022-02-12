import Ajv from 'ajv-draft-04';
import addFormats from 'ajv-formats';
import OAS3Schema from '../../../schemas/OAS3';
import { Validator } from '../intefaces';

const validate: Validator = (Schema) => {
  const ajv = new Ajv({ strict: false });
  addFormats(ajv);
  const isValid = ajv.validate(OAS3Schema, Schema);
  return isValid;
};

export default validate;
