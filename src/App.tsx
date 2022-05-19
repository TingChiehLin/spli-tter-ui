import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdPerson, MdOutlineAttachMoney } from "react-icons/md";
import Button from "./components/Button";
import { RootState } from "./store/index";
import { tip_datas } from "./models/tip_datas";

import { amountActions } from "./store/index";

function App() {
  const defaultUserInputState = {
    billAmount: 0,
    numberOfPeople: 0,
    tipAmount: 0,
    totalAmount: 0,
  };
  const [userInput, setUserInput] = useState(defaultUserInputState);

  const amount = useSelector((state: RootState) => state.amount);
  const dispatch = useDispatch();

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const inputField = event.target.name;
    const inputValue = Number(event.target.value);
    setUserInput({
      ...userInput,
      [inputField]: inputValue,
    });
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (userInput.billAmount === 0 || userInput.numberOfPeople === 0) {
      alert("Please Input any Number");
      return;
    }

    const tipAmount =
      (userInput.billAmount * (amount.selectTipAmount / 100)) /
      userInput.numberOfPeople;
    const totalAmount =
      userInput.billAmount / userInput.numberOfPeople + tipAmount;

    setUserInput({
      ...userInput,
      tipAmount: +tipAmount.toFixed(2),
      totalAmount: +totalAmount.toFixed(2),
    });
  };

  const handleRestAmount = () => {
    setUserInput(defaultUserInputState);
    dispatch(amountActions.resetTipAmount());
  };

  return (
    <form
      onSubmit={submitHandler}
      className="w-full h-screen bg-cyan-200 flex justify-center items-center flex-col gap-20"
    >
      <div className="tracking-[1rem]">
        <h1 className="text-2xl font-bold">SPLI</h1>
        <h1 className="text-2xl font-bold">TTER</h1>
      </div>
      <div className="w-[64rem] h-[32rem] bg-sky-50 rounded-2xl flex justify-center items-center p-8">
        <div className="w-full h-ful">
          <div>
            <label className="mb-4 block" htmlFor="bill">
              Bill
            </label>
            <div className="relative">
              <MdOutlineAttachMoney
                color="gray"
                size={"1.5rem"}
                className="absolute left-4 top-3"
              />
              <input
                id="bill"
                type="text"
                placeholder={"0"}
                name="billAmount"
                value={userInput.billAmount}
                onChange={changeHandler}
                className="pl-12 w-[26rem] h-12 outline-none rounded appearance-none text-cyan-900 font-bold text-2xl focus:text-black"
              />
            </div>
          </div>
          <div className="mt-8">
            <div className="mb-4">Select Tip %</div>
            <div className="flex justify-start items-center flex-wrap gap-4">
              {tip_datas.map((item) => (
                <Button
                  key={item.id}
                  text={item.text}
                  value={item.value}
                  isCustomed={item.isCustomed}
                />
              ))}
            </div>
          </div>
          <div className="mt-8">
            <label className="mb-4 block" htmlFor="number-of-people">
              Number of People
            </label>
            <div className="relative">
              <MdPerson
                color="gray"
                size={"1.5rem"}
                className="absolute left-4 top-3"
              />
              <input
                className="pl-12 w-[26rem] h-12 
                           outline-none rounded appearance-none text-cyan-900 font-bold text-2xl focus:text-black"
                id="number-of-people"
                name="numberOfPeople"
                type="text"
                value={userInput.numberOfPeople}
                onChange={changeHandler}
                placeholder={"0"}
              />
            </div>
          </div>
        </div>
        <div className="bg-cyan-900 w-full h-full rounded-2xl px-10 py-12 flex justify-between flex-col">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-bold text-white tracking-[0.2rem]">
                Tip Amount
              </h1>
              <h3 className="text-green-600">/ person</h3>
            </div>
            <div className="text-4xl font-bold text-teal-500">
              {"$" + userInput.tipAmount}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-bold text-white tracking-[0.2rem]">Total</h1>
              <h3 className="text-green-600">/ person</h3>
            </div>
            <div className="text-4xl font-bold text-teal-500">
              {"$" + userInput.totalAmount}
            </div>
          </div>
          <button
            className="w-full h-16 font-bold text-xl rounded bg-teal-500 active:bg-teal-600"
            onClick={submitHandler}
          >
            <p>Submit</p>
          </button>
          <button
            className="w-full h-16 font-bold text-xl rounded bg-teal-500 active:bg-teal-600"
            onClick={handleRestAmount}
          >
            <p>RESET</p>
          </button>
        </div>
      </div>
    </form>
  );
}

export default App;
