import Chord from '../MusicTheory/Chord';
import { SectionBasedNoteResolver, MeasureBasedNoteResolver, BeatBasedNoteResolver } from '../NoteResolvers';

class Track {
  constructor(
    name: string,
    channel: number,
    targetOctave: number,
    noteResolver: SectionBasedNoteResolver
  ) {
    this.name = name;
    this.channel = channel;
    this.targetOctave = targetOctave;
    this.noteResolver = noteResolver;
  }

  name: string;
  channel: number;
  targetOctave: number;
  noteResolver: SectionBasedNoteResolver;

  // TODO These cached resolvers are nasty
  cachedMeasureBasedNoteResolver: MeasureBasedNoteResolver | null = null;
  cachedBeatBasedNoteResolver: BeatBasedNoteResolver | null = null;

  resolveNextNotes(
    section: number, measure: number, microBeat: number, chord: Chord
  ) {
    if (measure === 0 && microBeat === 0) this.clearCachedNoteResolvers(); // Yikes
    // if (this.cachedMeasureBasedNoteResolver === null) {
      this.cachedMeasureBasedNoteResolver = this.noteResolver(section);
    // }
    // if (this.cachedBeatBasedNoteResolver === null) {
      this.cachedBeatBasedNoteResolver = this.cachedMeasureBasedNoteResolver(measure);
    // }

    return this.cachedBeatBasedNoteResolver({microBeat, chord, targetOctave: this.targetOctave});
  }

  clearCachedNoteResolvers() {
    this.cachedMeasureBasedNoteResolver = null;
    this.cachedBeatBasedNoteResolver = null;
  }
}

export default Track;
