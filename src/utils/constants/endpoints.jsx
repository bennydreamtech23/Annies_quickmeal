export const HEADER_FOOTER_ENDPOINT = `${
  import.meta.env.VITE_PUBLIC_SITE_URL
}/wp-json/rae/v1/header-footer?header_location_id=hcms-menu-header&footer_location_id=hcms-menu-footer`;
export const GET_POSTS_ENDPOINT = `${
  import.meta.env.VITE_PUBLIC_SITE_URL
}/wp-json/rae/v1/posts`;
export const GET_POST_ENDPOINT = `${
  import.meta.env.VITE_PUBLIC_SITE_URL
}/wp-json/wp/v2/posts`;
export const GET_PAGES_ENDPOINT = `${
  import.meta.env.VITE_PUBLIC_BASE_URL
}/wp-json/wp/v2/pages`;
export const COMMENTS_ENDPOINT = `${
  import.meta.env.VITE_PUBLIC_SITE_URL
}/wp-json/wp/v2/comments`;

/**
 * Cart
 * @type {string}
 */
export const CART_ENDPOINT = `${
  import.meta.env.VITE_PUBLIC_SITE_URL
}/wp-json/rae/v1/cart/items/`;

// Countries and States
export const WOOCOMMERCE_COUNTRIES_ENDPOINT = `${
  import.meta.env.VITE_PUBLIC_SITE_URL
}/wp-json/rae/v1/wc/countries/`;
export const WOOCOMMERCE_STATES_ENDPOINT = `${
  import.meta.env.VITE_PUBLIC_SITE_URL
}/wp-json/rae/v1/wc/states`;
