function toolkitFormReporter(customer, message) {
    console.log("Toolkit form data:", customer, message);
    data = new FormData();
    data.append('first_name', customer.first_name);
    data.append('last_name', customer.last_name);
    data.append('email', customer.email);
    data.append('phone', customer.phone);
    data.append('message', message);
    // let response = fetch(fastlane.ajaxurl, {
    //     method: 'POST',
    //     credentials: 'same-origin',
    //     body: data
    // })
}