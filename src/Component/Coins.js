import { useState, useEffect, useRef } from "react";

export function Coins() {
  const [loading, setLoading] = useState(true);
  // 기본 값을 지정 후 사용해야한다. 지정하지 않을 시
  // coins의 초기값이 undefind가 되어 coins.length에서 오류가 발생하기 때문이다.
  const [coins, setCoins] = useState([]);
  const [coinPrice, setCoinPrice] = useState(1);
  const [myMoney, setMyMoney] = useState(500);
  const moneyInputRef = useRef(null);

  const coinOnChange = (event) => {
    setCoinPrice(event.target.value);
  }

  const onSubmit = (event) => {
    event.preventDefault();
    const newMoney = moneyInputRef.current.value;
    if (newMoney) {
      setMyMoney(Number(newMoney));
    }
  }

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
    .then(response => response.json())
    .then((json) => {
      setCoins(json);      
      setLoading(false);
      setCoinPrice(json[0].quotes.USD.price);
    });
  }, []);

  return (
    <div>
      <h1>The Coins! ({coins.length})</h1>
      <h2>You have {myMoney}$</h2>
      <form onSubmit={onSubmit}>
        <input 
          type="text"
          placeholder="Input your money." 
          ref={moneyInputRef}
        />
        <button>Add my money</button>
      </form>
      {loading ? (
        <strong>Loading...</strong>
        ) : (
          <div>
            <p>You can buy this coin {myMoney / coinPrice}</p>
            <select onChange={coinOnChange}>
              {coins.map((coin) => (
                <option key={coin.id} value={coin.quotes.USD.price}>
                  {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price}
                </option>
              ))}
            </select>
          </div>
        )}
    </div>
  )
}