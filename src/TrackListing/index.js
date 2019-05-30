import React from 'react';
import { observer } from "mobx-react"
import Track from './Track';

const TrackListing = observer(({ tracks }) => (
  <ul>
    {tracks.map(track => <Track track={track} key={track.channel}/>)}
  </ul>
));

export default TrackListing;
