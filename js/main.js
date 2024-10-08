"use strict";
// modal show

$(document).ready(function () {
  var myModal = new bootstrap.Modal(document.getElementById("eighteenPlus"));
  myModal.show();
});

// Dropbox for uploading pictures
document.addEventListener("DOMContentLoaded", () => {
  const dropbox = document.getElementById("dropbox");
  const fileInput = document.getElementById("fileInput");
  const preview = document.getElementById("preview");

  dropbox.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropbox.classList.add("dragover");
  });

  dropbox.addEventListener("dragleave", () => {
    dropbox.classList.remove("dragover");
  });

  dropbox.addEventListener("drop", (e) => {
    e.preventDefault();
    dropbox.classList.remove("dragover");
    const files = e.dataTransfer.files;
    handleFiles(files);
  });

  dropbox.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", (e) => {
    const files = e.target.files;
    handleFiles(files);
  });

  function handleFiles(files) {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement("img");
        img.src = e.target.result;

        const previewImage = document.createElement("div");
        previewImage.classList.add("preview-image");

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "X";
        removeBtn.classList.add("remove-btn");
        removeBtn.addEventListener("click", () => {
          previewImage.remove();
        });

        previewImage.appendChild(img);
        previewImage.appendChild(removeBtn);
        preview.appendChild(previewImage);
      };
      reader.readAsDataURL(file);
    });
  }
});

// disable all select

document.addEventListener("DOMContentLoaded", () => {
  const radioButtons = document.querySelectorAll('input[name="radio-group"]');
  const selectElements = document.querySelectorAll(".adCards select");

  // Function to disable all select elements
  function disableAllSelects() {
    selectElements.forEach((select) => {
      select.disabled = true;
    });
  }

  // Add event listeners to radio buttons
  radioButtons.forEach((radio) => {
    radio.addEventListener("change", (event) => {
      disableAllSelects();
      const selectedRadio = event.target;
      if (selectedRadio.checked) {
        const topAd = selectedRadio.closest(".top-ad");
        if (topAd) {
          const selectElement = topAd.querySelector("select");
          if (selectElement) {
            selectElement.disabled = false;
          }
        }
      }
    });
  });

  // Initial disable all selects
  disableAllSelects();
});

// top add page

document.addEventListener("DOMContentLoaded", () => {
  const radioButtons = document.querySelectorAll(".t-ad");
  const formGroups = document.querySelectorAll(".form-group");

  // Function to hide all form-group elements
  function hideAllFormGroups() {
    formGroups.forEach((formGroup) => {
      formGroup.style.display = "none";
    });
  }

  // Add event listeners to radio buttons
  radioButtons.forEach((radio) => {
    radio.addEventListener("change", (event) => {
      hideAllFormGroups();
      const selectedRadio = event.target;
      if (selectedRadio.checked) {
        const topAd = selectedRadio.closest(".top-ad");
        if (topAd) {
          const nightElement = topAd.querySelector(".night");
          const formGroup = topAd.querySelector(".form-group");
          if (nightElement && formGroup) {
            formGroup.style.display = "block";
          } else if (formGroup) {
            formGroup.style.display = "none";
          }
        }
      }
    });
  });

  // Initial hide all form-group elements
  hideAllFormGroups();
});

// all checkbox select
document.addEventListener("DOMContentLoaded", () => {
  const topAds = document.querySelectorAll(".top-ad");

  topAds.forEach((topAd) => {
    const allCheckbox = topAd.querySelector(".all");
    const hiCheckboxes = topAd.querySelectorAll(".hi");

    // Function to toggle the state of all .hi checkboxes based on the .all checkbox
    function toggleHiCheckboxes(isChecked) {
      hiCheckboxes.forEach((checkbox) => {
        checkbox.checked = isChecked;
      });
    }

    // Add event listener to the .all checkbox
    if (allCheckbox) {
      allCheckbox.addEventListener("change", (event) => {
        toggleHiCheckboxes(event.target.checked);
      });
    }

    // Add event listeners to .hi checkboxes to handle individual changes
    hiCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        // If any .hi checkbox is unchecked, also uncheck the .all checkbox
        if (!checkbox.checked) {
          allCheckbox.checked = false;
        } else {
          // If all .hi checkboxes are checked, check the .all checkbox
          const allChecked = Array.from(hiCheckboxes).every((cb) => cb.checked);
          if (allChecked) {
            allCheckbox.checked = true;
          }
        }
      });
    });
  });
});

