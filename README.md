## Introduction

This is the initial coding challenge for the HubTran interview process. You may complete this challenge in any language you like. The code you submit doesn't need to reflect the code you would write in production. We're more interested in you getting the job done. Once you have completed the challenge, please reply to the email that included the challenge url (not the email with the code attached) with an archive of your code. You have one hour to complete this challenge.

## Your Task

In the data directory you will find 5 JSON files. Each file contains OCR data for one document sent to HubTran. The format is:

```
[{"left":0.8997641509433962,"top":0.03090909090909091,"width":0.03616352201257855,"height":0.009393939393939395,"chars":"1 of 1"}...]
```

Each entry in the array represents an area of text on the page. The left, top, width, and height values are the percentage of the page from the upper left. We use this data to generate a div that will allow customers to drag and drop text from documents into text field.

Unfortunately, in these examples, the invoice number field wasn't cleanly recognized. The field label and value were included in one box of text. When a customer tries to drag and drop the invoice number, they will get "INVOICE # 1234" instead of just "1234". Your task is to fix this by writing code to read the data and output modified JSON but with the invoice numbers split into two entries in the array.

Feel free to make whatever assumptions are necessary to complete this challenge. Please share and explain your assumptions when submitting your results.

Good luck!
