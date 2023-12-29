const baseExtract = /^\[(.*)\].*$/;
const dateExtract = /^\[(\d+)-(\d+)-(\d+) (\d+):(\d+)\]/;
const guardExtract = /Guard #(\d+) begins shift/;

interface ConvertedGuardTracking {
  date: Date;
  content: string;
}

interface GuardShiftStorage {
  [key: string]: GuardShift;
}

interface GuardShift {
  cell: {
    [key: number]: {
      0: number;
      1: number;
    };
  };
}

export function sort(content: string[]): ConvertedGuardTracking[] {
  const converted: ConvertedGuardTracking[] = [];
  for (const c of content) {
    converted.push({
      date: new Date(c.match(baseExtract)![1]!),
      content: c,
    });
  }
  return converted.sort((a, b) => {
    return a.date.getTime() - b.date.getTime();
  });
}

export class ShiftTracker {
  private track: GuardShiftStorage = {};
  private state: 0 | 1 = 1; // 1 = awake, 0 = asleep
  private minute = -1;
  private clocked = '-1';

  public simulateUntil(content: string): void {
    const extract = content.match(dateExtract);
    let minute = parseInt(extract![5]!);

    // Default State for First Use
    if (this.minute === -1) {
      this.minute = minute;
      this.start(content);
    }

    // Simulate State
    while (this.minute !== minute) {
      const tracked: GuardShift = this.track[this.clocked] ?? {
        cell: {},
      };
      const cell = tracked.cell[this.minute] ?? {
        0: 0,
        1: 0,
      };
      cell[this.state] += 1;
      tracked.cell[this.minute] = cell;
      this.track[this.clocked] = tracked;

      this.minute++;
      if (this.minute > 59) this.minute = 0;
    }

    // Update for Next Simulation
    if (content.includes('up')) this.state = 1;
    if (content.includes('asleep')) this.state = 0;
    if (content.includes('begins shift')) this.start(content);
  }

  public getTrack(): GuardShiftStorage {
    return this.track;
  }

  private start(content: string): void {
    const extract = content.match(guardExtract);
    this.clocked = extract![1]!;
    this.state = 1;
  }
}