// show and hide
document.addEventListener("DOMContentLoaded", () => {
  const selectElements = document.querySelectorAll(".adCards select");
  const radioButtons = document.querySelectorAll(".t-ad");

  // Function to show or hide the form-group based on the select element and presence of day or night class
  function toggleFormGroup(selectElement) {
    const topAd = selectElement.closest(".top-ad");
    if (topAd) {
      const dayElement = topAd.querySelector(".day");
      const nightElement = topAd.querySelector(".night");
      const formGroup = topAd.querySelector(".form-group");
      const radio = topAd.querySelector(".t-ad");
      if (radio && radio.checked && formGroup && dayElement) {
        formGroup.style.display = selectElement.value ? "block" : "none";
      } else if (formGroup) {
        formGroup.style.display = "none";
      }
    }
  }

  // Add event listeners to select elements
  selectElements.forEach((select) => {
    select.addEventListener("change", (event) => {
      toggleFormGroup(event.target);
    });
  });

  // Add event listeners to radio buttons to toggle form group on change
  radioButtons.forEach((radio) => {
    radio.addEventListener("change", () => {
      selectElements.forEach((select) => {
        toggleFormGroup(select);
      });
    });
  });

  // Initial check to hide or show form groups based on default select values
  selectElements.forEach((select) => {
    toggleFormGroup(select);
  });
});

// show and hide highlighs
document.addEventListener("DOMContentLoaded", () => {
  const selectElements = document.querySelectorAll(".adCards select");

  // Function to show or hide the form-group based on the select element and presence of day class
  function toggleFormGroup(selectElement) {
    const topAd = selectElement.closest(".top-ad");
    if (topAd) {
      const dayElement = topAd.querySelector(".day");
      const formGroup = topAd.querySelector(".form-group");
      if (dayElement && formGroup) {
        formGroup.style.display = selectElement.value ? "block" : "none";
      }
    }
  }

  // Add event listeners to select elements
  selectElements.forEach((select) => {
    select.addEventListener("change", (event) => {
      toggleFormGroup(event.target);
    });
  });

  // Initial check to hide or show form groups based on default select values
  selectElements.forEach((select) => {
    toggleFormGroup(select);
  });
});

//dropdown

