import React from 'react';
import { observer } from "mobx-react"

const KeyView = observer(({ songKey }) => (
  <div>
    Playing in the key of {songKey.base} {songKey.name}
  </div>
));

export default KeyView;
