import React from "react";

function Progression({session, focusDuration, breakDuration, isTimerRunning, playPause,
classNames, setSession, setIsTimerRunning, sessionTitle, aria}){
  
  function calcTimeRemaining (time) {
    let timeInMins = "";
    let minutes = Math.floor(time / 60);
    if(minutes < 10) {minutes = "0" + minutes;}
    let seconds = time - minutes * 60;
    if(seconds < 10) {seconds = "0" + seconds;}
    timeInMins = (`${minutes}:${seconds}`).toString();
  
    return timeInMins;
  }

    return(
        <div>
        <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="stop"
              title="Stop the session"
              onClick={() => {
                setSession(null);
                setIsTimerRunning(false)
              }}
              disabled={!isTimerRunning}
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <div>
      {session ? (
        <div>
        <div className="row mb-2">
        <div className="col"> 
          <h2 data-testid="session-title">
            {sessionTitle(session.label)}
          </h2>
          <p className="lead" data-testid="session-sub-title">
            {calcTimeRemaining(session.timeRemaining)} remaining
          </p>
          <h3>{!isTimerRunning ? "PAUSED" : null }</h3>
        </div>
      </div>
      <div className="row mb-2">
        <div className="col">
          <div className="progress" style={{ height: "20px" }}>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={aria}
              style={{ width: `${aria}%`}}
            />
          </div>
        </div>
      </div>
      </div>): null}
      
    </div>
    </div>
    );
}

export default Progression;