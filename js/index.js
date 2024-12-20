document.addEventListener("DOMContentLoaded", () => {
  const cardNumberInput = document.getElementById("card-number-input");
  const cardholderNameInput = document.getElementById("cardholder-name");
  const expiryMonthInput = document.getElementById("expiry-month");
  const expiryYearInput = document.getElementById("expiry-year");
  const cvcInput = document.getElementById("cvc");

  const cardNumberDisplay = document.getElementById("card-number");
  const cardNameDisplay = document.getElementById("card-name");
  const cardExpiryDisplay = document.getElementById("card-expiry");
  const cardCvcDisplay = document.getElementById("card-cvc");
  const paymentForm = document.getElementById("payment-form");
  const thankYouMessage = document.getElementById("thank-you-message");
  const confirmButton = document.getElementById("confirm-button");
  const continueButton = document.getElementById("continue-button");

  cardNumberInput.addEventListener("input", () => {
    const cursorPosition = cardNumberInput.selectionStart;
    const rawValue = cardNumberInput.value.replace(/\s/g, ""); // Hapus spasi dari input
    const formattedValue = formatCardNumber(rawValue);
  
    // Hitung perubahan posisi kursor akibat penambahan spasi
    const addedSpaces = (formattedValue.slice(0, cursorPosition).match(/\s/g) || []).length;
    const previousSpaces = (cardNumberInput.value.slice(0, cursorPosition).match(/\s/g) || []).length;
    const spaceDifference = addedSpaces - previousSpaces;
  
    // Perbarui nilai input dan tampilkan di kartu
    cardNumberInput.value = formattedValue;
    cardNumberDisplay.textContent = formattedValue || "0000 0000 0000 0000";
  
    // Setel posisi kursor yang baru
    const newCursorPosition = cursorPosition + spaceDifference;
    cardNumberInput.selectionStart = cardNumberInput.selectionEnd = newCursorPosition;
  });  

  cardholderNameInput.addEventListener("input", () => {
    // Ambil nilai input dan pecah menjadi array berdasarkan spasi
    const value = cardholderNameInput.value;
    const capitalizedValue = value
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    
    // Memperbarui nilai input dan menampilkan nama dengan huruf kapital pada setiap kata
    cardholderNameInput.value = capitalizedValue;
    cardNameDisplay.textContent = capitalizedValue.toUpperCase() || "JANE APPLESEED";
  });

  expiryMonthInput.addEventListener("input", () => {
    updateExpiryDate();
  });

  expiryYearInput.addEventListener("input", () => {
    updateExpiryDate();
  });

  cvcInput.addEventListener("input", () => {
    cardCvcDisplay.textContent = cvcInput.value || "000";
  });

  function updateExpiryDate() {
    const month = expiryMonthInput.value.padStart(2, "0");
    const year = expiryYearInput.value.padStart(2, "0");
    cardExpiryDisplay.textContent = `${month}/${year}` || "00/00";
  }
  function formatCardNumber(value) {
    // Hapus semua spasi dan pastikan hanya angka yang tersisa
    const numericValue = value.replace(/\D/g, "");
    // Tambahkan spasi setiap 4 digit
    const formattedValue = numericValue.match(/.{1,4}/g)?.join(" ") || "";
    return formattedValue;
  }

  function resetCard() {
    // Reset card content
    document.getElementById('card-number').textContent = "0000 0000 0000 0000";
    document.getElementById('card-name').textContent = "JANE APPLESEED";
    document.getElementById('card-expiry').textContent = "00/00";
    document.getElementById('card-cvc').textContent = "000";
  
    // Hide the back side and show the front side
    document.getElementById('card-front').classList.remove('hidden');
    document.getElementById('card-back').classList.add('hidden');
  
    // Reset any animation or transform properties if necessary
    document.getElementById('card').style.transform = 'rotateY(0deg)';
  }
  
  // Call resetCard when user clicks the "Continue" button or trigger any reset event
  document.getElementById('continue-button').addEventListener('click', resetCard);  

  // When the user clicks on "Confirm", hide the form and show the "Thank You" message
  confirmButton.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent form submission
    
    // Clear previous error states
    const inputs = [cardNumberInput, cardholderNameInput, expiryMonthInput, expiryYearInput, cvcInput];
    inputs.forEach(input => {
      input.classList.remove("border-red-500");
    });
  
    // Handle EXP. DATE error message specifically
    const expErrorElement = expiryMonthInput.parentElement.parentElement.querySelector("span.text-red-500");
    expErrorElement.classList.add("hidden");
  
    // Check for empty fields and apply validation
    let hasError = false;

    function validateInput(input) {
      const value = input.value.trim();
      const errorElement = input.nextElementSibling;
  
      if (value === "" || (input === cardNumberInput && value.replace(/\s/g, "").length < 16) || (input === cvcInput && value.length < 3)) {
        input.classList.add("border-red-500", "shake");
        
        // Tampilkan pesan error jika ada
        if (errorElement && errorElement.classList.contains("text-red-500")) {
          errorElement.classList.remove("hidden");
        }
    
        // Menghapus kelas shake setelah animasi selesai
        input.addEventListener("animationend", () => {
          input.classList.remove("shake");
        });
    
        return false;
      } else {
        // Jika valid, hapus efek error
        input.classList.remove("border-red-500");
        if (errorElement && errorElement.classList.contains("text-red-500")) {
          errorElement.classList.add("hidden");
        }
    
        return true;
      }
    }
  
    inputs.forEach(input => {
      if (input.value.trim() === "") {
        input.classList.add("border-red-500"); // Add red border
  
        // Show error message for specific inputs
        if (input === expiryMonthInput || input === expiryYearInput) {
          expErrorElement.classList.remove("hidden");
        } else {
          const errorElement = input.nextElementSibling;
          if (errorElement && errorElement.classList.contains("text-red-500")) {
            errorElement.classList.remove("hidden");
          }
        }
        hasError = true;
      }
      input.addEventListener("input", () => {
        validateInput(input);
      });
      const isValid = validateInput(input);
      if (!isValid) {
        hasError = true; // Jika validasi gagal, set hasError ke true
        
      }
      input.addEventListener("input", () => {
        validateInput(input);
        // Cek kembali jika ada error
        const isFormValid = inputs.every(input => validateInput(input));
       
      });
    });

    if (hasError) {
      return; // Jika ada error, hentikan eksekusi dan jangan tampilkan pesan "Thank You"
    }
  
    // If no error, proceed to the thank-you message
    if (!hasError) {
      paymentForm.classList.add("hidden"); // Hide the form
      thankYouMessage.classList.remove("hidden"); // Show the thank-you message
    }
  });
  
  // When the user clicks on "Continue", reset the form and show it again
  continueButton.addEventListener("click", () => {
    window.location.reload();
  });
  
});

