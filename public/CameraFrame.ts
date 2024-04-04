type Segment = {
  start: {
    position: number,
    depth: number
  }, end: {
    position: number,
    depth: number
  }, color: string
}

export const depthAt = (segment: Segment, position: number) => {
  const proportionAlong = (position - segment.start.position) / (segment.end.position - segment.start.position);
  const depth = (segment.start.depth * (1 - proportionAlong)) + (segment.end.depth * proportionAlong);
  return depth;
}

export default class CameraFrame {
  segments: Segment[] = [];

  add(newSegment: Segment) {
    // Start by flipping the segment so end is after start
    let start = newSegment.start;
    let end = newSegment.end;
    if (start.position > end.position) {
      const temp = start;
      newSegment.start = end;
      newSegment.end = temp;
    }
    // TODO: Does the range need to be reduced to [0,1]?

    // get the existing segments that overlap the new one
    // Candidates... FOR REMOVAL!
    const candidates = this.segments.filter(existingSegment => {
      if (existingSegment.start.position <= newSegment.end.position && newSegment.start.position <= existingSegment.end.position) {
        return true;
      }
      return false;
    });

    const finalSegments = this.segments.filter(existingSegment => {
      if (existingSegment.start.position <= newSegment.end.position && newSegment.start.position <= existingSegment.end.position) {
        return true;
      }
      return false;
    });


    let validRangesOfNewSegment: { from: number, to: number }[] = [];

    // start with all the range of new segment
    // then go through candidates and remove parts of the range
    // then afterwards, break up the existing ranges and add in new ones as required
    // for now, assume lines do not intersect

    if (candidates.length === 0) {
      finalSegments.push(newSegment);
    }

    candidates.forEach((candidate) => {
      if (newSegment.end.position > candidate.end.position && newSegment.start.position < candidate.end.position) {
        // New segment completely covers candidate
        // Choose any position
        const pos = (newSegment.start.position + newSegment.end.position) / 2;
        const newSegmentDepth = depthAt(newSegment, pos);
        const candidateDepth = depthAt(candidate, pos);
        if (newSegmentDepth > candidateDepth) {
          // Candidate is closer than new segment
          finalSegments.push(candidate);
        } else {
          validRangesOfNewSegment.push({
            from: candidate.start.position,
            to: candidate.end.position
          });
        }
      } else if (newSegment.end.position < candidate.end.position && newSegment.start.position > candidate.end.position) {
        // New segment's range is within candidate's
        // Choose any position
        const pos = (candidate.start.position + candidate.end.position) / 2;
        const newSegmentDepth = depthAt(newSegment, pos);
        const candidateDepth = depthAt(candidate, pos);
        if (newSegmentDepth > candidateDepth) {
          // Candidate is closer than new segment
          // So we don't change anything
          finalSegments.push(candidate);
        } else {
          // There will only be this candidate
          finalSegments.push({
            start: {
              position: candidate.start.position,
              depth: candidate.start.depth
            },
            end: {
              position: newSegment.start.position,
              depth: depthAt(candidate, newSegment.start.position)
            },
            color: candidate.color
          });
          finalSegments.push({
            start: {
              position: newSegment.end.position,
              depth: depthAt(candidate, newSegment.end.position)
            },
            end: {
              position: newSegment.end.position,
              depth: candidate.end.position
            },
            color: candidate.color
          });
          finalSegments.push(newSegment);
        }
      } else if (newSegment.end.position > candidate.end.position) {
        // New segment hangs on higher end (new segment is overlap and greater)
        // Choose any position
        const pos = (newSegment.start.position + candidate.end.position) / 2;
        const newSegmentDepth = depthAt(newSegment, pos);
        const candidateDepth = depthAt(candidate, pos);
        if (newSegmentDepth > candidateDepth) {
          finalSegments.push(candidate);
        } else {
          finalSegments.push({
            start: {
              position: candidate.start.position,
              depth: candidate.start.depth
            },
            end: {
              position: newSegment.start.position,
              depth: depthAt(candidate, newSegment.start.position)
            },
            color: candidate.color
          });
          validRangesOfNewSegment.push({
            from: newSegment.start.position,
            to: candidate.end.position
          });
        }
      } else {
        // New segment hangs on lower end
        // Choose any position
        const pos = (candidate.start.position + newSegment.end.position) / 2;
        const newSegmentDepth = depthAt(newSegment, pos);
        const candidateDepth = depthAt(candidate, pos);
        if (newSegmentDepth > candidateDepth) {
          finalSegments.push(candidate);
        } else {
          finalSegments.push({
            start: {
              position: newSegment.end.position,
              depth: depthAt(candidate, newSegment.end.position)
            },
            end: {
              position: candidate.end.position,
              depth: candidate.end.depth
            },
            color: candidate.color
          });
          validRangesOfNewSegment.push({
            from: candidate.start.position,
            to: newSegment.end.position
          });
        }
      }
    });

    // let actualRangesForNewSegment: { from: number, to: number }[] = [];
    // let lastValue: number | undefined;

    // validRangesOfNewSegment.forEach(range => {
    //   if (lastValue === undefined) {
    //     actualRangesForNewSegment.push({
    //       from: range.from,
    //       to: range.to
    //     });
    //   } else if ()
    // });

    console.log("VALID RANGES", validRangesOfNewSegment.length);

    validRangesOfNewSegment.forEach(range => {
      finalSegments.push({
        start: {
          position: range.from,
          depth: depthAt(newSegment, range.from)
        },
        end: {
          position: range.to,
          depth: depthAt(newSegment, range.to)
        },
        color: newSegment.color
      });
    });

    this.segments = finalSegments;
  }

  test() {
    const sorted = this.segments.slice().sort((a, b) => a.start.position - b.start.position);
    
    for (let i = 0; i < sorted.length - 1; i++) {
      // compare i with i+1
      if (sorted[i].end.position > sorted[i+1].start.position) {
        // Overlap!
        return false;
      }
    }
    return true;
  }
}