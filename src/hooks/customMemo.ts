import { memo } from "react";
import * as R from "ramda";

const comp = (prev, next) => {
  return R.equals(prev, next);
};

const customMemo = (elm) => {
  return memo(elm, comp);
};

export default customMemo;
