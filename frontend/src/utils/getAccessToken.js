import Cookies from 'js-cookie';

// Define a function to get the access token from cookies
export function getAccessToken() {
  // Replace 'accessToken' with the actual name of your access token cookie
  return Cookies.get('accessToken');
}
