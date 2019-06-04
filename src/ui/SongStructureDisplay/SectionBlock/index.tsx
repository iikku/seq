import React from 'react';
import { observer } from "mobx-react"
import Section from '../../../SongStructure/Section';
import SongAdvancer from '../../../SongAdvancer';
import MeasureBlock from '../MeasureBlock';

const SectionBlock = observer(
  ({ section, advancer, active } : { section : Section, advancer : SongAdvancer, active : boolean }) => (
  <div className={'section ' + (active ? 'active' : '')}>
    {section.name}
    {section.measures.map((measure, index) =>
      <MeasureBlock
        measure={measure}
        advancer={advancer}
        active={advancer.currentMeasure === index} />
    )}
  </div>
));

export default SectionBlock;
