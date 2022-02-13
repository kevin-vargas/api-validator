//TODO: one utils folder?
import { ResultValidator } from '../intefaces';

/*
interface callbackI {
    <T>(args: T[]) : string
}

interface makeResultI {
    <T>(cb: callbackI<T>) : ((args: T[]) => ResultValidator)
}
*/

type makeResultType = <T>(
  cb: (args: T[]) => string,
) => (args: T[]) => ResultValidator;

export const makeResult: makeResultType = (cb) => (elements) => ({
  result: elements.length === 0,
  info: elements.length > 0 ? cb(elements) : '',
});
