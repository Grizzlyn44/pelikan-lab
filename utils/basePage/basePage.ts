import _ from "lodash";

export const prepareProps = (props: object): any => {
  return _.omitBy(props, _.isUndefined);
};
