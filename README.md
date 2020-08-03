# frak

[Demo](https://imgur.com/a/YwX6lmY)

frak (BSG anyone?) is a POC extension I built to learn what the [MediaStream Recording API](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API) was capable of. It essentially lets you click the video element you want to record, then once you pause the video again it prompts you to download the created video. 


### Limitations
- If the bitrate or dimensions of the video change in the middle of a recording (very possible for adaptive bitrate streaming), the resulting video will be corrupted. I think one possible way to resolve this would be to try to detect this event and keep the segments stored separately, then using something like FFMPEG (probably backend, webassembly build exist but are still pretty slow) to combine the two.
- The video output format is largely restricted to `.webm`
- Some larger sites like Youtube have more protection around the video element to prevent this
