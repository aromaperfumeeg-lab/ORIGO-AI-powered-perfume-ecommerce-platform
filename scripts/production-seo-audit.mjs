const base = process.argv[2] || "https://origoscents.com";
const productPaths = [
  "/perfume/alezz-oud-hersh-lahab",
  "/perfume/alezz-oud-hersh-55",
  "/perfume/alezz-oud-hersh-zero-degree",
  "/perfume/alezz-oud-hersh-rouge",
  "/perfume/alezz-oud-hersh-bukhori"
];

const strip = (value = "") => value.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
const fetchText = async (path) => {
  const response = await fetch(`${base}${path}`);
  return { path, response, body: await response.text() };
};

const productsResponse = await fetch(`${base}/api/products?offset=0&limit=100`);
const productsPayload = await productsResponse.json();
const products = productsPayload.products || [];
const alezzProducts = products.filter((product) => /alezz|العز/i.test(String(product.brand || "")));
const sitemap = await fetchText("/sitemap.xml");
const sitemapUrls = [...sitemap.body.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
const robots = await fetchText("/robots.txt");
const brandPage = await fetchText("/brands/alezz-oud");

const report = {
  products: products.length,
  brands: [...new Set(products.map((product) => product.brand).filter(Boolean))],
  alezzCount: alezzProducts.length,
  alezzNames: alezzProducts.map((product) => product.nameAr || product.nameEn || product.name),
  sitemap: {
    status: sitemap.response.status,
    urlCount: sitemapUrls.length,
    productCount: sitemapUrls.filter((url) => url.includes("/perfume/")).length,
    alezzProductCount: sitemapUrls.filter((url) => url.includes("/perfume/alezz-oud-")).length,
    hasBrands: sitemapUrls.includes(`${base}/brands`),
    hasAlezzBrand: sitemapUrls.includes(`${base}/brands/alezz-oud`)
  },
  robots: {
    status: robots.response.status,
    sitemap: robots.body.match(/^Sitemap:\s*(.+)$/mi)?.[1] || "",
    disallowProduct: /Disallow:\s*\/perfume/i.test(robots.body)
  },
  brandPage: {
    status: brandPage.response.status,
    h1s: [...brandPage.body.matchAll(/<h1[^>]*>(.*?)<\/h1>/gis)].map((match) => strip(match[1])),
    productLinks: (brandPage.body.match(/href="\/perfume\//g) || []).length,
    uniqueProductLinks: new Set([...brandPage.body.matchAll(/href="(\/perfume\/[^"]+)/g)].map((match) => match[1])).size,
    hasAllAlezzNames: alezzProducts.every((product) => brandPage.body.includes(product.nameAr || product.nameEn || product.name))
  },
  productPages: []
};

for (const path of productPaths) {
  const page = await fetchText(path);
  const product = alezzProducts.find((item) => path.endsWith(item.slug)) || {};
  const name = product.nameAr || product.nameEn || product.name || "";
  const bodyOnly = page.body.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || "";
  const scripts = [...page.body.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => { try { return JSON.parse(match[1]); } catch { return null; } }).filter(Boolean);
  const schemas = scripts.flatMap((entry) => entry?.["@graph"] || [entry]);
  const productSchema = schemas.find((entry) => entry?.["@type"] === "Product");
  report.productPages.push({
    path,
    status: page.response.status,
    name,
    h1s: [...bodyOnly.matchAll(/<h1[^>]*>(.*?)<\/h1>/gis)].map((match) => strip(match[1])),
    bodyHasName: bodyOnly.includes(name),
    bodyHasBrand: bodyOnly.includes(String(product.brand || "")),
    bodyHasPrice: bodyOnly.includes(String(product.price || "")),
    bodyHasImage: /<img\b/i.test(bodyOnly),
    bodyHasAlt: /<img\b[^>]*\balt="[^"]+"/i.test(bodyOnly),
    metaDescription: page.body.match(/name="description" content="([^"]*)"/i)?.[1] || "",
    canonical: page.body.match(/rel="canonical" href="([^"]*)"/i)?.[1] || "",
    robots: page.body.match(/name="robots" content="([^"]*)"/i)?.[1] || "",
    productSchema: Boolean(productSchema),
    breadcrumbSchema: schemas.some((entry) => entry?.["@type"] === "BreadcrumbList"),
    currency: productSchema?.offers?.priceCurrency || "",
    availability: productSchema?.offers?.availability || "",
    inSitemap: sitemapUrls.includes(`${base}${path}`)
  });
}

console.log(JSON.stringify(report, null, 2));
