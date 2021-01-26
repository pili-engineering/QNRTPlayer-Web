import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import { QNRTPlayer } from "qn-rtplayer-web";

const player = new QNRTPlayer();

// -1: unknow, 0: false, 1: true
type SupportType = -1 | 0 | 1;

function SupportLabel({ name, support }: { name: string; support: SupportType; }) {
  let supportClass = "";
  if (support === 1) {
    supportClass = " good";
  }
  if (support === 0) {
    supportClass = " not-good";
  }
  return <div className={"support-label" + supportClass}>{name}</div>;
}

function Header() {
  const [rtcSupport, setRTCSupport] = React.useState<SupportType>(-1);
  const [h264Support, setH264Support] = React.useState<SupportType>(-1);
  React.useEffect(() => {
    const i = setInterval(() => {
      const playerSupport = player.getPlayerSupport();
      if (playerSupport) {
        clearInterval(i);
        if (playerSupport.peerConnection) {
          setRTCSupport(1);
        } else {
          setRTCSupport(0);
        }
        if (playerSupport.H264) {
          setH264Support(1);
        } else {
          setH264Support(0);
        }
      }
    }, 1000);
  }, []);
  return <div id="header">
    <div className="header-label">Qiniu RTPlayer Demo</div>
    <SupportLabel name="RTC" support={rtcSupport} />
    <SupportLabel name="H264" support={h264Support} />
  </div>;
}

type ObjectFitType = "fill" | "contain" | "cover" | "none" | "scale-down";
type VolumnType = 0 | 0.3 | 0.6 | 1;
type MeidaContainerType = "media-container-1" | "media-container-2";

