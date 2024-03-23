/** @jsxImportSource frog/jsx */

import { CustomFrameContext } from ".";
import { backgroundStyles, warningStyles, titleStyles } from "./styles";

export const finishScreen = (c: CustomFrameContext) => {
  return c.res({
    image: "/swapsv2/images/finish",
  });
};
