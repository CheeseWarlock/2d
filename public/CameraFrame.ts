export type Segment = {
  start: {
    position: number,
    depth: number
  }, end: {
    position: number,
    depth: number
  }, color: string
}

export const depthAt = (segment: Segment, position: number) => {
  // FOV 0.25 - so 0.5 radians from min to max
  // const segmentSize = segment.end.position - segment.start.position;

  if (segment.start.depth === Infinity || segment.end.depth === Infinity) return Infinity;
  const proportionAlong = (position - segment.start.position) / (segment.end.position - segment.start.position);
  const depth = segment.start.depth * Math.cos(proportionAlong) + segment.end.depth * Math.sin(proportionAlong);
  // const depth = (segment.start.depth * (1 - proportionAlong)) + (segment.end.depth * proportionAlong);

  return depth;
}

export default class CameraFrame {
  segments: Segment[] = [{
    start: {
      position: 0,
      depth: Infinity
    },
    end: {
      position: 1,
      depth: Infinity
    },
    color: "white"
  }];

  add(newSegment: Segment) {
    // Start by flipping the segment so end is after start
    let start = newSegment.start;
    let end = newSegment.end;
    if (start.position > end.position) {
      const temp = start;
      newSegment.start = end;
      newSegment.end = temp;
    }
    console.log("");
    console.log(`~~Next new segment from ${newSegment.start.position} to ${newSegment.end.position}`)
    // TODO: Does the range need to be reduced to [0,1]?

    // get the existing segments that overlap the new one
    // Candidates... FOR REMOVAL!
    const candidates = this.segments.filter(existingSegment => {
      if (existingSegment.start.position < newSegment.end.position && newSegment.start.position < existingSegment.end.position) {
        return true;
      }
      return false;
    });

    const finalSegments = this.segments.filter(existingSegment => {
      if (existingSegment.start.position < newSegment.end.position && newSegment.start.position < existingSegment.end.position) {
        return false;
      }
      return true;
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
      console.log(`Next candidate! From ${candidate.start.position} to ${candidate.end.position}`)
      if (newSegment.end.position >= candidate.end.position && newSegment.start.position <= candidate.start.position) {
        console.log("  New overlaps old")
        // New segment completely covers candidate
        // Choose any position
        const pos = (candidate.start.position + candidate.end.position) / 2;
        const newSegmentDepth = depthAt(newSegment, pos);
        const candidateDepth = depthAt(candidate, pos);
        console.log("........", newSegmentDepth, candidateDepth);
        if (newSegmentDepth > candidateDepth) {
          console.log("    Old segment is closer");
          // Candidate is closer than new segment
          finalSegments.push(candidate);
        } else {
          console.log("    New Segment is closer");
          validRangesOfNewSegment.push({
            from: candidate.start.position,
            to: candidate.end.position
          });
        }
      } else if (newSegment.end.position <= candidate.end.position && newSegment.start.position >= candidate.start.position) {
        console.log("  Old overlaps new")
        // New segment's range is within candidate's
        // Choose any position
        const pos = (newSegment.start.position + newSegment.end.position) / 2;
        const newSegmentDepth = depthAt(newSegment, pos);
        const candidateDepth = depthAt(candidate, pos);
        if (newSegmentDepth > candidateDepth) {
          console.log("    Old segment is closer");
          // Candidate is closer than new segment
          // So we don't change anything
          finalSegments.push(candidate);
        } else {
          console.log("    New Segment is closer");
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
              position: candidate.end.position,
              depth: candidate.end.depth
            },
            color: candidate.color
          });
          finalSegments.push(newSegment);
        }
      } else if (newSegment.end.position > candidate.end.position) {
        // New segment hangs on higher end (new segment is overlap and greater)
        // Choose any position
        console.log("  Hanging on higher")
        const pos = (newSegment.start.position + candidate.end.position) / 2;
        const newSegmentDepth = depthAt(newSegment, pos);
        const candidateDepth = depthAt(candidate, pos);
        if (newSegmentDepth > candidateDepth) {
          console.log("    Old segment is closer");
          finalSegments.push(candidate);
        } else {
          console.log("    New Segment is closer");
          console.log(`    Pushing ${candidate.start.position} to ${newSegment.start.position}`);
          console.log(`    Validing ${newSegment.start.position} to ${candidate.end.position}`);
          
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
      } else if (newSegment.start.position < candidate.start.position) {
        console.log("  Hanging on lower")
        // New segment hangs on lower end
        // Choose any position
        const pos = (candidate.start.position + newSegment.end.position) / 2;
        const newSegmentDepth = depthAt(newSegment, pos);
        const candidateDepth = depthAt(candidate, pos);
        if (newSegmentDepth > candidateDepth) {
          console.log("    Old segment is closer");
          finalSegments.push(candidate);
        } else {
          console.log("    New Segment is closer");
          console.log(`    Pushing ${newSegment.end.position} to ${candidate.end.position}`);
          console.log(`    Validing ${candidate.start.position} to ${newSegment.end.position}`);
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
      } else {
        console.log("BQAD BNSFSEJNTFHG SEIARSAJHETSEDIT SEHRTFGSEDITRSEHISEDRTGHISEHRTGEITGSERTGHER THIS SHOULD NEVER HAPPEN")
      }
    });

    let actualRangesForNewSegment: { from: number, to: number }[] = [];
    

    validRangesOfNewSegment.forEach(range => {
      if (actualRangesForNewSegment.length && actualRangesForNewSegment[actualRangesForNewSegment.length - 1].to === range.from) {
        actualRangesForNewSegment[actualRangesForNewSegment.length - 1].to = range.to;
      } else {
        actualRangesForNewSegment.push(range);
      }
    });
    console.log(actualRangesForNewSegment.length + " ranges from " + validRangesOfNewSegment.length);

    actualRangesForNewSegment.forEach(range => {
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
    this.segments = finalSegments.filter(seg => seg.start.position !== seg.end.position).sort((a, b) => a.start.position - b.start.position);

    
    let segis = "";
    this.segments.forEach(seg => {
      segis += (`${seg.color} from ${seg.start.position.toFixed(3)} to ${seg.end.position.toFixed(3)},`);
    })
    console.log("Segments:", segis);
  }

  test() {
    const sorted = this.segments.slice().sort((a, b) => a.start.position - b.start.position);
    
    for (let i = 0; i < sorted.length - 1; i++) {
      // console.log(`TEST ${sorted[i].start.position} - ${sorted[i].end.position}, ${sorted[i + 1].start.position} - ${sorted[i + 1].end.position}`);
      // compare i with i+1
      if (sorted[i].end.position > sorted[i+1].start.position) {
        // Overlap!
        return false;
      }
    }
    return true;
  }
}