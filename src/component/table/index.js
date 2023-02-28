import React from "react";

const Index = ({ testData }) => {
  return (
    <div>
      <table className=" table-fixed border text-center">
        <thead>
          <tr className="border-b">
            <th className=" p-2">№</th>
            <th className="w-2/6">Асуулт</th>
            <th className="w-1/6">А</th>
            <th className="w-1/6">Б</th>
            <th className="w-1/6">С</th>
            <th className="w-1/6">Д</th>
            <th className="w-1/6">Устгах</th>
            <th className="w-1/6">Засах</th>
          </tr>
        </thead>
        <tbody>
          {testData.map((el, index) => (
            <tr
              key={index}
              className="border-b hover:bg-gray-300 cursor-pointer"
            >
              <td className="border-r">{index}</td>
              <td className="border-r">{el.test}</td>
              <td className="border-r">{el.aResult}</td>
              <td className="border-r">{el.bResult}</td>
              <td className="border-r">{el.cResult}</td>
              <td className="border-r">{el.dResult}</td>
              <td className="border-r">
                <button className=" bg-red-200 px-2 py-1 cursor-pointer hover:bg-red-400 active:bg-red-600 rounded-lg">
                  Устгах
                </button>
              </td>
              <td className="border-r">
                <button className=" bg-blue-200 px-2 py-1 cursor-pointer hover:bg-blue-400  active:bg-blue-600 rounded-lg">
                  Засах
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Index;
