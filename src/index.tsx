import { useState, useEffect } from "react";

type Status = "recording" | "idle" | "error" | "stopped" | "paused";

const useScreenRecorder = ({
  options,
  audio = false,
}: {
  options?: MediaRecorderOptions;
  audio?: boolean;
}) => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [blob, setBlob] = useState<Blob | null>(null);
  const [error, setError] = useState<any>();
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>();
  const [status, setStatus] = useState<Status>("idle");
  const [streams, setStreams] = useState<{
    audio?: MediaStreamTrack | null;
    screen?: MediaStreamTrack | null;
  }>({ audio: null, screen: null });

  useEffect(() => {
    if (!mediaRecorder) return;
    mediaRecorder.ondataavailable = (event) => {
      const url = window.URL.createObjectURL(event.data);
      setBlobUrl(url);
      setBlob(event.data);
    };
  }, [mediaRecorder]);

  const requestMediaStream = async () => {
    try {
      const displayMedia = await navigator.mediaDevices.getDisplayMedia();

      let tracks = displayMedia?.getTracks();
      let streams = {
        screen:
          displayMedia
            .getTracks()
            .find((track: MediaStreamTrack) => track.kind === "video") || null,
      };

      if (audio) {
        const userMedia = await navigator.mediaDevices.getUserMedia({ audio });
        tracks = [...tracks, ...userMedia?.getTracks()];
        streams = {
          ...streams,
          ...{
            audio:
              (userMedia &&
                userMedia
                  .getTracks()
                  .find((track) => track.kind === "audio")) ||
              null,
          },
        };
      }

      const stream: MediaStream = new MediaStream(tracks);
      const mediaRecorder = new MediaRecorder(stream, options);
      setMediaRecorder(mediaRecorder);
      setStreams(streams);
      return mediaRecorder;
    } catch (e) {
      setError(e);
      setStatus("error");
    }
    return;
  };

  const stopRecording = () => {
    if (!mediaRecorder) throw Error("No media stream!");
    mediaRecorder?.stop();

    setStatus("stopped");

    mediaRecorder.stream.getTracks().forEach((track) => {
      track.stop();
    });
    setMediaRecorder(null);
  };

  const startRecording = async () => {
    const recorder = mediaRecorder ?? (await requestMediaStream());
    (recorder as MediaRecorder).start();
    setStatus("recording");
  };

  const pauseRecording = () => {
    if (!mediaRecorder) throw Error("No media stream!");
    mediaRecorder?.pause();
    setStatus("paused");
  };

  const resumeRecording = () => {
    if (!mediaRecorder) throw Error("No media stream!");
    mediaRecorder?.resume();
    setStatus("recording");
  };

  const resetRecording = () => {
    setBlobUrl(null);
    setError(null);
    setMediaRecorder(null);
    setStatus("idle");
  };

  return {
    blob,
    blobUrl,
    error,
    pauseRecording,
    resetRecording,
    resumeRecording,
    startRecording,
    status,
    stopRecording,
    streams,
  };
};

export default useScreenRecorder;
