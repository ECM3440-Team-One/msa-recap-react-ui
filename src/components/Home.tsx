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
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { withStyles } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
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

const homeTheme = createMuiTheme({
  palette: {
    primary: {
      main: blue[900],
    }
  }
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    uploadButton: {
      margin: '0 0.5em 1em 0.5em'
    }
  }),
);

function Home() {
  const classes = useStyles();

  const [disabled, setDisabled] = useState({ enable: false, start: true, pause: true, end: true, complete: true, upload: true, download: true, spinner: false, viewer: false });

  const [filename, setFilename] = useState({ name: '', disabled: true });

  const [project, setProject] = useState('');

  const [expanded, setExpanded] = useState('panel1');

  function download() {
    downloadScreenCapture(filename.name);
    downloadAudioCapture(filename.name);
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
    setDisabled({ enable: true, start: false, pause: true, end: true, complete: true, upload: true, download: true, spinner: false, viewer: false });
  }

  let startRecording = () => {
    startAudioCapture();
    startScreenCapture();
    setDisabled({ enable: true, start: true, pause: false, end: false, complete: true, upload: true, download: true, spinner: false, viewer: false });
  }

  let pauseRecording = () => {
    pauseAudioCapture();
    pauseScreenCapture();
    setDisabled({ enable: true, start: false, pause: true, end: false, complete: true, upload: true, download: true, spinner: false, viewer: false });
  }

  let endRecording = () => {
    stopAudioCapture();
    stopScreenCapture();
    disableMicrophone();
    disableScreenCap();
    setDisabled({ enable: true, start: true, pause: true, end: true, complete: false, upload: true, download: true, spinner: false, viewer: false });
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

  /** Waits until recording has successfully uploaded to storage option before opening Edit accordion and displaying recording for playback
      TODO: URL of storage option will need to be updated here in future iterations */
  let getRecording = async (project: string) => {
    let response = await fetch("https://msarecap.blob.core.windows.net/recordings/" + project + ".webm", {
      method: 'GET'
    });
    if (response.ok) {
      setExpanded('panel2');
      setDisabled({ enable: false, start: true, pause: true, end: true, complete: true, upload: false, download: false, spinner: false, viewer: true });
    }
    else {
      throw new Error('Recording unavailable');
    }
  }
  // Handles recording upload, getting blobs for playback and resetting Record section buttons 
  let completeRecording = () => {
    setDisabled({ enable: false, start: true, pause: true, end: true, complete: true, upload: false, download: false, spinner: true, viewer: false });
    upload();
    new Promise(r => setTimeout(r, 2000)).then(() => {
      getRecording(project);
    });
  }

  // Opens Upload panel after clicking Finished Editing button
  let completeEditing = () => {
    setExpanded('panel3');
  }

  // Allows accordions to open automatically on button clicks, or be opened manually by users
  let handleChange = (evt: any) => {
    setExpanded(evt === expanded ? '' : evt);
  }

  return (
    <ThemeProvider theme={homeTheme}>
      <GlobalCss />
      <div className="App">
        <Accordion expanded={expanded === 'panel1'} onChange={() => handleChange('panel1')}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography variant="h6">Record</Typography>
          </AccordionSummary>
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
            {disabled.spinner && <CircularProgress />}
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
            {disabled.viewer && <Viewer project={project} />}
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
              <TextField variant="outlined" required label="Name your recording" onChange={(evt) => { setFilename({ name: evt.target.value, disabled: false }) }} />
            </div>
            <br />
            <div>
              <Button variant="contained" color="primary" id="download" className={classes.uploadButton} onClick={download} disabled={filename.disabled}>Download to Disk</Button>
              <Button variant="contained" color="primary" id="upload" className={classes.uploadButton} disabled>Upload to YouTube</Button>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </ThemeProvider>
  );
}

export default withRouter(Home);