import React, { useState, useEffect } from "react";

const Index = ({ test, testIndex, setCollectResult, collectResult }) => {
  const [readTest, setReadTest] = useState(test.test);
  const [rrr, setRRR] = useState(null);

  const collectSelectItems = async () => {
    const selectItem = [];
    selectItem.push(test.aResult);
    selectItem.push(test.bResult);
    selectItem.push(test.cResult);
    selectItem.push(test.dResult);
    const random = selectItem.sort(() => Math.random() - 0.5);
    setRRR(random);
  };

  const selectItem = (e) => {
    if (!e.target.checked) {
      let copiedresult = { ...collectResult };
      delete copiedresult[testIndex];
      console.log("copiedresult", copiedresult);
      setCollectResult((collectResult) => ({ ...copiedresult }));
    } else {
      const col = { ...collectResult };
      setCollectResult({ ...col, [testIndex]: e.target.value });
    }
  };

  useEffect(() => {
    collectSelectItems();
  }, []);

  return (
    <div>
      <span>{readTest}</span>
      <ol
        style={{ listStyleType: "upper-latin" }}
        className="ml-20 list-inside mt-3 mb-3"
      >
        {rrr &&
          rrr.map((el, index) => (
            <span className=" flex" key={index}>
              <input
                className="mr-2"
                type="checkbox"
                // name={index}
                // checked={checked ? true : false}
                value={el.split("~")[1]}
                onChange={(e) => selectItem(e)}
              />
              <li>{el.split("~")[0]}</li>
            </span>
          ))}
      </ol>
    </div>
  );
};

export default Index;
