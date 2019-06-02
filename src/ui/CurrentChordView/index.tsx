import React from 'react';
import { observer } from "mobx-react"
import Chord from '../../MusicTheory/Chord';

const CurrentChordView = observer(({ chord } : { chord : Chord | null }) => (
  chord
  ?
  <div>
    Current chord: {chord.base} {chord.quality.name}
  </div>
  :
  <div>
    No current chord
  </div>
));

export default CurrentChordView;
