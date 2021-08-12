import React from "react";

function DurationManager({focusDuration, setFocusDuration, breakDuration, setBreakDuration, isTimerRunning}){

  function decFocus() {
    if(focusDuration > 5) {
      setFocusDuration(focusDuration - 5);
    } 
  }

  function incFocus() {
    if(focusDuration < 60) {
      setFocusDuration(focusDuration + 5);
    } 
  }

  function decBreak() {
    if(breakDuration > 1) {
      setBreakDuration(breakDuration - 1);
    } 
  }

  function incBreak() {
    if(breakDuration < 15) {
      setBreakDuration(breakDuration + 1);
    } 
  }

    return(
        <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              Focus Duration: {("0" + focusDuration).substr(-2)}:00
            </span>
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
                onClick={() => {decFocus()}}
                disabled={isTimerRunning}
              >
                <span className="oi oi-minus" />
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
                onClick={() => {incFocus()}}
                disabled={isTimerRunning}
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                Break Duration: {("0" + breakDuration).substr(-2)}:00
              </span>
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                  onClick={() => {decBreak()}}
                  disabled={isTimerRunning}
                >
                  <span className="oi oi-minus" />
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                  onClick={() => {incBreak()}}
                  disabled={isTimerRunning}
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

export default DurationManager;