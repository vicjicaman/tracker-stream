import _ from 'lodash'
import * as Query from './query'

export const addFrame = ({
  streamid
}, {
  metadata,
  data,
  type,
  label
}, cxt) => {

  if (data === null) {
    return;
  }

  const stream = Query.get({
    streamid
  }, {}, cxt);

  if (stream) {
    stream.updatedOn = new Date();

    const frame = {
      frameid: stream.sequence++,
      metadata,
      data,
      type,
      label,
      addedOn: stream.updatedOn
    };

    stream.frames.unshift(frame);
    if (stream.frames > 500) {
      stream.frames.length = 500;
    }

    return frame;
  }

  return null;
}

export const clear = ({
  streamid
}, {}, cxt) => {

  const stream = Query.get({
    streamid
  }, {}, cxt);

  if (stream) {
    stream.updatedOn = new Date();
    stream.frames.length = 0;
  }

  return null;
}