document.querySelectorAll(".custom-select").forEach((customSelect) => {
  const csInput = customSelect.querySelector(".custom-select-input");
  const csList = customSelect.querySelector(".custom-select-options");
  const csOptions = csList.querySelectorAll("li");
  const csStatus = customSelect.parentElement.querySelector(
    ".custom-select-status"
  );
  const aOptions = Array.from(csOptions);

  if (!csStatus) {
    console.error("Custom select status element not found");
    return;
  }

  let csState = "initial";
  customSelect.setAttribute("role", "combobox");
  customSelect.setAttribute("aria-haspopup", "listbox");
  customSelect.setAttribute("aria-owns", csList.id);
  csInput.setAttribute("aria-autocomplete", "both");
  csInput.setAttribute("aria-controls", csList.id);
  csList.setAttribute("role", "listbox");
  csOptions.forEach((option) => {
    option.setAttribute("role", "option");
    option.setAttribute("tabindex", "-1");
  });
  csStatus.textContent =
    csOptions.length +
    " options available. Arrow down to browse or start typing to filter.";

  customSelect.addEventListener("click", function (e) {
    const currentFocus = document.activeElement;
    switch (csState) {
      case "initial":
        toggleList("Open");
        setState("opened");
        break;
      case "opened":
        if (currentFocus === csInput) {
          toggleList("Shut");
          setState("initial");
        } else if (currentFocus.tagName === "LI") {
          makeChoice(currentFocus);
          toggleList("Shut");
          setState("closed");
        }
        break;
      case "filtered":
        if (currentFocus.tagName === "LI") {
          makeChoice(currentFocus);
          toggleList("Shut");
          setState("closed");
        }
        break;
      case "closed":
        toggleList("Open");
        setState("filtered");
        break;
    }
  });

  customSelect.addEventListener("keyup", function (e) {
    doKeyAction(e.key);
  });

  document.addEventListener("click", function (e) {
    if (!e.target.closest(".custom-select")) {
      toggleList("Shut");
      setState("initial");
    }
  });

  function toggleList(whichWay) {
    if (whichWay === "Open") {
      csList.classList.remove("hidden-all");
      customSelect.setAttribute("aria-expanded", "true");
    } else {
      csList.classList.add("hidden-all");
      customSelect.setAttribute("aria-expanded", "false");
    }
  }

  function moveFocus(fromHere, toThere) {
    const aCurrentOptions = aOptions.filter(
      (option) => option.style.display === ""
    );
    if (aCurrentOptions.length === 0) return;

    if (toThere === "input") {
      csInput.focus();
    }
    switch (fromHere) {
      case csInput:
        toThere === "forward"
          ? aCurrentOptions[0].focus()
          : aCurrentOptions[aCurrentOptions.length - 1].focus();
        break;
      case csOptions[0]:
        toThere === "forward" ? aCurrentOptions[1].focus() : csInput.focus();
        break;
      case csOptions[csOptions.length - 1]:
        toThere === "forward"
          ? aCurrentOptions[0].focus()
          : aCurrentOptions[aCurrentOptions.length - 2].focus();
        break;
      default:
        const currentItem = document.activeElement;
        const whichOne = aCurrentOptions.indexOf(currentItem);
        if (toThere === "forward") {
          aCurrentOptions[whichOne + 1].focus();
        } else if (toThere === "back" && whichOne > 0) {
          aCurrentOptions[whichOne - 1].focus();
        } else {
          csInput.focus();
        }
        break;
    }
  }

  function doFilter() {
    const terms = csInput.value;
    const aFilteredOptions = aOptions.filter((option) =>
      option.innerText.toUpperCase().startsWith(terms.toUpperCase())
    );
    csOptions.forEach((option) => (option.style.display = "none"));
    aFilteredOptions.forEach((option) => (option.style.display = ""));
    setState("filtered");
    updateStatus(aFilteredOptions.length);
  }

  function updateStatus(howMany) {
    if (csStatus) {
      csStatus.textContent = howMany + " options available.";
    }
  }

  function makeChoice(whichOption) {
    csInput.value = whichOption.textContent;
    moveFocus(document.activeElement, "input");
  }

  function setState(newState) {
    csState = newState;
  }

  function doKeyAction(whichKey) {
    const currentFocus = document.activeElement;
    switch (whichKey) {
      case "Enter":
        if (csState === "initial") {
          toggleList("Open");
          setState("opened");
        } else if (csState === "opened" && currentFocus.tagName === "LI") {
          makeChoice(currentFocus);
          toggleList("Shut");
          setState("closed");
        } else if (csState === "opened" && currentFocus === csInput) {
          toggleList("Shut");
          setState("closed");
        } else if (csState === "filtered" && currentFocus.tagName === "LI") {
          makeChoice(currentFocus);
          toggleList("Shut");
          setState("closed");
        } else if (csState === "filtered" && currentFocus === csInput) {
          toggleList("Open");
          setState("opened");
        }
        break;
      case "ArrowDown":
        moveFocus(currentFocus, "forward");
        break;
      case "ArrowUp":
        moveFocus(currentFocus, "back");
        break;
      case "Escape":
        toggleList("Shut");
        setState("closed");
        break;
      default:
        doFilter();
        break;
    }
  }
});

