exports.handler = async function(event) {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json'
  };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 200, headers, body: '' };
  const q = event.queryStringParameters && event.queryStringParameters.q;
  if (!q) return { statusCode: 400, headers, body: JSON.stringify({ error: 'no query' }) };
  const KEY = '72ac93023e1e2d4532f66c37c29233c6251e68e31b1c94deca7cdc7ec078c218';
  const url = `https://apis.data.go.kr/1471000/FoodNtrCpntDbInfo02/getFoodNtrCpntDbInq02?serviceKey=${KEY}&type=json&pageNo=1&numOfRows=10&FOOD_NM_KR=${encodeURIComponent(q)}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const items = data?.response?.body?.items || [];
    return { statusCode: 200, headers, body: JSON.stringify({ list: items }) };
  } catch(e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
