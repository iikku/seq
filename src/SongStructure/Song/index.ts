import { observable } from "mobx"
import {
  noteEveryTwoBeats,
  fixedMeasureBasedNoteResolver, fixedSectionBasedNoteResolver,
  defaultSectionBasedNoteResolver
} from '../../NoteResolvers';
import { major } from '../../MusicTheory/Scale';
import Key, { makeKey } from '../../MusicTheory/Key';
import { generateStructure } from '../../Composer';
import Section from '../Section';
import Track from '../../Track';

class Song {
    @observable bpm: number = 140;
    @observable key: Key = makeKey("E", major);
    structure: Section[] = generateStructure(this.key);

    tracks: Track[] = [
      new Track(
        "Bass",
        1,
        2,
        fixedSectionBasedNoteResolver(fixedMeasureBasedNoteResolver(noteEveryTwoBeats))
      ),
      new Track(
        "Pad",
        2,
        3,
        defaultSectionBasedNoteResolver
      ),
      new Track(
        "Lead",
        3,
        4,
        defaultSectionBasedNoteResolver
      )
    ];

    chordOfTheMoment(section: number, measure: number, microBeat: number) {
      return this.structure[section].measures[measure].chords[0];
    }
}

export default Song;
