async function search(kw, page) {
  let res = await fetch(`https://www.enmcine.uk/?s=${kw}&page=${page}`);
  let html = await res.text();
  let data = [];
  // Aquí va el código para sacar pelis/series de enmcine.uk
  // Necesitas adaptar los selectores de la web
  return data;
}

async function detail(url) {
  let res = await fetch(url);
  let html = await res.text();
  let data = {};
  // Aquí va el código para sacar detalle + links de video
  return data;
}

export { search, detail }