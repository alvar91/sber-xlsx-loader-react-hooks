import { useEffect, useState } from "react";
import readXlsxFile from "read-excel-file";

const App = () => {
  const [items, setItems] = useState([]);
  const [fileData, setFileData] = useState(null);

  const [searchResult, setSearchResult] = useState(null);

  const importExcelData = (e) => {
    const readFile = async () => {
      const data = await readXlsxFile(e.target.files[0]);

      setFileData(data);
    };

    readFile();
  };

  useEffect(() => {
    if (fileData) {
      const values = fileData.slice(1).flat();
      setItems([...values]);
    }
  }, [fileData]);

  const searchData = ({ target: { value } }) => {
    if (value.length >= 3) setSearchResult(items.includes(value));
  };

  return (
    <div className="app">
      <input type="file" onChange={importExcelData} />

      {items.length > 0 && (
        <input
          className="search"
          type="text"
          onChange={searchData}
          placeholder="Поиск по номеру"
        />
      )}

      {searchResult !== null &&
        (searchResult ? (
          <span>номер найден</span>
        ) : (
          <span>номер не найден</span>
        ))}

      <ul>
        {items?.map((item, index) => (
          <li className="item" key={index}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
