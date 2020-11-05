import React, { useState } from "react";
import { Button } from "@material-ui/core";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import PauseIcon from '@material-ui/icons/Pause';
import StopIcon from '@material-ui/icons/Stop';
import Tooltip from '@material-ui/core/Tooltip';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core';
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { blue } from '@material-ui/core/colors';

import Viewer from "./Viewer";

import {
  enableMicrophone, disableMicrophone, startAudioCapture, stopAudioCapture,
  downloadAudioCapture, pauseAudioCapture, getAudioCaptureBlob
} from "../audio_capture";
import {
  startScreenCapture, stopScreenCapture, enableScreenCap, disableScreenCap,
  downloadScreenCapture, pauseScreenCapture, getCaptureBlob
} from "../capture";
import { projectName, uploadBlob } from "../azure_upload";
import { withRouter } from "react-router-dom";

// const logArray = Array(<></>);

const GlobalCss = withStyles({
  '@global': {
    '.MuiAccordionDetails-root': {
      display: 'block'
    },
  }
})(() => null);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[900],
    }
  }
});

function Home() {

  const [disabled, setDisabled] = useState({ enable: false, start: true, pause: true, end: true, complete: true, upload: true, download: true });

  const [filename, setFilename] = useState("recording");

  const [project, setProject] = useState('');

  const [expanded, setExpanded] = useState('panel1')

  function download() {
    downloadScreenCapture(filename);
    downloadAudioCapture(filename);
  }

  // let log = '';

  /*
  const [log, setLog] = useState(<></>);


  let updateLog = (cl: string, msg: string) => {
    logArray.push(<span className={cl}>{msg}<br></br></span>);
    setLog(<>{[...logArray]}</>);
  }

  console.log = (msg: any) => updateLog("info", msg);
  console.error = (msg: any) => updateLog("error", msg);
  console.warn = (msg: any) => updateLog("warn", msg);
  console.info = (msg: any) => updateLog("info", msg);
  */

  /*
  enum recordingStateEnum {
    disabled,
    enabled,
    recording,
    paused,
    stopped,
    downloading
  };

  let recordingState: recordingStateEnum = recordingStateEnum.disabled;

  function setRecordingState(state: recordingStateEnum) {

    recordingState = state;

    switch (state) {
      case recordingStateEnum.disabled:
        break;
      case recordingStateEnum.enabled:
        break;
      case recordingStateEnum.recording:
        break;
      case recordingStateEnum.paused:
        break;
      case recordingStateEnum.stopped:
        break;
      case recordingStateEnum.downloading:
        break;
    }
  }
  */

  let enableRecording = () => {
    projectName().then((name) => {
      setProject(name);
    }).catch((err) => { console.warn(err) });
    enableMicrophone();
    enableScreenCap();
    setDisabled({ enable: true, start: false, pause: true, end: true, complete: true, upload: true, download: true });
  }

  let startRecording = () => {
    startAudioCapture();
    startScreenCapture();
    setDisabled({ enable: true, start: true, pause: false, end: false, complete: true, upload: true, download: true });
  }

  let pauseRecording = () => {
    pauseAudioCapture();
    pauseScreenCapture();
    setDisabled({ enable: true, start: false, pause: true, end: false, complete: true, upload: true, download: true });
  }

  let endRecording = () => {
    stopAudioCapture();
    stopScreenCapture();
    disableMicrophone();
    disableScreenCap();
    setDisabled({ enable: true, start: true, pause: true, end: true, complete: false, upload: true, download: true });
  }

  let upload = async () => {

    if (project) {
      console.info("Calling upload()");
      let ablob: Blob = getAudioCaptureBlob();
      uploadBlob(ablob, project, "ogg", true).then((m) => {
        console.warn("Upload message", m);
      });
      let vblob: Blob = getCaptureBlob();
      uploadBlob(vblob, project, "webm", false).then((m) => {
        console.warn("Upload message", m);
      });
    }
  }

  let getRecording = async (project: string) => {
    let response = await fetch("https://msarecap.blob.core.windows.net/recordings/" + project + ".webm", {
      method: 'GET'
    });
    if (response.ok) {
      setExpanded('panel2');
    }
  }

  let completeRecording = () => {
    upload();
    getRecording(project);
    setDisabled({ enable: false, start: true, pause: true, end: true, complete: true, upload: false, download: false });
  }

  let completeEditing = () => {
    setExpanded('panel3');
  }

  let handleChange = (evt: any) => {
    setExpanded(evt === expanded ? '' : evt);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Accordion expanded={expanded === 'panel1'} onChange={() => handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="h6">Record</Typography>
          </AccordionSummary>
          <GlobalCss />
          <AccordionDetails>
            <div>
              <Button variant="contained" color="primary" id="enableRecording" disabled={disabled.enable} onClick={enableRecording}>Enable Recording</Button>
            </div>
            <br />
            <div>
              <ButtonGroup variant="contained" color="primary">
                <Button id="start" disabled={disabled.start} onClick={startRecording}><Tooltip title="Start Recording" aria-label="Start Recording" arrow><FiberManualRecordIcon /></Tooltip></Button>
                <Button id="pause" disabled={disabled.pause} onClick={pauseRecording}><Tooltip title="Pause Recording" aria-label="Pause Recording" arrow><PauseIcon /></Tooltip></Button>
                <Button id="endRecording" disabled={disabled.end} onClick={endRecording}><Tooltip title="Stop Recording" aria-label="Stop Recording" arrow><StopIcon /></Tooltip></Button>
              </ButtonGroup>
            </div>
            <br />
            <div>
              <Button variant="contained" color="primary" id="finishRecording" disabled={disabled.complete} onClick={completeRecording}>Finished Recording</Button>
            </div>
            <br />
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel2'} onChange={() => handleChange('panel2')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography variant="h6">Edit</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Viewer project={project} />
            <Button variant="contained" color="primary" id="completeEditing" onClick={completeEditing}>Finished Editing</Button>
          </AccordionDetails>
        </Accordion>

        <Accordion expanded={expanded === 'panel3'} onChange={() => handleChange('panel3')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3-content"
            id="panel3-header"
          >
            <Typography variant="h6">Upload</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <TextField variant="outlined" required label="Name your recording" onChange={(evt) => { setFilename(evt.target.value) }} />
            </div>
            <br />
            <div>
              <Button variant="contained" color="primary" id="download" onClick={download}>Download to Disk</Button><span>     </span>
              <Button variant="contained" color="primary" id="upload">Upload to YouTube</Button>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </ThemeProvider>
  );
}

export default withRouter(Home);