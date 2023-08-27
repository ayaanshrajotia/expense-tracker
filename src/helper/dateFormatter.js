export function formatDateToDdMmYyyy(isoTimestamp) {
    const date = new Date(isoTimestamp);

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export function textFormatter(text) {
    return text?.charAt(0).toUpperCase() + text?.slice(1);
}
