/**
 * @exports
 * @function
 * @description function resposable to return the customer total balance
 * @param statement Statements from the customer
 * @returns { number } total balance
 * @version 1.0.0
 */
export function getBalance(statement: IStatement[]): number {
  return statement.reduce((previousValue, currentValue) => {
    if (currentValue.type === 'credit') {
      return previousValue + currentValue.amount
    }
    return previousValue - currentValue.amount
  }, 0)
}