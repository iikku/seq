class Track {
  constructor(
    name: string,
    channel: number,
    notesFromChord: (chord: string[], microBeat: number) =>
                    { notes: string[], microBeats: number } | null
  ) {
    this.name = name;
    this.channel = channel;
    this.notesFromChord = notesFromChord
  }

  name: string;
  channel: number;
  notesFromChord: (chord: string[], microBeat: number) => { notes: string[], microBeats: number } | null;
}

export default Track;
