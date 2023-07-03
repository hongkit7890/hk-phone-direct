const directoryElement = document.getElementById("directory");
const entryForm = document.getElementById("entry-form");
const companyNameInput = document.getElementById("company-name");
const infoInput = document.getElementById("info");
const contactNameInput = document.getElementById("contact-name");

let companies = [];

// Fetch the JSON data and display the directory
fetch("/phone-directory")
  .then(response => response.json())
  .then(data => {
    companies = data.companies;
    displayDirectories();
  })
  .catch(error => {
    console.log("Error fetching phone directory data:", error);
  });

function displayDirectories() {
  directoryElement.innerHTML = ""; // Clear existing content

  companies.forEach(company => {
    const companyNameElement = document.createElement("h1");
    //companyNameElement.textContent = company.name ;
    companyNameElement.textContent = `${company.name} - ${company.phoneDirectory.baseNumber}`;
    directoryElement.appendChild(companyNameElement);

    const { baseNumber, extensions } = company.phoneDirectory;

    extensions.forEach(extension => {
      const { info, layers } = extension;
      const extensionElement = document.createElement("div");
      extensionElement.classList.add("directory-item");

      const infoElement = document.createElement("h2");
      infoElement.textContent = `${extension.id} - ${info}`;
      extensionElement.appendChild(infoElement);

      layers.forEach(contact => {
        const contactElement = document.createElement("p");
        contactElement.classList.add("contact");
        contactElement.textContent = `${contact.name} - ${baseNumber} - ${extension.id} - ${contact.id} `;
        extensionElement.appendChild(contactElement);
        
        // Add a "Modify" button
        const modifyButton = document.createElement("button");
        modifyButton.textContent = "Modify";
        modifyButton.classList.add("modify-button");
        modifyButton.addEventListener("click", () => editContact(company.name, extension.id, contact.id));
        contactElement.appendChild(modifyButton);
      
      });

      

      directoryElement.appendChild(extensionElement);
    });
  });
}

function editContact(companyName, extensionId, contactId) {
  // Find the company, extension, and contact to edit
  const company = companies.find(c => c.name === companyName);
  const extension = company.phoneDirectory.extensions.find(e => e.id === extensionId);
  const contact = extension.layers.find(c => c.id === contactId);

  // Open a modal or a new form to edit the contact information
  // This is just an example, you can implement your own solution to collect user input
  const newContactName = prompt(`Edit contact name for ${contact.name}`, contact.name);

  // Update the contact information in the JSON data
  if (newContactName) {
    contact.name = newContactName;
    displayDirectories();
  }
}

entryForm.addEventListener("submit", event => {
  event.preventDefault(); // Prevent the form from submitting and refreshing the page

  const companyName = companyNameInput.value.trim();
  const infoName = infoInput.value.trim();
  const contactName = contactNameInput.value.trim();

  if (companyName && infoName && contactName) {
    fetch("/phone-directory", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        companyName: companyName,
        info: infoName,
        contactName: contactName
      })
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        // Fetch the updated JSON data and display the directory
        fetch("/phone-directory")
          .then(response => response.json())
          .then(data => {
            companies = data.companies;
            displayDirectories();
          })
          .catch(error => {
            console.log("Error fetching phone directory data:", error);
          });
      })
      .catch(error => {
        console.log("Error updating phone directory data:", error);
      });

    // Clear the form inputs
    companyNameInput.value = "";
    infoInput.value = "";
    contactNameInput.value = "";
  }
});