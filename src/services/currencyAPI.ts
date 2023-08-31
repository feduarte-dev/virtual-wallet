const URL = 'https://economia.awesomeapi.com.br/json/all';

const currencyAPI = async () => {
  const response = await fetch(URL);
  const currencyResponse = await response.json();
  return currencyResponse;
};

export default currencyAPI;
