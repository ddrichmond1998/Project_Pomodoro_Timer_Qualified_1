import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import Progression from "./Progression";
import DurationManager from "./DurationManager";

function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

function nextSession(focusDuration, breakDuration) {
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}


function Pomodoro() {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [session, setSession] = useState(null);
  const [focusDuration, setFocusDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(5);
  const [aria, setAria] = useState(0);

  useInterval(() => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      setSession((event) => nextTick(event));
      calcAria(session);
    },
    isTimerRunning ? 1000 : null
  );

  function sessionTitle (sessionType) {
    if(sessionType === "Focusing") {
      if(focusDuration < 9){
        return (`${session.label} for 0${focusDuration}:00 minutes`);
      } else {
        return (`${session.label} for ${focusDuration}:00 minutes`);
      }
    } 
      
    if(sessionType === "On Break") {
      if(breakDuration < 9) {
        return (`${session.label} for 0${breakDuration}:00 minutes`);
      }
      else {
        return (`${session.label} for ${breakDuration}:00 minutes`); 
      }
    } 
  }

  function calcAria(instance) {
    if(instance.label === "Focusing") {
      setAria(() => (focusDuration * 60 - session.timeRemaining) / (focusDuration * 60) * 100);
    } else {
      setAria(() => (breakDuration * 60 - session.timeRemaining) / (breakDuration * 60) * 100);
    }   
  }

  function playPause() {
    setIsTimerRunning((prevState) => {
      const nextState = !prevState;
      if (nextState) {
        setSession((prevStateSession) => {
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      return nextState;
    });
  }

  return (
    <div className="pomodoro">
      <DurationManager 
        focusDuration={focusDuration}
        setFocusDuration={setFocusDuration}
        isTimerRunning={isTimerRunning}
        breakDuration={breakDuration}
        setBreakDuration={setBreakDuration}
      />
      <Progression 
        session={session} 
        focusDuration={focusDuration} 
        breakDuration={breakDuration}
        isTimerRunning={isTimerRunning}
        playPause={playPause}
        classNames={classNames}
        setSession={setSession}
        setIsTimerRunning={setIsTimerRunning}
        sessionTitle={sessionTitle}
        aria={aria}
      />
    </div>
  );
}

export default Pomodoro;
