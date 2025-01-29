let phones = JSON.parse(asi_callswapper.tracking_numbers);
let user_agent = asi_callswapper.user_agent;
let tracking = "";
let separator = ",";


// Convert numbers to strings
phones.forEach(function(item, index) {
    item.real = item.real.toString();
    item.tracked = item.tracked.toString();
    tracking += item.tracked;
    if (index < phones.length - 1) {
        tracking += separator;
    }
});

var date = new Date();
date.setTime(date.getTime() + (86400 * 30));
expires = "; expires=" + date.toUTCString();
document.cookie = "tracking=" + tracking + expires + "; path=/";
document.addEventListener("DOMContentLoaded", function() {
        if(phones) {
            swapAndLinkNumbers();
        }
        // console.log(phones);

        document.body.addEventListener("click", function(event) {
            var target = event.target; // Get the clicked element
        
            // Check if the clicked element is an anchor or its parent is an anchor with an href attribute starting with "tel:"
            if ((target.tagName === "A" && target.getAttribute("href") && target.getAttribute("href").startsWith("tel:")) ||
                (target.parentElement.getAttribute("href") && target.parentElement.getAttribute("href").startsWith("tel:"))) {
        
                // Extract phone number from the href attribute of the anchor element
                var href= target.getAttribute("href");
                if(href){
                    var phoneNumber = target.getAttribute("href").replace("tel:", "");
                }else{
                    var phoneNumber = target.textContent.trim();
                }


                
        
                // // Log or perform any action with the extracted phone number
                // console.log(user_agent);
                // console.log("Clicked phone number:", phoneNumber);
            }
        });
    });
    function swapAndLinkNumbers() {
        var elements = document.querySelectorAll("a[href^='tel:'], p > a[href^='tel:']");
        for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            var href = element.getAttribute("href");
            var phoneNumber = element.textContent;
            var format = extractFormat(phoneNumber);

            if (format) {
                var matchedPhone = findMatchingPhone(formatPhoneNumberForComparison(phoneNumber), phones);

                if (matchedPhone) {
                    var realNumber = matchedPhone.real;
                    var trackedNumber = matchedPhone.tracked;
                    var updatedHref = href.replace(phoneNumber, formatPhoneNumber(trackedNumber, format));
                    element.setAttribute("href", updatedHref);

                    var newTextContent = element.textContent.replace(phoneNumber, formatPhoneNumber(trackedNumber, format));
                    if (element.querySelector("p")) {
                        element.querySelector("p").textContent = newTextContent;
                    } else {
                        element.textContent = newTextContent;
                    }
                }
            }
        }
    }

    function extractFormat(phoneNumber) {
        return phoneNumber.replace(/[0-9]/g, "#");
    }

    function formatPhoneNumberForComparison(phoneNumber) {
        return phoneNumber.replace(/\D/g, ''); // Remove non-digits for comparison
    }

    function findMatchingPhone(phoneNumber, phones) {
        for (var i = 0; i < phones.length; i++) {
            var phone = phones[i];
            if (phoneNumber === formatPhoneNumberForComparison(phone.real)) {
                return phone;
            }
        }
        return null;
    }

    function formatPhoneNumber(number, format) {
        var formattedNumber = '';
        var digitIndex = 0;
        for (var i = 0; i < format.length; i++) {
            if (format[i] === '#') {
                formattedNumber += number[digitIndex];
                digitIndex++;
            } else {
                formattedNumber += format[i];
            }
        }

        return formattedNumber;
    }

    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }