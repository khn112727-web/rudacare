exports.handler = async function(event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  const q = event.queryStringParameters && event.queryStringParameters.q;
  if (!q) return { statusCode: 400, headers, body: JSON.stringify({ error: 'no query' }) };

  const KEY = '2006f0f8b3c56d599e79b9176a0f395521dfcfac22217f14c054d30cf07b410a';
  const url = `https://apis.data.go.kr/1471000/FoodNtrCpntDbInfo02/getFoodNtrCpntDbInq02?serviceKey=${KEY}&type=json&pageNo=1&numOfRows=10`;

  try {
    const res = await fetch(url);
    const text = await res.text();
    const data = JSON.parse(text);
    const items = data?.response?.body?.items || data?.body?.items || data?.items || [];
    return { statusCode: 200, headers, body: JSON.stringify({ list: items, debug: text.slice(0,200) }) };
  } catch(e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
