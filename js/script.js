// Registration Form Handling


document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    
    // Form Submit Handling
    registrationForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        const fname = document.getElementById('firstname').value;
        const lname = document.getElementById('lastname').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('password').value;

        const registrationData = {
            FirstName: fname,
            LastName: lname,
            Email: email,
            PhoneNumber: phone,
            Password: password
        };

        try {
            const response = await fetch('https://localhost:7054/api/Account/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registrationData)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Registration successful:', data);

            window.location.href = 'login.html';

            // You can add more actions here, e.g., redirecting to another page
        } catch (error) {
            alert('There was an error with the registration request:', error);
        }
    });

    // Input Validation

    let fname = document.getElementById('firstname');
    let lname = document.getElementById('lastname');
    let email = document.getElementById('email');
    let phone = document.getElementById('phone');
    let password = document.getElementById('password');
    let fnameError = document.getElementById('firstnameVaidation');
    let lnameError = document.getElementById('lastnameVaidation');
    let emailError = document.getElementById('emailVaidation');
    let phoneError =document.getElementById('phoneVaidation');
    let passwordError = document.getElementById('passwordVaidation');

fname.addEventListener("keyup",()=>{
    const pattern = /^[A-Za-z]{3,9}$/;
    let bool = pattern.test(fname.value)
    if(!bool){
        fnameError.innerHTML ="Name should include letters only \n Name should be at least 3 letters";
        fnameError.style.cssText="color: red"
    }else{
        fnameError.innerHTML=''
    }
})

lname.addEventListener("keyup",()=>{
    const pattern = /^[A-Za-z]{3,9}$/;
    let bool = pattern.test(lname.value)
    if(!bool){

        lnameError.innerHTML ="Name should include letters only \n Name should be at least 3 letters";
        lnameError.style.cssText="color: red"
    }else{
        lnameError.innerHTML='';
    }
})

email.addEventListener("keyup",()=>{
    const pattern = /^[A-Za-z]{3,}[A-Za-z0-9._]{0,9}@(gmail\.com|yahoo\.com)$/    ;
    let bool = pattern.test(email.value)
    if(!bool){
        emailError.innerHTML ="Not match, your username must be between 6 and 30 characters long. \n ex: username@example.com";
        emailError.style.cssText="color: red"
    }else{
        emailError.innerHTML=''
    }
})

phone.addEventListener("keyup",()=>{
    const pattern =/^01[1250][0-9]{8}$/  ;
    let bool = pattern.test(phone.value)
    if(!bool){
        phoneError.innerHTML ="your phone invalid should be start 010 or 015 .... and length only 11 character";
        phoneError.style.cssText="color: red"
    }else{
        phoneError.innerHTML='';
    }

    
})

password.addEventListener("keyup",()=>{
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,100}$/;
    let bool = pattern.test(password.value)
    if(!bool){
        passwordError.innerHTML =" include at least one uppercase letter, one lowercase letter, one number, and one special character.";
        passwordError.style.cssText="color: red"
    }else{
        passwordError.innerHTML=''
    }
})


    registrationForm.addEventListener('input', function(e) {
        const regex = {
            firstname: /^[A-Za-z]{3,9}$/,
            lastname:/^[A-Za-z]{3,9}$/,
            email: /^[A-Za-z]{3,}[A-Za-z0-9._]{0,9}@(gmail\.com|yahoo\.com)$/,
            phone: /^01[1250][0-9]{8}$/,
            password:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,100}$/
        };

        if (regex[e.target.id].test(e.target.value)) {
            e.target.classList.remove("is-invalid");
            e.target.classList.add("is-valid");
        } else {
            e.target.classList.add("is-invalid");
            e.target.classList.remove("is-valid");
        }
    });

    // Submit Button Validation
    const registerButton = document.getElementById('register');
    registerButton.addEventListener('click', (event) => {
        const fname = document.getElementById('firstname').value.trim();
        const lname = document.getElementById('lastname').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!fname || !lname || !email || !phone || !password) {
            alert('All fields are required.');
            event.preventDefault(); // Prevent the form from submitting
        }
    });
});

// Login Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    // Form Submit Handling
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        const loginData = {
            Email: email,
            Password: password
        };

        try {
            const response = await fetch('https://localhost:7054/api/Account/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            if (!response.ok) {
                alert("password or email invalid")

                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log(data)
            localStorage.setItem('user', JSON.stringify(data));
            window.location.href = 'Homepage.html';
            // You can add more actions here, e.g., redirecting to another page
        } catch (error) {
            console.log('There was an error with the login request:', error);
        }
    });

    // Input Validation
    loginForm.addEventListener('input', function(e) {
        const regex = {
            email: /^[A-Za-z]{3,}[A-Za-z0-9._]{0,9}@(gmail\.com|yahoo\.com)$/,
            password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,100}$/
        };

        if (regex[e.target.id].test(e.target.value)) {
            e.target.classList.remove("is-invalid");
            e.target.classList.add("is-valid");
        } else {
            e.target.classList.add("is-invalid");
            e.target.classList.remove("is-valid");
        }
    });

    // Submit Button Validation
    const loginButton = document.getElementById('login');
    loginButton.addEventListener('click', (event) => {
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();

        if (!email || !password) {
            alert('All fields are required.');
            event.preventDefault(); // Prevent the form from submitting
        }
    });
});
