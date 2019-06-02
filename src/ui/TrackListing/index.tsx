import React from 'react';
import { observer } from "mobx-react"
import Track from '../../Track';
import TrackListItem from './TrackListItem';

const TrackListing = observer(({ tracks } : { tracks: Track[] }) => (
  <ul>
    {tracks.map(track => <TrackListItem track={track} key={track.channel}/>)}
  </ul>
));

export default TrackListing;
