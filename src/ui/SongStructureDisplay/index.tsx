import React from 'react';
import { observer } from "mobx-react";
import Song from '../../SongStructure/Song';
import SongAdvancer from '../../SongAdvancer';
import SectionBlock from './SectionBlock';
import './SongStructureDisplay.scss';

const SongStructureDisplay = observer(
    ({ song, advancer } : { song : Song, advancer : SongAdvancer }) => (
  advancer
  ?
  <div className="songStructure">
    {song.structure.map(
      (section, index) =>
        <SectionBlock
          section={section}
          advancer={advancer}
          active={advancer.currentSection === index} />
    )}
    <br />
  </div>
  :
  <div>
    No current asdf
  </div>
));

export default SongStructureDisplay;
