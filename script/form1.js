function handleTicketChange(ticket, isIncrease) {
    const ticketInput = document.getElementById(ticket + "-count");
    const ticketCount = getInputValueTicket(ticket);
    let ticketNewCount = ticketCount;
    if (isIncrease == true) {
      ticketNewCount = ticketCount + 1;
    }
    if (isIncrease == false && ticketCount > 0) {
      ticketNewCount = ticketCount - 1;
    }
    ticketInput.value = ticketNewCount;
    let ticketTotal = 0;
    if (ticket == "first-class") {
      ticketTotal = ticketNewCount * 1219;
    }
    if (ticket == "economy") {
      ticketTotal = ticketNewCount * 59;
    }
    calculateTotal();
  }

  function calculateTotal() {
    const firstClassCount = getInputValueTicket("first-class");
    const economyCount = getInputValueTicket("economy");

    const totalPrice = firstClassCount * 150 + economyCount * 100;

    document.getElementById("sub-total").innerText = "$" + totalPrice;

    const tax = Math.round(totalPrice * 0.1);
    document.getElementById("tax-amount").innerText = "$" + tax;

    const grandTotal = totalPrice + tax;
    document.getElementById("total").innerText = "$" + grandTotal;
  }

  function getInputValueTicket(ticket) {
    const ticketInput = document.getElementById(ticket + "-count");
    const ticketCount = parseInt(ticketInput.value);
    
    return ticketCount;
  }

  document.getElementById("book-now").addEventListener("click", function(){
      document.getElementById("booking-going-on").style.display = "none";
      document.getElementById("booking-successful").style.display = "block";

      getInputValueFlying("flying-from");
      getInputValueFlying("flying-to");
      getInputValueDate("departure");
      getInputValueDate("return");
      getCurrentTicketCount("first-class-count");
      getCurrentTicketCount("economy-count");
      getCurrentTotalCost("total");
  });

  function getInputValueFlying(status){
      const updatedStatus = document.getElementById(status + "-input").value
      if(updatedStatus != ""){
          document.getElementById(status + "-final-view").innerText = updatedStatus;
      }
      else{
          document.getElementById(status + "-final-view").innerText = "invalid";
      }
  }

  function getInputValueDate(status){
      const dateEntered = document.getElementById(status + "-input").value;
      const updatedDate = new Date(dateEntered);
      console.log(dateEntered);
      document.getElementById(status + "-final-view").innerText = updatedDate;
  }

  function getCurrentTicketCount(status){
      const updatedStatus = document.getElementById(status).value;
      document.getElementById(status + "-final-view").innerText = updatedStatus;
  }

  function getCurrentTotalCost(status){
      const updatedStatus = document.getElementById(status).innerText;
      document.getElementById(status + "-final-view").innerText = updatedStatus;
  }
