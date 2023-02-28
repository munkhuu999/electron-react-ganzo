import React, { useState, useEffect } from "react";
import Zurag from "../../images.jfif";
import { useDispatch, useSelector } from "react-redux";
import { loginProgram, logining } from "../../store/slice/loginSlice";
import { Link, useNavigate } from "react-router-dom";

const Index = () => {
  const [LoginEmail, setLoginEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [AttentionText, setAttentionText] = useState("");
  const login = useSelector((state) => state.loginReducer.loginEnter);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginEnter = async (e) => {
    e.preventDefault();
    setAttentionText("");
    if (!LoginEmail) {
      setAttentionText("Та цахим шуудангаа оруулна уу");
      return;
    }
    if (!Password) {
      setAttentionText("Та нууц үг ээ оруулна уу");
      return;
    }
    const body = { LoginEmail, Password };
    const res = await dispatch(loginProgram(body)).unwrap();
    console.log("res  ", res);

    if (res.length === 0) {
      setAttentionText("Та бүртгэлгүй байна. Бүртгүүлнэ үү!");
      return;
    }

    if (res[0].email !== LoginEmail) {
      setAttentionText("Таны оруулсан мэдээлэл буруу байна.");
      return;
    }
    if (res[0].password !== Password) {
      setAttentionText("Таны оруулсан мэдээлэл буруу байна.");
      return;
    }

    localStorage.setItem("logined", "logined");
    navigate("/Subgroup");
  };

  useEffect(() => {
    const res = localStorage.getItem("logined");
    if (res) {
      navigate("/Subgroup");
      return;
    }
  }, []);

  return (
    <div className=" flex flex-row">
      <div className=" flex flex-col w-1/2 h-screen bg-red-200">
        <div className=" h-full flex justify-center items-center">
          <img src={Zurag} alt="нүүр зураг" width={500} height={500} />
        </div>
      </div>
      <div className=" flex flex-col justify-center items-center w-1/2 bg-green-200">
        <div className=" w-11/12 lg:w-96">
          <div className="flex">
            <div className="flex flex-col w-full mb-5">
              {AttentionText && (
                <span className=" text-red-600">{AttentionText}</span>
              )}
              <label className="mb-3 font-serif font-bold text-lg">
                Нэвтрэх Цахим хаяг
              </label>
              <input
                type="text"
                className=" h-11 px-5 rounded-xl"
                value={LoginEmail}
                placeholder="Та нэвтрэх цахим хаяг аа бичнэ үү"
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex">
            <div className="flex flex-col w-full">
              <div className="flex justify-between">
                <label className="mb-3 font-serif font-bold text-lg">
                  Нууц үг
                </label>
                <Link to="/SignUp">Бүртгүүлэх</Link>
              </div>

              <input
                type="password"
                className="h-11 px-5 rounded-xl"
                value={Password}
                placeholder="Та нэвтрэх нууц үг ээ бичнэ үү"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-center mt-3">
            <div
              className=" bg-blue-400 w-32 h-9 flex justify-center items-center rounded-lg hover:bg-blue-600 cursor-pointer"
              onClick={(e) => loginEnter(e)}
            >
              <span className="text-center font-semibold">Нэвтрэх</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
