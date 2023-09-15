
<script>
    var xhttp = new XMLHttpRequest();
    function CreateOrderID(amount, contactCounts, description) {
        totalAmount = amount*100;
        xhttp.open("GET", "/payment/createOrderId/"+totalAmount, false);
        xhttp.send();
        var razorpayOrderId = xhttp.responseText;
        console.log("razorpayOrderId" + razorpayOrderId);
        OpenCheckout(amount, contactCounts, razorpayOrderId, description);
    }
</script>

<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
<script>
function OpenCheckout(amount, contactCounts, razorpayOrderId, description) {
    var options = {
        "key": "[[${rzp_key_id}]]", // Enter the Key ID generated from the Dashboard
        "amount": totalAmount.toString(), // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "[[${rzp_currency}]]",
        "name": "[[${rzp_company_name}]]",
        "description": description,
        "image": "/assets/users/images/logo.png",
        "order_id": razorpayOrderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "callback_url": "/payment/success/"+amount+"/"+contactCounts+"/[[${rzp_company_name}]]/[[${rzp_currency}]]/"+description,
        "notes": {
            "description": description,
            "company_name": "[[${rzp_company_name}]]",
        },
        "theme": {
            "color": "#004A55"
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.on('payment.failed', function (response){
            console.log(response.error.code);
            console.log(response.error.description);
            console.log(response.error.source);
            console.log(response.error.step);
            console.log(response.error.reason);
            console.log(response.error.metadata.order_id);
            console.log(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
}
</script>