//   ad post

// $(document).ready(function () {
//   var current_fs, next_fs, previous_fs; //fieldsets
//   var opacity;
//   var current = 1;
//   var steps = $("fieldset").length;

//   setProgressBar(current);

//   $(".next").click(function () {
//     current_fs = $(this).parent();
//     next_fs = $(this).parent().next();

//     //Add Class Active
//     $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

//     //show the next fieldset
//     next_fs.show();
//     //hide the current fieldset with style
//     current_fs.animate(
//       { opacity: 0 },
//       {
//         step: function (now) {
//           // for making fielset appear animation
//           opacity = 1 - now;

//           current_fs.css({
//             display: "none",
//             position: "relative",
//           });
//           next_fs.css({ opacity: opacity });
//         },
//         duration: 500,
//       }
//     );
//     setProgressBar(++current);
//   });

//   $(".previous").click(function () {
//     current_fs = $(this).parent();
//     previous_fs = $(this).parent().prev();

//     //Remove class active
//     $("#progressbar li")
//       .eq($("fieldset").index(current_fs))
//       .removeClass("active");

//     //show the previous fieldset
//     previous_fs.show();

//     //hide the current fieldset with style
//     current_fs.animate(
//       { opacity: 0 },
//       {
//         step: function (now) {
//           // for making fielset appear animation
//           opacity = 1 - now;

//           current_fs.css({
//             display: "none",
//             position: "relative",
//           });
//           previous_fs.css({ opacity: opacity });
//         },
//         duration: 500,
//       }
//     );
//     setProgressBar(--current);
//   });

//   function setProgressBar(curStep) {
//     var percent = parseFloat(100 / steps) * curStep;
//     percent = percent.toFixed();
//     $(".progress-bar").css("width", percent + "%");
//   }

//   $(".submit").click(function () {
//     return false;
//   });
// });
$(document).ready(function () {
  var current_fs, next_fs, previous_fs; //fieldsets
  var opacity;
  var current = 1;
  var steps = $("fieldset").length;

  setProgressBar(current);

  $(".next").click(function () {
    // Validate the current fieldset
    if (!validateCurrentStep()) {
      return false; // Prevent moving to the next step if validation fails
    }

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    //Add Class Active
    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    //show the next fieldset
    next_fs.show();
    //hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now) {
          // for making fieldset appear animation
          opacity = 1 - now;

          current_fs.css({
            display: "none",
            position: "relative",
          });
          next_fs.css({ opacity: opacity });
        },
        duration: 500,
      }
    );
    setProgressBar(++current);
  });

  $(".previous").click(function () {
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    //Remove class active
    $("#progressbar li")
      .eq($("fieldset").index(current_fs))
      .removeClass("active");

    //show the previous fieldset
    previous_fs.show();

    //hide the current fieldset with style
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now) {
          // for making fieldset appear animation
          opacity = 1 - now;

          current_fs.css({
            display: "none",
            position: "relative",
          });
          previous_fs.css({ opacity: opacity });
        },
        duration: 500,
      }
    );
    setProgressBar(--current);
  });

  function setProgressBar(curStep) {
    var percent = parseFloat(100 / steps) * curStep;
    percent = percent.toFixed();
    $(".progress-bar").css("width", percent + "%");
  }

  $(".submit").click(function () {
    return false;
  });

  function validateCurrentStep() {
    let isValid = true;
    const currentFieldset = $("fieldset").eq(current - 1);

    // Get all required input fields in the current fieldset
    const requiredFields = currentFieldset.find(
      "input[required], textarea[required], select[required]"
    );

    requiredFields.each(function () {
      if (!$(this).val().trim()) {
        $(this).addClass("error");
        isValid = false;
      } else {
        $(this).removeClass("error");
      }
    });

    // Validate email format
    const emailField = currentFieldset.find('input[type="email"]');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailField.length && !emailRegex.test(emailField.val().trim())) {
      emailField.addClass("error");
      isValid = false;
    } else {
      emailField.removeClass("error");
    }

    // Validate phone number format
    const phoneField = currentFieldset.find('input[placeholder="9123474453"]');
    const phoneRegex = /^\d{10}$/;
    if (phoneField.length && !phoneRegex.test(phoneField.val().trim())) {
      phoneField.addClass("error");
      isValid = false;
    } else {
      phoneField.removeClass("error");
    }

    // Validate that at least one service is selected if services are in this step
    const serviceFields = currentFieldset.find('input[name="radio-group"]');
    const isServiceSelected =
      serviceFields.length > 0 && serviceFields.is(":checked");
    if (serviceFields.length && !isServiceSelected) {
      serviceFields.addClass("error");
      isValid = false;
    } else {
      serviceFields.removeClass("error");
    }

    // Validate terms and conditions if in the current step
    const termsCheckbox = currentFieldset.find('input[type="checkbox"]');
    if (termsCheckbox.length && !termsCheckbox.is(":checked")) {
      termsCheckbox.addClass("error");
      isValid = false;
    } else {
      termsCheckbox.removeClass("error");
    }

    return isValid;
  }
});

