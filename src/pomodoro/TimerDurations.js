import React from "react";
import { minutesToDuration } from "../utils/duration";

function TimerDurations({ TimerData, isTimerRunning, setTimerData }) {
  const handleInOrDe = (event) => {
    event.preventDefault();
    const whichButton =
      event.target.nodeName === "SPAN"
        ? event.target.parentNode.name
        : event.target.name;
    let newTime = 0;
    switch (whichButton) {
      case "decrease-focus":
        newTime = Math.max(TimerData.focusTime - 5, 5);
        setTimerData((currentData) => {
          return {
            ...currentData,
            focusTime: newTime,
            focusSecs: newTime * 60,
          };
        });
        break;
      case "increase-focus":
        newTime = Math.min(TimerData.focusTime + 5, 60);
        setTimerData((currentData) => {
          return {
            ...currentData,
            focusTime: newTime,
            focusSecs: newTime * 60,
          };
        });
        break;
      case "decrease-break":
        newTime = Math.max(TimerData.breakTime - 1, 1);
        setTimerData((currentData) => {
          return {
            ...currentData,
            breakTime: newTime,
            breakSecs: newTime * 60,
          };
        });
        break;
      case "increase-break":
        newTime = Math.min(TimerData.breakTime + 1, 15);
        setTimerData((currentData) => {
          return {
            ...currentData,
            breakTime: newTime,
            breakSecs: newTime * 60,
          };
        });
        break;
      default:
        break;
    }
  };
  return (
    <div className="row">
      <div className="col">
        <div className="input-group input-group-lg mb-2">
          <span className="input-group-text" data-testid="duration-focus">
            Focus Duration: {minutesToDuration(TimerData.focusTime)}
          </span>
          <div className="input-group-append">
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="decrease-focus"
              disabled={isTimerRunning}
              onClick={handleInOrDe}
              name="decrease-focus"
            >
              <span className="oi oi-minus" />
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="increase-focus"
              disabled={isTimerRunning}
              onClick={handleInOrDe}
              name="increase-focus"
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
              Break Duration: {minutesToDuration(TimerData.breakTime)}
            </span>
            <div className="input-group-append">
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-break"
                disabled={isTimerRunning}
                onClick={handleInOrDe}
                name="decrease-break"
              >
                <span className="oi oi-minus" name="decrease-break" />
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-break"
                disabled={isTimerRunning}
                onClick={handleInOrDe}
                name="increase-break"
              >
                <span className="oi oi-plus" name="increase-break" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimerDurations;