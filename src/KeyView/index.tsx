import React from 'react';
import { observer } from "mobx-react"
import Key from '../MusicTheory/Key';

const KeyView = observer(({ songKey } : { songKey : Key }) => (
  <div>
    Playing in the key of {songKey.base} {songKey.name}
  </div>
));

export default KeyView;
