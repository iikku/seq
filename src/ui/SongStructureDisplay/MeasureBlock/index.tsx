import React from 'react';
import { observer } from "mobx-react"
import Measure from '../../../SongStructure/Measure';
import SongAdvancer from '../../../SongAdvancer';

const MeasureBlock = observer(
  ({ measure, advancer, active } : { measure : Measure, advancer : SongAdvancer, active : boolean }) => (
  <div className={'measure ' + (active ? 'active' : '')}>
    {measure.name}
  </div>
));

export default MeasureBlock;
