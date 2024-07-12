      let contact = document.forms.contactUsForm;
      let form = document.querySelector('#contactUsForm');
      
          form.addEventListener('submit', async (e) => {
              e.preventDefault();  
      
              let formData = new FormData(form);
              let data={};
      
              formData.forEach((value, key) => {      
                  data[key] = value;
              });
              try {
                  const response = await fetch("/contact", {
                      method: "POST",
                      headers: {
                          "Content-Type": "application/json",
                      },
                      body: JSON.stringify(data)
                  });
      
                  const result = await response.json();
      
                  if (result.inserted) {
                      Swal.fire({
                          icon: "success",
                          title: "Submitted!",
                          text: "Your message has been received. We will contact you shortly."
                      });
                      form.reset();
                  } else {
                      Swal.fire({
                          icon: "error",
                          title: "Error in Submitting!!!",
                          text: "Please try again"
                      });
                  }
              } catch (error) {
                  Swal.fire({
                      icon: "error",
                      title: "Error",
                      text:"Error saving contact information"
                  });
              }
          });
      
      