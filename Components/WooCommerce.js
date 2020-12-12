import React from 'react'
import WooCommerceRestApi from 'react-native-woocommerce-api';

const WooCommerce = new WooCommerceRestApi({
    url: 'https://gms.upgrate.in/',
    ssl: true,
    consumerKey: 'ck_b30218a87aa7f17f09251ad2d2c73caac9df3bb4',
    consumerSecret: 'cs_3c1490af4a4bc7127117e96ef7739e4b0460e31a',
    wpAPI: true,
    version: 'wc/v3',
    queryStringAuth: true
  });

export default WooCommerce;
