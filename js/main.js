// modal show

$(document).ready(function() {
    var myModal = new bootstrap.Modal(document.getElementById('eighteenPlus'));
    myModal.show();
});

document.addEventListener('DOMContentLoaded', () => {
    const dropbox = document.getElementById('dropbox');
    const fileInput = document.getElementById('fileInput');
    const preview = document.getElementById('preview');

    dropbox.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropbox.classList.add('dragover');
    });

    dropbox.addEventListener('dragleave', () => {
        dropbox.classList.remove('dragover');
    });

    dropbox.addEventListener('drop', (e) => {
        e.preventDefault();
        dropbox.classList.remove('dragover');
        const files = e.dataTransfer.files;
        handleFiles(files);
    });

    dropbox.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        handleFiles(files);
    });

    function handleFiles(files) {
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;

                const previewImage = document.createElement('div');
                previewImage.classList.add('preview-image');

                const removeBtn = document.createElement('button');
                removeBtn.textContent = 'X';
                removeBtn.classList.add('remove-btn');
                removeBtn.addEventListener('click', () => {
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

//dropdown

document.querySelectorAll('.custom-select').forEach(customSelect => {
	const csInput = customSelect.querySelector('.custom-select-input');
	const csList = customSelect.querySelector('.custom-select-options');
	const csOptions = csList.querySelectorAll('li');
	const csStatus = customSelect.parentElement.querySelector('.custom-select-status');
	const aOptions = Array.from(csOptions);
  
	if (!csStatus) {
	  console.error('Custom select status element not found');
	  return;
	}
  
	let csState = "initial";
	customSelect.setAttribute('role', 'combobox');
	customSelect.setAttribute('aria-haspopup', 'listbox');
	customSelect.setAttribute('aria-owns', csList.id);
	csInput.setAttribute('aria-autocomplete', 'both');
	csInput.setAttribute('aria-controls', csList.id);
	csList.setAttribute('role', 'listbox');
	csOptions.forEach(option => {
	  option.setAttribute('role', 'option');
	  option.setAttribute('tabindex', "-1");
	});
	csStatus.textContent = csOptions.length + " options available. Arrow down to browse or start typing to filter.";
  
	customSelect.addEventListener('click', function(e) {
	  const currentFocus = document.activeElement;
	  switch(csState) {
		case 'initial':
		  toggleList('Open');
		  setState('opened');
		  break;
		case 'opened':
		  if (currentFocus === csInput) {
			toggleList('Shut');
			setState('initial');
		  } else if (currentFocus.tagName === 'LI') {
			makeChoice(currentFocus);
			toggleList('Shut');
			setState('closed');
		  }
		  break;
		case 'filtered':
		  if (currentFocus.tagName === 'LI') {
			makeChoice(currentFocus);
			toggleList('Shut');
			setState('closed');
		  }
		  break;
		case 'closed':
		  toggleList('Open');
		  setState('filtered');
		  break;
	  }
	});
  
	customSelect.addEventListener('keyup', function(e) {
	  doKeyAction(e.key);
	});
  
	document.addEventListener('click', function(e) {
	  if (!e.target.closest('.custom-select')) {
		toggleList('Shut');
		setState('initial');
	  }
	});
  
	function toggleList(whichWay) {
	  if (whichWay === 'Open') {
		csList.classList.remove('hidden-all');
		customSelect.setAttribute('aria-expanded', 'true');
	  } else {
		csList.classList.add('hidden-all');
		customSelect.setAttribute('aria-expanded', 'false');
	  }
	}
  
	function moveFocus(fromHere, toThere) {
	  const aCurrentOptions = aOptions.filter(option => option.style.display === '');
	  if (aCurrentOptions.length === 0) return;
  
	  if (toThere === 'input') {
		csInput.focus();
	  }
	  switch(fromHere) {
		case csInput:
		  toThere === 'forward' ? aCurrentOptions[0].focus() : aCurrentOptions[aCurrentOptions.length - 1].focus();
		  break;
		case csOptions[0]:
		  toThere === 'forward' ? aCurrentOptions[1].focus() : csInput.focus();
		  break;
		case csOptions[csOptions.length - 1]:
		  toThere === 'forward' ? aCurrentOptions[0].focus() : aCurrentOptions[aCurrentOptions.length - 2].focus();
		  break;
		default:
		  const currentItem = document.activeElement;
		  const whichOne = aCurrentOptions.indexOf(currentItem);
		  if (toThere === 'forward') {
			aCurrentOptions[whichOne + 1].focus();
		  } else if (toThere === 'back' && whichOne > 0) {
			aCurrentOptions[whichOne - 1].focus();
		  } else {
			csInput.focus();
		  }
		  break;
	  }
	}
  
	function doFilter() {
	  const terms = csInput.value;
	  const aFilteredOptions = aOptions.filter(option => option.innerText.toUpperCase().startsWith(terms.toUpperCase()));
	  csOptions.forEach(option => option.style.display = "none");
	  aFilteredOptions.forEach(option => option.style.display = "");
	  setState('filtered');
	  updateStatus(aFilteredOptions.length);
	}
  
	function updateStatus(howMany) {
	  if (csStatus) {
		csStatus.textContent = howMany + " options available.";
	  }
	}
  
	function makeChoice(whichOption) {
	  csInput.value = whichOption.textContent;
	  moveFocus(document.activeElement, 'input');
	}
  
	function setState(newState) {
	  csState = newState;
	}
  
	function doKeyAction(whichKey) {
	  const currentFocus = document.activeElement;
	  switch(whichKey) {
		case 'Enter':
		  if (csState === 'initial') {
			toggleList('Open');
			setState('opened');
		  } else if (csState === 'opened' && currentFocus.tagName === 'LI') {
			makeChoice(currentFocus);
			toggleList('Shut');
			setState('closed');
		  } else if (csState === 'opened' && currentFocus === csInput) {
			toggleList('Shut');
			setState('closed');
		  } else if (csState === 'filtered' && currentFocus.tagName === 'LI') {
			makeChoice(currentFocus);
			toggleList('Shut');
			setState('closed');
		  } else if (csState === 'filtered' && currentFocus === csInput) {
			toggleList('Open');
			setState('opened');
		  }
		  break;
		case 'ArrowDown':
		  moveFocus(currentFocus, 'forward');
		  break;
		case 'ArrowUp':
		  moveFocus(currentFocus, 'back');
		  break;
		case 'Escape':
		  toggleList('Shut');
		  setState('closed');
		  break;
		default:
		  doFilter();
		  break;
	  }
	}
  });


//   ad post

$(document).ready(function(){

	var current_fs, next_fs, previous_fs; //fieldsets
	var opacity;
	var current = 1;
	var steps = $("fieldset").length;
	
	setProgressBar(current);
	
	$(".next").click(function(){
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//Add Class Active
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//show the next fieldset
	next_fs.show();
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
	step: function(now) {
	// for making fielset appear animation
	opacity = 1 - now;
	
	current_fs.css({
	'display': 'none',
	'position': 'relative'
	});
	next_fs.css({'opacity': opacity});
	},
	duration: 500
	});
	setProgressBar(++current);
	});
	
	$(".previous").click(function(){
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//Remove class active
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show();
	
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
	step: function(now) {
	// for making fielset appear animation
	opacity = 1 - now;
	
	current_fs.css({
	'display': 'none',
	'position': 'relative'
	});
	previous_fs.css({'opacity': opacity});
	},
	duration: 500
	});
	setProgressBar(--current);
	});
	
	function setProgressBar(curStep){
	var percent = parseFloat(100 / steps) * curStep;
	percent = percent.toFixed();
	$(".progress-bar")
	.css("width",percent+"%")
	}
	
	$(".submit").click(function(){
	return false;
	})
	
	});

  