function StreamContainer() {
  const [url, setUrl] = React.useState("webrtc://10.200.20.28:1998/sdk-live/timestamp");
  const [width, setWidth] = React.useState<string>("100%");
  const [height, setHeight] = React.useState<string>("100%");
  const [className, setClassName] = React.useState<string>("qn-rtplayer-media");
  const [controls, setControls] = React.useState<boolean>(false);
  const [playsinline, setPlaysinline] = React.useState<boolean>(true);
  const [objectFit, setObjectFit] = React.useState<ObjectFitType>("contain");
  const [volumn, setVolumn] = React.useState<VolumnType>(0.6);
  const [mediaContainer, setMediaContainer] = React.useState<MeidaContainerType>("media-container-1");

  return <div id="stream-container">
    <div id="stream-url-container">
      <label htmlFor="stream-url-input" id="stream-url-label">播放地址：</label>
      <input type="text" id="stream-url-input" value={url} onChange={e => setUrl(e.target.value)} />
    </div>
    <div id="control-container">
      <div id="config-container">
        <div className="config-item">
          <label htmlFor="config-width">width: </label>
          <input type="text" name="" id="config-width" value={width} onChange={e => setWidth(e.target.value)} />
        </div>
        <div className="config-item">
          <label htmlFor="config-height">height: </label>
          <input type="text" name="" id="config-height" value={height} onChange={e => setHeight(e.target.value)} />
        </div>
        <div className="config-item">
          <label htmlFor="config-class">className: </label>
          <input type="text" name="" id="config-class" value={className} onChange={e => setClassName(e.target.value)} />
        </div>
        <div className="config-item">
          <label htmlFor="config-object-fit">object-fit: </label>
          <select name="" id="config-object-fit" value={objectFit} onChange={e => setObjectFit(e.target.value as ObjectFitType)}>
            <option value="fill">fill</option>
            <option value="contain">contain</option>
            <option value="cover">cover</option>
            <option value="scale-down">scale-down</option>
            <option value="none">none</option>
          </select>
        </div>
        <div className="config-item">
          <label htmlFor="config-volumn">volumn: </label>
          <select name="" id="config-volumn" value={volumn} onChange={e => setVolumn(parseFloat(e.target.value) as VolumnType)}>
            <option value="0.1">0.1</option>
            <option value="0.3">0.3</option>
            <option value="0.6">0.6</option>
            <option value="1">1</option>
          </select>
        </div>
        <div className="config-item">
          <label htmlFor="media-container">container: </label>
          <select id="media-container" value={mediaContainer} onChange={e => setMediaContainer(e.target.value as MeidaContainerType)}>
            <option value="media-container-1">container-1</option>
            <option value="media-container-2">container-2</option>
          </select>
        </div>
        <div className="config-item">
          <label htmlFor="config-controls">controls: </label>
          <input type="checkbox" name="" id="config-controls" checked={controls} onChange={e => setControls(e.target.checked)} />
        </div>
        <div className="config-item">
          <label htmlFor="config-playsinline">playsinline: </label>
          <input type="checkbox" name="" id="config-playsinline" checked={playsinline} onChange={e => setPlaysinline(e.target.checked)} />
        </div>
      </div>
      <div id="stream-control-container">
        <button className="stream-btn" onClick={() => {
          player.init({ width, height, className, controls, playsinline, objectFit, volumn });
        }}>init</button>
        <button className="stream-btn" onClick={() => player.release()}>release</button>
        <button className="stream-btn" onClick={async () => {
          player.play(url, document.getElementById(mediaContainer) as HTMLElement);
        }}>play</button>
        <button className="stream-btn" onClick={() => player.stop()}>stop</button>
        <button className="stream-btn" onClick={() => player.pause()}>pause</button>
        <button className="stream-btn" onClick={() => player.resume()}>resume</button>
        <button className="stream-btn" onClick={() => player.muteAudio()}>muteAudio</button>
        <button className="stream-btn" onClick={() => player.unmuteAudio()}>unmuteAudio</button>
        <button className="stream-btn" onClick={() => player.muteVideo()}>muteVideo</button>
        <button className="stream-btn" onClick={() => player.unmuteVideo()}>unmuteVideo</button>
        <button className="stream-btn" onClick={() => {
          player.setConfig({ width, height, className, controls, playsinline, objectFit, volumn });
        }}>setConfig</button>
      </div>
    </div>
    <div className="stream-content-container">
      <div data-v="container-1" id="media-container-1" className="media-container"></div>
      <div data-v="container-2" id="media-container-2" className="media-container"></div>
    </div>
  </div>;
}

function LogContainer({ logs }: { logs: any[]; }) {
  const [top, setTop] = React.useState("100%");
  const toggleLog = () => {
    if (top === "100%") {
      setTop("40%");
    } else {
      setTop("100%");
    }
  };
  const logState = logs.some(item => item.level === "error") ? "not-good" : "good";
  return <>
    <div className={`log-container-control ${logState}`} onClick={toggleLog}>LOG</div>
    <div id="log-container" style={{ top: top }}>
      <div className="log-item">{`sdk version: ${player.version}`}</div>
      <div className="log-item">{`browser report: ${JSON.stringify(player.getBrowserReport())}`}</div>
      <div className="log-item">{`player support: ${JSON.stringify(player.getPlayerSupport())}`}</div>
      {logs.map((logItem) => <LogItem key={logItem.id} logItem={logItem} />)}
    </div>
  </>;
}

function LogItem({ logItem }: { logItem: any; }) {
  return <div className="log-item">{`${logItem.time} [${logItem.level}] ${logItem.msg}`}</div>;
}

function App() {
  const [logs, setLogs] = React.useState<any[]>([]);

  useEffect(() => {
    player.on("log", (logItem: any) => {
      setLogs(cur => {
        return [...cur, logItem];
      });
    });
    player.on("stats", (stats: any) => {
      // ...
    });
    player.on("error", (data: any) => {
      alert(`error: code: ${data.code}, errorType: ${data.errorType}, msg: ${data.msg}`);
    });
  }, []);
  return <>
    <Header />
    <StreamContainer />
    <LogContainer logs={logs} />
  </>;
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
