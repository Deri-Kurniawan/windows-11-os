const urlString = window.location.href;
const urlTarget = new URL(urlString).searchParams.get("to");

console.log(urlTarget)

if (urlTarget !== null && urlTarget !== '') {
    location.href = `https://${urlTarget}`;
}