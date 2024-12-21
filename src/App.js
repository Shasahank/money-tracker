import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [datetime, setDateTime] = useState("");
  const [description, setDescription] = useState("");
  const [transactions, setTransaction] = useState([]);

  useEffect(() => {
    getAllTranscation().then((transactions) => {
      console.log(transactions);
      setTransaction(transactions);
    });
  }, []);

  async function getAllTranscation() {
    const url = process.env.REACT_APP_API_URL + "/transaction";
    const resp = await fetch(url);
    return await resp.json();
  }

  function addNewTransaction(event) {
    event.preventDefault();
    const url = process.env.REACT_APP_API_URL + "/transaction";
    const price = name.split(" ")[0];
    console.log(url);
    fetch(url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: name.substring(price.length + 1),
        price,
        description,
        datetime,
      }),
    }).then((res) => {
      res.json().then((data) => {
        setName("");
        setDescription("");
        setDateTime("");
        setTransaction((prevTransactions) => [...prevTransactions, data]);

        console.log(data);
      });
    });
  }

  let balance= 0;
  for(const transaction of transactions){
    balance += transaction.price;
  }

  return (
    <main>
      <h1>
        {balance}
      </h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            type="text"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
            placeholder={"20000 mobile"}
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={(event) => {
              setDateTime(event.target.value);
            }}
          />
        </div>
        <div className="description">
          <input
            type="text"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
            }}
            placeholder={"description"}
          />
        </div>
        <button>Add new transaction</button>
      </form>
      <div className="transactions">
        {transactions.length > 0 &&
          transactions.map((transaction) => (
            <div>
              <div className="transaction">
                <div className="left">
                  <div className="name">{transaction.name}</div>
                  <div className="description">{transaction.description}</div>
                </div>
                <div className="right">
                  <div
                    className={
                      "price " + (transaction.price < 0 ? "red" : "green")
                    }
                  >
                    {transaction.price}
                  </div>
                  <div className="datetime">{transaction.datetime}</div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </main>
  );
}

export default App;
