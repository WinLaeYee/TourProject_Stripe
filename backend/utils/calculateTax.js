export const calculateTax = (totalAmount) => {
 
    const taxRate = 0.1; // 10%
    const taxAmount = totalAmount * taxRate;
    return taxAmount;
  };