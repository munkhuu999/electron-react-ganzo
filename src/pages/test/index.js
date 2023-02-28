import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import MyTimer from "../../component/mytimer";
import Tesssss from "../../component/testExicise";
const { ipcRenderer } = window.require("electron");
const time = new Date();
// 10 minutes timer

const Index = () => {
  const [getTimer, setGetTime] = useState(0);
  const [TestData, setTestData] = useState([]);
  const [checkTimerRun, setCheckTimerRun] = useState(null);
  const [collectResult, setCollectResult] = useState(null);
  const location = useLocation();
  const subGroup = location.state;

  const fishishTime = () => {
    console.log("Хугацаа дууслаа: ", collectResult);
    return (
      <div>
        <h3>Үр дүн: </h3>
        <div>Нийт бөглөсөн тест: {collectResult.length}</div>
      </div>
    );
  };

  const gettestDatafromSql = async () => {
    const data = await ipcRenderer.invoke("testdata", subGroup.id);
    if (data.length === 0) return;
    const random = data.sort(() => Math.random() - 0.5);
    setTestData(random);
  };

  useEffect(() => {
    gettestDatafromSql();
  }, []);

  return (
    <div className="mt-5 p-5 flex flex-col">
      <div className=" flex justify-center items-center ">
        <span className=" text-xl font-bold">{subGroup.name}</span>
        <div className=" bg-red-100 w-10 h-7 ml-5 flex justify-center items-center hover:bg-blue-300 cursor-pointer rounded active:bg-blue-100">
          <Link to={checkTimerRun ? "" : "/InsertTest"} state={subGroup}>
            +
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <span className=" text-1xl font-black mr-1">Хугацаа :</span>
        <input
          type="number"
          className="h-10 w-20 rounded-lg text-center font-semibold text-3xl mr-2"
          value={getTimer}
          onChange={(e) => setGetTime(e.target.value)}
        />
        <span className=" text-1xl font-black mr-1">минут.</span>
      </div>
      <div> {`Танд ${TestData.length} тест байна. `} </div>
      {/* ------------------------------test work ------------------------------- */}
      <div className=" row-span-6 w-screen mt-10 ml-20 mb-20">
        <ol className="list-decimal list-outside w-4/5">
          {TestData &&
            TestData.map((el, index) => (
              <li key={index}>
                <Tesssss
                  test={el}
                  testIndex={index}
                  setCollectResult={setCollectResult}
                  collectResult={collectResult}
                />
              </li>
            ))}
        </ol>
      </div>
      <div className=" columns-4">fddfvfdjvkfjvfvf</div>

      <div className=" fixed flex justify-start items-center bottom-1 bg-yellow-200 rounded-xl px-3">
        <MyTimer
          fishishTime={fishishTime}
          setCheckTimerRun={setCheckTimerRun}
          getTimer={getTimer}
          expiryTimestamp={time.setSeconds(
            time.getSeconds() + parseInt(getTimer) * 1
            //time.getSeconds() + 0 * 6.0
          )}
        />
      </div>
    </div>
  );
};

export default Index;
