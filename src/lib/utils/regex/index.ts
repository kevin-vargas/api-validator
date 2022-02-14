export default {
  //R_PATH_SPINAL_CASE: /\/[a-z0-9]+(?:-[a-z0-9]+)*$/,
  R_PATH_SPINAL_CASE: /(\/[a-z0-9]+(-[a-z0-9]+)*)|(\/{[^/]*})/g,
  R_SNAKE_CASE: /^[a-z0-9]+(?:_[a-z0-9]+)*$/,
  R_THREE_BRACKETS_IN_PATH: /({[^/]*}.*){3}/,
  R_5XX_NUMBER: /^5[0-9][0-9]$/,
};
