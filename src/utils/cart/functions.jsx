export const getFloatVal = (string) => {
  let floatValue = string.match(/[+-]?\d+(\.\d+)?/g)[0];
  return null !== floatValue
    ? parseFloat(parseFloat(floatValue).toFixed(2))
    : "";
};
const addFirstProduct = () => {
  	let productPrice = getFloatVal( product.price );
};
