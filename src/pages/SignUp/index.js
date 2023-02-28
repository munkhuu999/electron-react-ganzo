import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { registerCheck } from "../../store/slice/loginSlice";

const Index = () => {
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Passport, setPassport] = useState("");
  const [RePassport, setRePassport] = useState("");
  const [textMessege, setTextMessege] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clear = () => {
    setName("");
    setEmail("");
    setPassport("");
  };

  const register = async (e) => {
    e.preventDefault();
    //-------------------shalgalt---------------
    setTextMessege(null);
    if (!Name) {
      setTextMessege("Уучлаарай та нэр ээ оруулна уу !");
      return;
    }
    if (!Email) {
      setTextMessege("Уучлаарай та цахим шуудангийн хаяг аа оруулна уу !");
      return;
    }
    if (!Email.includes("@")) {
      setTextMessege("Цахим шуудангийн хаяг аа ЗӨВ оруулна уу !");
      return;
    }
    if (!Email.endsWith(".com")) {
      setTextMessege("Цахим шуудангийн хаяг аа ЗӨВ оруулна уу !");
      return;
    }
    if (!Passport) {
      setTextMessege("Уучлаарай та нууц үг ээ оруулна уу !");
      return;
    }
    if (!RePassport) {
      setTextMessege("Уучлаарай та нууц үг ээ дахин оруулна уу !");
      return;
    }
    if (Passport !== RePassport) {
      setTextMessege(
        "Алмас аа баталгаажуулах нууц үг чинь таарахгүй байгаа юм биш үү !"
      );
      return;
    }

    const body = {
      Name,
      Email,
      Passport,
    };
    const checkRegister = await dispatch(registerCheck(body)).unwrap();
    if (checkRegister.length > 0) {
      setTextMessege(
        "Уучлаарай таны оруулсан мэдээлэл чинь бүртгэлтэй байна!!!"
      );
      clear();
      return;
    }
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });
    Toast.fire({
      icon: "success",
      title: "<h5>Амжилттай бүртгэгдлээ</h5>",
    });
    navigate("/");
  };

  return (
    <div className=" h-screen bg-green-100 flex justify-center items-center">
      <div
        className=" flex flex-col bg-red-100 w-96 px-5 border border-gray-900 font-semibold text-lg rounded-md
      "
      >
        <div className="flex flex-col mb-3">
          {textMessege && <div className=" text-red-500">{textMessege}</div>}
          <div className="flex justify-between mt-5 mb-3">
            <label>Нэвтрэх нэр</label>
            <Link to="/">Нэвтрэх</Link>
          </div>
          <input
            type="text"
            value={Name}
            className="px-3 h-9 rounded-md border-blue-300 border-2"
            placeholder="Та нэвтрэх нэр ээ оруулна уу!"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-1">
          <div className="flex justify-between mt-5 mb-3">
            <label>Цахим шуудангийн хаяг</label>
          </div>
          <input
            type="text"
            value={Email}
            className="px-3 h-9 rounded-md border-blue-300 border-2"
            placeholder="Та цахим шуудангийн хаяг аа оруул!"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-1">
          <label>Нууц үг</label>
          <input
            type="password"
            value={Passport}
            className="px-3 h-9 rounded-md border-blue-300 border-2"
            placeholder="Та нууц үг ээ оруулна уу!"
            onChange={(e) => setPassport(e.target.value)}
          />
        </div>
        <div className="flex flex-col mb-10">
          <label>Нууц үг</label>
          <input
            type="password"
            value={RePassport}
            className="px-3 h-9 rounded-md border-blue-300 border-2"
            placeholder="Та нууц үг ээ дахин оруулна уу!"
            onChange={(e) => setRePassport(e.target.value)}
          />
        </div>
        <div>
          <div
            className=" bg-blue-400 text-center mb-5 rounded-lg py-2 cursor-pointer active:bg-blue-900"
            onClick={(e) => register(e)}
          >
            Бүртгүүлэх
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
