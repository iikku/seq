import Measure from '../Measure';

class Section {
  constructor(name: string, measures: Measure[]) {
    this.name = name;
    this.measures = measures;
  }
  name: string;
  measures: Measure[];
}

export default Section;
