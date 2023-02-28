import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import PaginatedItems from "../../component/pagination";
import { useDispatch, useSelector } from "react-redux";
import { getTestData } from "../../store/slice/insertTestSlices";
const { ipcRenderer } = window.require("electron");

const Index = () => {
  const [Test, setTest] = useState("");
  const [AResult, setAResult] = useState("");
  const [BResult, setBResult] = useState("");
  const [CResult, setCResult] = useState("");
  const [DResult, setDResult] = useState("");
  const testData = useSelector((state) => state.insertTestReducer.testData);
  const dispatch = useDispatch();
  const location = useLocation();
  const subGroup = location.state;
  //------------------------------------------------------------------------
  const saveTest = async () => {
    if (
      Test === "" ||
      AResult === "" ||
      BResult === "" ||
      CResult === "" ||
      DResult === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Анхаар !!!",
        text: "Та заавал гүйцэт бөглөнө шүү!",
      });
      return;
    }
    const testBody = {
      subGroupID: subGroup.id,
      Test,
      AResult: AResult + 1,
      BResult,
      CResult,
      DResult,
    };
    const re = await ipcRenderer.invoke("saveTest", testBody);
    console.log("re-> ", re);
  };

  console.log("object", AResult);

  const getTestDatafromMain = async () => {
    const allTest = dispatch(getTestData(subGroup.id));
    console.log("allTest ", allTest);
  };

  useEffect(() => {
    getTestDatafromMain();
  }, []);

  return (
    <div>
      <PaginatedItems itemsPerPage={10} testData={testData} />

      <br />
      {/* <div className=" flex justify-center">{subGroup.name}</div>
      <div className="mt-9 flex flex-col mx-20">
        <label>Тест</label>
        <textarea
          className=" p-2 rounded-lg "
          rows={3}
          placeholder="текст ээ оруулна уу!"
          value={Test}
          onChange={(e) => setTest(e.target.value)}
        ></textarea>
      </div>
      <div className="w-1/3 mx-auto mt-5">
        <div className=" flex flex-col ">
          <label>
            А Сонголт{" "}
            <span className=" text-red-800 text-sm">
              (Та зөв хариугаа энд бичнэ үү!)
            </span>
          </label>
          <input
            type="text"
            value={AResult}
            onChange={(e) => setAResult(e.target.value)}
          />
        </div>
        <div className=" flex flex-col mt-3">
          <label>Б Сонголт</label>
          <input
            type="text"
            value={BResult}
            onChange={(e) => setBResult(e.target.value)}
          />
        </div>
        <div className=" flex flex-col mt-3">
          <label>С Сонголт</label>
          <input
            type="text"
            value={CResult}
            onChange={(e) => setCResult(e.target.value)}
          />
        </div>
        <div className=" flex flex-col mt-3">
          <label>Д Сонголт</label>
          <input
            type="text"
            value={DResult}
            onChange={(e) => setDResult(e.target.value)}
          />
        </div>
        <div className=" flex justify-center">
          <button
            className=" bg-blue-500 w-40 h-10 rounded-2xl mt-3"
            onClick={(e) => saveTest(e)}
          >
            Хадгалах
          </button>
        </div>
      </div> */}
    </div>
  );
};
export default Index;
