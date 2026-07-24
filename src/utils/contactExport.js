import { normalizeIndianMobile } from "./mobileNumber";

function escapeVCardValue(value = "") {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,");
}

function contactDisplayName(customer) {
  const name = customer.name?.trim() || "LUCK-G'S Customer";
  const place = (customer.place || customer.town || "").trim();
  return place ? `${name} - ${place}` : name;
}

function customerToVCard(customer) {
  const displayName = contactDisplayName(customer);
  const mobile = normalizeIndianMobile(customer.mobile || customer.phone || "");
  const place = (customer.place || customer.town || "").trim();

  return [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `FN:${escapeVCardValue(displayName)}`,
    `N:${escapeVCardValue(displayName)};;;;`,
    mobile ? `TEL;TYPE=CELL:+91${mobile}` : "",
    place ? `ADR;TYPE=HOME:;;;${escapeVCardValue(place)};;;;` : "",
    "ORG:LUCK-G'S Family",
    "END:VCARD",
  ].filter(Boolean).join("\r\n");
}

function safeFileName(value) {
  return value
    .split("")
    .filter((character) => character.charCodeAt(0) >= 32)
    .join("")
    .replace(/[<>:"/\\|?*]/g, "")
    .replace(/\s+/g, "-")
    .slice(0, 70) || "contact";
}

function downloadVCard(contents, fileName) {
  const blob = new Blob([`${contents}\r\n`], { type: "text/vcard;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function saveCustomerContact(customer) {
  downloadVCard(
    customerToVCard(customer),
    `${safeFileName(contactDisplayName(customer))}.vcf`
  );
}

export function saveAllCustomerContacts(customers) {
  const exportableCustomers = customers.filter((customer) =>
    normalizeIndianMobile(customer.mobile || customer.phone || "")
  );

  if (exportableCustomers.length === 0) return 0;

  downloadVCard(
    exportableCustomers.map(customerToVCard).join("\r\n"),
    `luckgs-family-contacts-${new Date().toISOString().slice(0, 10)}.vcf`
  );

  return exportableCustomers.length;
}
