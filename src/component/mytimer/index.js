import React from "react";
import { useTimer } from "react-timer-hook";

const Index = ({
  expiryTimestamp,
  getTimer,
  setCheckTimerRun,
  fishishTime,
}) => {
  const { seconds, minutes, hours, isRunning, start, pause, resume, restart } =
    useTimer({
      autoStart: false,
      expiryTimestamp,
      onExpire: () => fishishTime(),
    });

  return (
    <div style={{ textAlign: "center" }}>
      <div className=" mb-2 text-3xl font-bold">
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      {isRunning ? setCheckTimerRun(true) : setCheckTimerRun(null)}
      <button
        className=" bg-red-400 h-12 w-32 rounded-full active:bg-yellow-200 mr-2"
        onClick={start}
      >
        Эхлэх
      </button>
      <button
        className=" bg-red-400 h-12 w-20 rounded-full active:bg-yellow-200 mr-2"
        onClick={pause}
      >
        Зогсох
      </button>
      <button
        className=" bg-red-400 h-12 w-32 rounded-full active:bg-yellow-200 mr-2"
        onClick={resume}
      >
        үргэлжлүүлэх
      </button>
      <button
        className=" bg-red-400 h-12 w-44 rounded-full active:bg-yellow-200 mr-2"
        onClick={() => {
          // Restarts to 5 minutes timer
          const time = new Date();
          time.setSeconds(time.getSeconds() + getTimer * 60);
          restart(time);
          pause();
        }}
      >
        Хугацаа оруулах/Restart
      </button>
    </div>
  );
};

export default Index;
