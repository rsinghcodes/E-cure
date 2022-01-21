import { merge } from "lodash";

import Input from "./Input";
import Button from "./Button";

import Backdrop from "./Backdrop";
import Typography from "./Typography";
import IconButton from "./IconButton";

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return merge(
    Input(theme),
    Button(theme),
    Backdrop(theme),
    Typography(theme),
    IconButton(theme)
  );
}
