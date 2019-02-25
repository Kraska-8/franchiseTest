
import '../scss/style.scss';



let navControl = document.getElementById('burger-nav')
navControl.onclick = function() {
    this.classList.toggle("change");
    document.getElementById("dropDown").classList.toggle("show");
};


  
let headers = new Headers();
headers.set('Accept', 'application/json');

  const isValidElement = element => {
    return element.name && element.value;
  };

  const formToJSON = elements => [].reduce.call(elements, (data, element) => {
  
    if (isValidElement(element)) {
        data[element.name] = element.value;
      }
    return data;
  
  }, {});

  let modal = document.getElementsByClassName('modal')[0];
  const dataContainer = document.getElementsByClassName('recapcha_error')[0];

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  function recapchaHandler(){
    dataContainer.textContent = '' 
    dataContainer.style.display = "none";
   }

  const handleFormSubmit = event => {    
    event.preventDefault();
    const formData = formToJSON(form.elements);

    if (grecaptcha.getResponse().length == 0){
        dataContainer.style.display = "block";
        dataContainer.textContent = 'Please click the reCAPTCHA checkbox'
        return false;
    }
        
    // const dataContainer = document.getElementsByClassName('results__display')[0];
    // dataContainer.textContent = JSON.stringify(formData, null, "  ");
    fetch('https://franchise-app-35991.firebaseio.com/orders.json', {
        method: 'POST',      
        headers,
        body: JSON.stringify(formData)
    }).then((res) => {
        console.log(res) 
        res.json()
    .then((data) => {
        console.log(data)
        form.reset();
        grecaptcha.reset(); 
        modal.style.display = "block";
        setTimeout(function() {
            modal.style.display = "none";
          }, 3000);
    }
)
    })
    .catch((err)=>console.log(err))
    };

    window.onclick = function(event) {
      if (!event.target.matches('[class*=bar]') && !event.target.matches('.top-nav__burger')) {
        let dropdowns = document.getElementsByClassName("top-nav__menu");
        for (let i = 0; i < dropdowns.length; i++) {
          let openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
              navControl.classList.remove("change");
              openDropdown.classList.remove('show');
          }
        }
      }
    }

  const form = document.getElementsByClassName('contact-form')[0];
  form.addEventListener('submit', handleFormSubmit);
  window.recapchaHandler = recapchaHandler;



