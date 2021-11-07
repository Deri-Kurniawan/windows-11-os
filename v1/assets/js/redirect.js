const urlString = window.location.href;
const getRedirectOutLink = new URL(urlString).searchParams.get("ro");
const getRedirectInLink = new URL(urlString).searchParams.get("ri");

if (getRedirectOutLink !== null && getRedirectOutLink !== '') {
  location.href = `https://${getRedirectOutLink}`;
}

if (getRedirectInLink !== null && getRedirectInLink !== '') {
  location.href = `${window.location.origin}/${getRedirectInLink}`;
}