export default function FunReducer(state, action) {
  // const rates = {
  //   Egp: 1,
  //   Doll: 55.96,
  //   Ero: 47.65,
  // };

  switch (action.type) {
    case "CONVERT": {
      const { amount, from, to, rates } = action.payload;
      if ((!amount || !from || !to, !rates[from], !rates[to])) return state;

      return (Number(amount) * rates[from]) / rates[to];
    }

    default:
      return state;
  }
}
