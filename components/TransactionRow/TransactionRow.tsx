import { ITransaction } from "mongoose/models/Transaction";

interface IProps {
  transaction: ITransaction;
}

const TransactionRow = (props: IProps) => {
  const { transaction } = props;

  //   const { ammount, currency, date, flowType } = props

  return (
    <div className="container">
      <div className="transaction">
        <div className="type">
          <div className="add" />
        </div>
        <div className="info">
          <span className="value">5000</span>
          <span className="label">ammount</span>
        </div>
        <div className="info">
          <span className="value">$</span>
          <span className="label">currency</span>
        </div>

        <div className="info date">
          <span className="value">02/11/2022</span>
          <span className="label">date</span>
        </div>
      </div>
      <div className="transaction">a</div>
      <div className="transaction">a</div>
      <div className="transaction">a</div>
      <div className="transaction">a</div>
    </div>
  );
};

export default TransactionRow;
