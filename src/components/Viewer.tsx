import React from "react";

// See https://developer.mozilla.org/en-US/docs/Web/Guide/Audio_and_video_delivery/Adding_captions_and_subtitles_to_HTML5_video
// 
function Viewer(props:any) {

  let project = props.project;

  /** TODO: uncomment the code below if reinstating Create Transcript button
      in future iterations */

  // let data = {
  //   "Insights": {
  //     "FileName": project + ".ogg_insights.json"
  //   },
  //   "Transcript": {
  //     "FileName": project + ".vtt"
  //   }
  // };

  // async function createTranscript(): Promise<string> {
  //   console.info("fetching",JSON.stringify(data));
  //   let response = await fetch('/api/HttpJsonTranscript', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(data),
  //   });
  //   if (!response.ok) {
  //     throw new Error('Unable to create transcript');
  //   }
  //   return await response.text();
  // }

  return (
    <div className="viewer">
      <div className="container">
            <p>
            </p>
            <p>
        {/* <button id="transcript" onClick={createTranscript}>Create transcript</button> */}
        </p>
            <p>
              <video controls id="video" preload="metadata" crossOrigin="*" autoPlay>
                {/* TODO: Update src x2 below to match chosen storage option */}
                <source src={"https://msarecap.blob.core.windows.net/recordings/" + project + ".webm"}
                  type="video/webm" />
                <track label="English" kind="subtitles" srcLang="en" src={"https://msarecap.blob.core.windows.net/recordings/" + project + ".vtt"} default>
                </track>

              </video>
            </p>
          </div>
        </div>
  );
}

export default Viewer;