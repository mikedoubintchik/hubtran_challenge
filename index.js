"use strict";

const fs = require("fs");
const dataFolder = "./data";
const newDataFolder = "./new-data";

// assumption: we covered all invoice label formats
const invoiceLabelFormats = [
  "INVOICE# ",
  "Invoice #: ",
  "INVOICE ",
  "Invoice: ",
  "INVOICE #:",
];

const indexOfInvoiceData = (data, invoiceLabelFormats) =>
  data.findIndex((content) => {
    return (
      content.chars.includes(invoiceLabelFormats[0]) ||
      content.chars.includes(invoiceLabelFormats[1]) ||
      content.chars.includes(invoiceLabelFormats[2]) ||
      content.chars.includes(invoiceLabelFormats[3])
    );
  });

const writeNewJson = (file, data) => fs.writeFileSync(file, data);

const updateOCRDATA = (invoiceDataIndex, data) => {
  // assumption: we will always find an invoice for each data sets
  const { left, top, width, height, chars } = data[invoiceDataIndex];

  // assumption: Invoice will always look like identifier (INVOICE# ) followed by invoice number
  let invoiceNumber = "";

  invoiceLabelFormats.forEach((invoiceLabel) => {
    if (chars.includes(invoiceLabel)) {
      invoiceNumber = chars.split(invoiceLabel)[1];
    }
  });

  // assumption: all positioning is the same except invoice number is .01 below the heading
  // assumption: there is only one invoice number per invoice
  data.push({
    left,
    top: top + 0.1,
    width,
    height,
    chars: invoiceNumber,
  });

  // assumption: we just want to remove the number from the existing field and standardize the label format to "INVOICE#"
  data[invoiceDataIndex].chars = "INVOICE#";

  return data;
};

fs.readdirSync(dataFolder).forEach((json) => {
  const OCRData = JSON.parse(fs.readFileSync(`${dataFolder}/${json}`));

  const invoiceDataIndex = indexOfInvoiceData(OCRData, invoiceLabelFormats);

  const updatedOCRDATA = updateOCRDATA(invoiceDataIndex, OCRData);

  writeNewJson(`${newDataFolder}/${json}`, JSON.stringify(updatedOCRDATA));
});
