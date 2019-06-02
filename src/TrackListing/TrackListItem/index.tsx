import React from 'react';
import { observer } from "mobx-react"
import Track from '../../Track';

const TrackListItem = observer(({ track } : { track : Track }) => (
  <div>
    {track.name} - {track.channel}
  </div>
));

export default TrackListItem;
