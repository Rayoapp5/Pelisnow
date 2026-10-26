const BASE = "https://www.enmcine.uk";

async function search(kw, page = 1) {
  let url = `${BASE}/?s=${encodeURIComponent(kw)}&page=${page}`;
  let res = await fetch(url);
  let html = await res.text();
  
  let data = [];
  let regex = /<a href="(#\/ver\/[^"]+)"[^>]*>[\s\S]*?<img src="([^"]+)"[\s\S]*?<h3[^>]*>([^<]+)<\/h3>/g;
  let match;
  while((match = regex.exec(html)) !== null){
    data.push({
      title: match[3].trim(),
      url: BASE + match[1],
      poster: match[2]
    });
  }
  return data;
}

async function detail(url) {
  let res = await fetch(url);
  let html = await res.text();
  
  let data = { videos: [] };
  
  // Título y sinopsis
  data.title = html.match(/<h1[^>]*>([^<]+)<\/h1>/)?.[1]?.trim() || "";
  data.description = html.match(/<p class="description">([^<]+)<\/p>/)?.[1]?.trim() || "";
  data.poster = html.match(/<img[^>]*class="poster"[^>]*src="([^"]+)"/)?.[1] || "";
  
  // Links de video - enmcine usa iframes
  let iframes = [...html.matchAll(/<iframe[^>]*src="([^"]+)"/g)];
  iframes.forEach((m, i) => {
    data.videos.push({
      title: `Opción ${i+1}`,
      url: m[1].startsWith("//") ? "https:" + m[1] : m[1]
    });
  });

  return data;
}

export { search, detail }