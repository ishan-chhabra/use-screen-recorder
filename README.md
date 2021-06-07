# use-screen-recorder

> React hook for easily recording screen using MediaStream APIs.

[![NPM](https://img.shields.io/npm/v/use-screen-recorder.svg)](https://www.npmjs.com/package/use-screen-recorder) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[Demo](https://ishan-chhabra.github.io/use-screen-recorder/)

## Install

```bash
yarn add use-screen-recorder
```

## Usage

```tsx
import * as React from "react";

import useScreenRecorder from "use-screen-recorder";

const Example = () => {
  const {
    blobUrl,
    pauseRecording,
    resetRecording,
    resumeRecording,
    startRecording,
    status,
    stopRecording,
  } = useScreenRecorder();

  return (
    <div>
      <video src={blobUrl} />

      <small>Status: {status}</small>

      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
      <button onClick={pauseRecording}>Pause Recording</button>
      <button onClick={resumeRecording}>Resume Recording</button>
      <button onClick={resetRecording}>Reset Recording</button>
    </div>
  );
};
```

## Props

### audio

A boolean value indicating if audio track should be added.

```yaml
type: boolean
default: false
```

### options

A `MediaRecorderOptions` object.

```yaml
type: object
default: {}
```

## License

MIT © [ishan-chhabra](https://github.com/ishan-chhabra)
See the LICENSE file for more information

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