// validate
document.addEventListener("DOMContentLoaded", function () {
  const nextButton = document.querySelector(".action-button.next");

  nextButton.addEventListener("click", function () {
    // Collect data from the form
    const formData = {
      adType: document.querySelector('select[name="adType"]').value,
      cities: document.querySelector(".custom-select-input").value,
      address: document.querySelector('input[placeholder="Address"]').value,
      postalCode: document.querySelector('input[placeholder="Postal Code"]')
        .value,
      area: document.querySelector(
        'input[placeholder="Area/ District/ Neighbourhood"]'
      ).value,
      age: document.querySelector('input[placeholder="Age"]').value,
      title: document.querySelector(
        'textarea[placeholder="Give your ad a good title..."]'
      ).value,
      description: document.querySelector(
        'textarea[placeholder="Use this space to describe yourself, your body, talk about your skills what you like..."]'
      ).value,
      ethnicity: document.querySelector('input[name="ethnicity"]:checked')
        ?.value,
      breast: document.querySelector('input[name="check-group"]:checked')
        ?.value,
      nationality: document.querySelector('input[name="check-group"]:checked')
        ?.value,
      hair: document.querySelector('input[name="check-group"]:checked')?.value,
      bodyType: document.querySelector('input[name="check-group"]:checked')
        ?.value,
      services: Array.from(
        document.querySelectorAll('input[name="radio-group"]:checked')
      ).map((input) => input.id),
      attentionTo: Array.from(
        document.querySelectorAll('input[name="check-group"]:checked')
      ).map((input) => input.id),
      placeOfService: Array.from(
        document.querySelectorAll('input[name="check-group"]:checked')
      ).map((input) => input.id),
      pricePerHour: document.querySelector('select[name="price"]').value,
      paymentMethods: Array.from(
        document.querySelectorAll('input[name="radio-group"]:checked')
      ).map((input) => input.id),
      contactMethod: document.querySelector('input[name="radio-group"]:checked')
        ?.id,
      email: document.querySelector('input[type="email"]').value,
      phoneNumber: document.querySelector('input[placeholder="Phone number"]')
        .value,
    };

    // Store data in localStorage
    localStorage.setItem("formData", JSON.stringify(formData));

    // Optionally navigate to the next step or provide feedback
    alert("Information saved!");
  });
});

// img slider for result
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".swiper-container", {
    loop: true,
    slidesPerView: 1,
    // pagination: {
    // 	el: '.swiper-pagination',
    // 	clickable: true,
    // },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});
