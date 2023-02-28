import React, { useState, useEffect } from "react";
import Modal from "../../component/subModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const { ipcRenderer } = window.require("electron");

const Index = () => {
  // const { ipcRenderer } = window.require("electron");
  const navigate = useNavigate();
  const [menuData, setMenuData] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const login = useSelector((state) => state.loginReducer.loginEnter);

  const gotoLink = (name, id) => {
    navigate("/test", { state: { name: name, id: id } });
  };

  const readsubMenu = async () => {
    const recived = await ipcRenderer.invoke("readsubMenu", "getMenu");
    setMenuData(recived);
    console.log("recived", recived);
    // ipcRenderer.on("recivedMenudata", (event, arg) => {
    //   setMenuData(arg);
    // });
  };

  const deleteItem = async (id) => {
    const res = await Swal.fire({
      title: "Та устгахдаа итгэлтэй байна уу!!",
      showDenyButton: true,
      confirmButtonText: "Устгах",
      denyButtonText: `Болих`,
    });
    console.log("object-->", res);
    if (!res.isConfirmed) return;
    const del = await ipcRenderer.invoke("deletebyId", id);
    console.log("del", del);
    readsubMenu();
  };

  const addsubGroup = async (value) => {
    const re = await ipcRenderer.invoke("addSubMenu", value);
    console.log("added", re);
    setOpenModal(false);
    readsubMenu();
  };

  useEffect(() => {
    readsubMenu();
    //ipcRenderer.on("recivedMenudata", saveDataMenu);
  }, []);

  useEffect(() => {
    const res = localStorage.getItem("logined");
    if (!res) {
      navigate("/");
      return;
    }
  }, []);

  return (
    <div>
      <div className="flex justify-center text-2xl font-bold">
        <h2>Бүлэг</h2>
      </div>
      <div className=" ml-20">
        <ol className=" list-decimal">
          {menuData &&
            menuData.map((el, index) => (
              <li
                key={index}
                className=" bg-red-200 h-10 w-96 mt-5 hover:bg-blue-200 cursor-pointer flex justify-between text-start"
              >
                <div
                  className=" flex-1"
                  onClick={(e) => {
                    e.preventDefault(e);
                    gotoLink(el.name, el.id);
                  }}
                >
                  {el.name}
                </div>

                <button
                  className=" bg-blue-400 w-16 rounded-md"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteItem(el.id);
                  }}
                >
                  Устгах
                </button>
              </li>
            ))}
        </ol>
        <div className="mt-5">
          <Modal
            openModal={openModal}
            setOpenModal={setOpenModal}
            addsubGroup={addsubGroup}
          />
        </div>
      </div>
    </div>
  );
};
export default Index;
