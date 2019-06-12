listdata = [{ "#": "1", "Nombre": "Jose Ramirez", "Email": "jose@hotmail.com", "Sueldo": "10000" }, { "#": "2", "Nombre": "Pedro Santana", "Email": "pedro@hotmail.com", "Sueldo": "15000" }];

var adminPass = "1234";

var table = document.getElementById("tabletoPrint"), rIndex;

$("#firstData").mirandajs(listdata);

function CreateUser() {
    var index = listdata.length + 1;
    var templist;
    var toPrint = "";

    var userEmail = document.getElementById("RegisterUser-Email").value;
    var userSueldo = document.getElementById("RegisterUser-Sueldo").value;
    var userName = document.getElementById("RegisterUser-Name").value;

    templist = { "#": index.toString(), "Nombre": userName.toString(), "Email": userEmail.toString(), "Sueldo": userSueldo.toString() };

    listdata.push(templist);


    toPrint += '<tr>';
    toPrint += '<td>' + templist["#"] + '</td>';
    toPrint += '<td>' + templist.Nombre + '</td>';
    toPrint += '<td>' + templist.Email + '</td>';
    toPrint += '<td>' + templist.Sueldo + '</td>';
    toPrint += '</tr>';
    $('#tabletoPrint').append(toPrint);
    selectedRowToInput();
}

selectedRowToInput();

// Select row
function selectedRowToInput() {
    for (var i = 1; i < table.rows.length; i++) {
        table.rows[i].onclick = function () {

            rIndex = this.rowIndex;
            console.log(typeof rIndex);

            if (typeof rIndex != "undefined") {
                tableRemoveColor("tr")
                this.classList.toggle("table-primary");
            }

            document.getElementById("RegisterUser-Name").value = this.cells[1].innerHTML;
            document.getElementById("RegisterUser-Email").value = this.cells[2].innerHTML;
            document.getElementById("RegisterUser-Sueldo").value = this.cells[3].innerHTML;
            calculatePayment(this.cells[3].innerHTML)
        };
    }
}

//edit row
function EditRow() {
    table.rows[rIndex].cells[1].innerHTML = document.getElementById("RegisterUser-Name").value;
    table.rows[rIndex].cells[2].innerHTML = document.getElementById("RegisterUser-Email").value;
    table.rows[rIndex].cells[3].innerHTML = document.getElementById("RegisterUser-Sueldo").value;
    $(".table-primary").shake(1, 5, 400);
}

//Remove table colors
function tableRemoveColor(x) {
    elements = document.getElementsByTagName(x);
    for (var i = 0; i < elements.length; i++) {
        elements[i].classList.remove("table-primary");
    }
}


// Delete row
function deleteRowToInput() {
    let p = document.getElementById("ValidateAdminPass").value;
    if (p == adminPass) {
        document.getElementById("tabletoPrint").deleteRow(rIndex);
        document.getElementById("ValidateAdminPass").value ="";
        $('#ValidateAdmin').modal('hide')
        document.getElementById("help-block").innerHTML = "";
    }
    else {
        document.getElementById("help-block").innerHTML = "Contraseña incorrecta";
        $("#help-block").shake(3, 6, 600);
    }
}


//calculate Payment
function calculatePayment(pay) {

    var sueldo = pay;
    var exento = 0;

    if (sueldo > 34685) {
        if (sueldo <= 52027.41) {
            exento = 34685;
            exento = (sueldo - exento) * 0.15;
        }
        else if (sueldo >= 52027.416 && sueldo <= 72260.25) {
            exento = 52027.416;
            exento = (sueldo - exento) * 0.20;
            exento += 2601.333;
        }
        else if (sueldo >= 72260.25) {
            exento = 72260.25;
            exento = (sueldo - exento) * 0.25;
            exento += 6648;
        }
    }
    document.getElementById("input_SRenta").value = exento.toFixed(2);
    document.getElementById("input_SueldoEmpleado").value = sueldo;
    document.getElementById("input_Infotep").value = (sueldo * 0.01).toFixed(2);
    document.getElementById("input_Seguro").value = (sueldo * 0.0304).toFixed(2);
    document.getElementById("input_AFP").value = (sueldo * 0.0287).toFixed(2);

    document.getElementById("input_PTotal").value = (sueldo - exento - (sueldo * 0.01) - (sueldo * 0.0304) - (sueldo * 0.0287)).toFixed(2);
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
