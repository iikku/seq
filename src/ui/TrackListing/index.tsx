import React from 'react';
import { observer } from "mobx-react"
import Track from '../../Track';
import TrackListItem from './TrackListItem';

const TrackListing = observer(({ tracks } : { tracks: Track[] }) => (
  <div>
    <h4>Tracks</h4>
    <ul>
      {tracks.map(track => <TrackListItem track={track} key={track.channel}/>)}
    </ul>
  </div>
));

export default TrackListing;
