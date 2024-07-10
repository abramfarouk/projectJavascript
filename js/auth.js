const storedUser = JSON.parse(localStorage.getItem('user'));

if (!storedUser) {
    document.getElementById("log").innerHTML="Login"
    document.getElementById("welcome").innerHTML=``;
    window.location.href = 'login.html';
} else {
    document.getElementById("log").innerHTML="Logout"
    document.getElementById("welcome").innerHTML=`Welcome ${storedUser.userName}`
}


function logout(){
    let check = document.getElementById("log").innerHTML;
    if(check == "Logout"){
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    }
}

