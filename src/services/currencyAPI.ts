const URL = 'https://economia.awesomeapi.com.br/json/all';

export const currencyAPI = async () => {
  const response = await fetch(URL);
  const currencyResponse = await response.json();
  return currencyResponse;
};
