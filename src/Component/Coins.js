import { useState, useEffect } from "react";

export function Coins() {
  const [loading, setLoading] = useState(true);
  // 기본 값을 지정 후 사용해야한다. 지정하지 않을 시
  // coins의 초기값이 undefind가 되어 coins.length에서 오류가 발생하기 때문이다.
  const [coins, setCoins] = useState([]);
  const [myMoney, setMyMoney] = useState(20);
  const onSubmit = (event) => {
    event.preventDefault();
    console.log(event);
  }
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then(response => response.json())
    .then((json) => {
      setCoins(json);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1>The Coins! ({coins.length})</h1>
      <h2>You have {myMoney}$</h2>
      <form onSubmit={onSubmit}>
        <input 
          type="text" 
          name="myMoney" 
          placeholder="Input your money." 
        />
        <button>Add my money</button>
      </form>
      <p>You can buy this coin </p>
      {loading ? <strong>Loading...</strong> : null}
      <select>
        {coins.map((coin) => (
          <option>
            {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price}
          </option>
        ))}
      </select>
    </div>
  )
}