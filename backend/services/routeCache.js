import nodeCache from "node-cache";

const cache = new nodeCache();

const routeCache = (duration) => (req, res, next) => {
  // is request a GET?
  // if not, call next
  if (req.method !== "GET") {
    console.error("Cannot cache non-GET requests");
    return next();
  }
  // check if they exist in cache
  const key = req.originalUrl;
  const cacheResponse = cache.get(key);

  // if it exists in cache, send cache result
  if (cacheResponse) {
    console.log("Cache hit for:", key);
    return res.send(cacheResponse);
  } else {
    // if not, replace .send with method to set the response to cache
    console.log("Cache miss for:", key);
    res.originalSend = res.send;
    res.send = (body) => {
      res.originalSend(body);
      cache.set(key, body, duration);
    };
    next();
  }
};

export default routeCache;
