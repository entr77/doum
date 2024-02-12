// public/sw.js

import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  // API 루트 또는 캐싱이 필요한 다른 루트 추가
  ({ url }) => url.pathname.startsWith('/app/'),
  new CacheFirst()
);