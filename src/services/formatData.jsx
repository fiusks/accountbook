export function formatCEP(cep) {
  if (cep) {
    const newCep = `${cep.substring(0, 5)}-${cep.substring(5)}`;
    return newCep;
  }
  return;
}

export function formatCPF(cpf) {
  if (cpf) {
    const formatedCPF = `${cpf.substring(0, 3)}.${cpf.substring(
      3,
      6
    )}.${cpf.substring(6, 9)}-${cpf.substring(9)}`;
    return formatedCPF;
  }
  return;
}

export function formatPhone(phone) {
  if (phone) {
    if (phone.length === 10) {
      const newPhone = `(${phone.substring(0, 2)}) ${phone.substring(
        2,
        6
      )}-${phone.substring(6)}`;
      return newPhone;
    } else {
      const newPhone = `(${phone.substring(0, 2)}) ${phone.substring(
        2,
        3
      )} ${phone.substring(3, 7)}-${phone.substring(7)}`;
      return newPhone;
    }
  }
}

export function formatToCurrency(inputNumber) {
  const convertedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(inputNumber);
  return convertedValue;
}
