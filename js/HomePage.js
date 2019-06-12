
var emailList = new Array();
var passwordList = new Array();

emailList = ["jose@hotmail.com", "maria@hotmail.com", "jose@gmail.com", "freidy@itla.edu.do"];
passwordList = ["1234", "5678", "0123", "1234"];



document.getElementById("InputEmail").addEventListener("click", function () {
    document.getElementById("help-block").innerHTML = "";
})


function VerifyEmail() {

    var inputEmail = document.getElementById("InputEmail").value;
    var inputPass = document.getElementById("InputPassword").value;

    var counter = 0;
    var filter = /\S+@\S+\.\S+/;

    if (inputEmail == null || inputEmail.length == 0 || /^\s+$/.test(inputEmail)) {
        document.getElementById("help-block").innerHTML = "Disculpe, el campo Email es obligatorio";
        $("#help-block").shake(3, 6, 600);
    }
    else if (!filter.test(inputEmail)) {
        document.getElementById("help-block").innerHTML = "Por favor introduzca un Email valido";
        $("#help-block").shake(3, 6, 600);
    }
    else {
        emailList.forEach(element => {
            if (element == inputEmail) {
                if (passwordList[counter] == inputPass) {
                    window.location = 'MainPage.html';
                    return true;
                }
                else {
                    document.getElementById("help-block").innerHTML = "Usuario o contraseña incorrecta";
                    $("#help-block").shake(3, 6, 600);
                }
            }
            else {
                document.getElementById("help-block").innerHTML = "Usuario o contraseña incorrecta";
                $("#help-block").shake(3, 6, 600);
            }
            counter++;
        });
    }
}

jQuery.fn.shake = function (intShakes, intDistance, intDuration) {
    this.each(function () {
        $(this).css("position", "relative");
        for (var x = 1; x <= intShakes; x++) {
            $(this).animate({ left: (intDistance * -1) }, (((intDuration / intShakes) / 4)))
                .animate({ left: intDistance }, ((intDuration / intShakes) / 2))
                .animate({ left: 0 }, (((intDuration / intShakes) / 4)));
        }
    });
    return this;
};