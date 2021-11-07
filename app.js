const urlString = window.location.href;
const getRedirectOutLink = new URL(urlString).searchParams.get("ro");
const getRedirectInLink = new URL(urlString).searchParams.get("ri");
const appVersion = localStorage.getItem('appVersion') || 1;

if (getRedirectOutLink !== null && getRedirectOutLink !== '') {
  location.href = `https://${getRedirectOutLink}`;
} else if (getRedirectInLink !== null && getRedirectInLink !== '') {
  location.href = `${window.location.origin}/${getRedirectInLink}`;
} else {
  window.location.href = `${window.location.origin}/v${appVersion}`;
}