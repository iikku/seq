import React from 'react';
import { observer } from "mobx-react"

const Track = observer(({ track }) => (
  <div>
    {track.name} - {track.channel}
  </div>
));

export default Track;
