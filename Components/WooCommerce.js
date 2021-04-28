import React from 'react'
import WooCommerceRestApi from 'react-native-woocommerce-api';

const WooCommerce = new WooCommerceRestApi({
    url: 'http://grocers.upgrate.in/',
    ssl: true,
    consumerKey: 'ck_b5bd0361fac68c0c2856a7947a691197163324d5',
    consumerSecret: 'cs_1ff19c9d13cdd3353c16f3a8dc7558661139dcbd',
    wpAPI: true,
    version: 'wc/v3',
    queryStringAuth: true
  });

export default WooCommerce;
