const urlString = window.location.href;
const urlTarget = new URL(urlString).searchParams.get("to");

if (urlTarget !== null && urlTarget !== '') {
    location.href = `https://${urlTarget}`;
}
