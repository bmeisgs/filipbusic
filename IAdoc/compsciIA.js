//START OF CODE 

// Initialize tooltips
$(document).ready(function() {
    //$(document).tooltip({ selector: '#pwd2', trigger: 'focus', container: 'body', title: 'Testing testing', placement: 'bottom'});
    $('html').tooltip({ selector: '.delete', trigger: 'hover', container: 'body', title: 'Delete', placement: 'bottom'});
    $('body').tooltip({ selector: '.copy', trigger: 'focus', container: 'body', title: 'Copied to clipboard', placement: 'bottom', delay: { "show": 0, "hide": 500 }});
    $('div').tooltip({ selector: '.generate', trigger: 'focus', container: 'body', title: 'Randomly generated new password', placement: 'bottom', delay: { "show": 0, "hide": 500 }});
    $(function () {
        $('[data-toggle="popover"]').popover();
      })
});

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBt71Qd9Y9B56iua99Khs41NQxthxuysXc",
    authDomain: "compsciia-f176a.firebaseapp.com",
    databaseURL: "https://compsciia-f176a.firebaseio.com",
    projectId: "compsciia-f176a",
    storageBucket: "compsciia-f176a.appspot.com",
    messagingSenderId: "567193459229"
};
firebase.initializeApp(config);


//Initialize Firebase Database
/*
firebase.initializeApp({
    apiKey: 'AIzaSyBt71Qd9Y9B56iua99Khs41NQxthxuysXc',
    authDomain: 'compsciia-f176a.firebaseapp.com',
    projectId: 'compsciia-f176a'
});

*/

// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

// Disable deprecated features
db.settings({
    timestampsInSnapshots: true
});


//Sign out if already signed in
signOut();

function hideErrorsOnRegister(){
    $("#error_short").css('display','none');
    $("#error_match").css('display','none');
    $("#error_number").css('display','none');
    $("#error_letter").css('display','none');
    $("#error_terms").css('display','none');
}

function hideErrorsOnChangePass(){
    $("#error_old_pass").css('display','none');
    $("#error_short2").css('display','none');
    $("#error_match2").css('display','none');
    $("#error_number2").css('display','none');
    $("#error_letter2").css('display','none');
}

var newUser = false;
//Create a user
function createUser(){
    hideErrorsOnRegister();
    var email = $("#email2").val();
    var pwd = $('#pwd2').val();
    if (pwd !== $('#cpwd').val()){
        $("#error_match").css("display","block")
        //alert("Passwords don't match!");
        return;
    } else if (pwd.length < 8) {
        $("#error_short").css("display","block")
        //alert("Password is too short!");
        return;
    } else if (pwd.match(/\d/) === null){
        $("#error_number").css("display","block")
        //alert("Password must include a number!");
        return;
    } else if (pwd.match(/\D/) === null) {
        $("#error_letter").css("display","block")
        //alert("Password must include a letter");
        return;			
    } else if ($('#terms').is(':checked') === false) {
        $("#error_terms").css("display","block")
        //alert("You must accept the Terms and Conditions!");
        return;
    }
    console.log($('#terms'));

    

    console.log("trying to create user");
    newUser = true;
    
    firebase.auth().createUserWithEmailAndPassword(email, pwd).catch(function(error) {
    // Handle Errors here.
    
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("error creating user");
    alert(errorMessage);
    newUser = false;
    //ADD SUCCESS MESSAGE
    return;
    // ...
    
    });  
    }

    
var signInOpen = false;

var userPassword = null;

//Sign in an existing user
function signIn(){
    signInOpen = false;
    $("#error_incor").css('display','none');
    var email = $("#email").val();
    userPassword = $("#pwd").val();
    console.log("trying to log in",email, userPassword);
    firebase.auth().signInWithEmailAndPassword(email, userPassword).catch(function(error) {
        // Handle Errors here.
        //alert("Incorrect username or password");
        signInOpen = true;
        $("#error_incor").css('display','block');
        var errorCode = error.code;
        var errorMessage = "This is an error";
        
        // ...
    });			
}


//Sign the user out
function signOut(){
    firebase.auth().signOut().then(function() {
    // Sign-out successful.
    }).catch(function(error) {
    // An error happened.
    });
}


//Make it so the form isn't submitted when the Sign In button is clicked, but signIn() is run instead
$(document).ready(function() {
    $("#button_signin").on("click", function(ev){ 
        console.log("login clicked");
        ev.preventDefault(); 
        signIn(); 
    });

});

//Make it so the form isn't submitted when the Create an Account button is clicked, but createUser() is run instead
$(document).ready(function() {
    $("#button_register").on("click", function(ev){ 
        console.log("register clicked");
        ev.preventDefault(); 
        createUser(); 
    });

});


/*
$(document).ready(function() {
document.getElementById('pwd').onkeydown = function(event) {
    if (event.keyCode == 13) {
        signIn();
    }
}
});
*/





function openSignIn(){
    document.getElementById('signin').style.display='block';
    signInOpen = true;
        
        // detect enter keypress
        $(document).keypress(function(e) {
            var keycode = (e.keyCode ? e.keyCode : e.which);
            if (keycode == '13') {
                if (signInOpen === true){
                    signIn();
                }
            }
        });
}


//Set the background of the main page
$(document).ready(function() {
    $('body').css('background-image', 'url(background1.jpg)');
});

//Ask the user if they want to leave without saving changes
window.addEventListener("beforeunload", function(event) {
    if ($(".save").length > 0){
        event.preventDefault();
    }
});


//Function to generate a random password
function generatePassword(length) {
	var password = '', character; 
	while (length > password.length) {
		if (password.indexOf(character = String.fromCharCode(Math.floor(Math.random() * 94) + 33), Math.floor(password.length / 94) * 94) < 0) {
			password += character;
		}
	}
	return password;
}


function listPasswords(){
    for (i = 0; i < passwords.length; i++){

        var table = document.getElementById('password_list');
        var row = table.insertRow(rowNumber);
        row.id = "row" + rowNumber;
        rowNumber++;
        var cell0 = row.insertCell(0);
        var cell1 = row.insertCell(1);
        var cell2 = row.insertCell(2);
        var cell3 = row.insertCell(3);
        var cell4 = row.insertCell(4);
        var cell5 = row.insertCell(5);
        var cell6 = row.insertCell(6);
        var cell7 = row.insertCell(7);
        var cell8 = row.insertCell(8);
        cell0.innerHTML = "<span class='editable'>"+passwords[i].name+"</span>";
        cell1.innerHTML = "<span class='editable'>"+passwords[i].website+"</span>";
        cell2.innerHTML = "<span>"+passwords[i].dlc+"</span>";
        cell3.innerHTML = "<span class='editable password'>"+passwords[i].password+"</span>";
        cell4.innerHTML = "<button class='btn btn-light eye'><i class='fas fa-eye'></i></button>";
        cell5.innerHTML = "<button class='btn btn-light copy' data-clipboard-text='" + passwords[i].password + "'><i class='far fa-copy'></i></button>";
        cell6.innerHTML = buttonGenerate;
        cell7.innerHTML = buttonEdit;
        cell8.innerHTML = buttonRemove;
    }
}



//This is what the edit and remove buttons should look like
var buttonEdit = "<button class='btn btn-light edit'><i class='far fa-edit'></i></button>";
var buttonRemove = "<button class='btn btn-light delete'><i class='fas fa-trash-alt'></i></button>";
var buttonGenerate = "<button class='btn btn-light generate' disabled><i class='fas fa-random'></i></button>";

//This variable is used to keep track of which row the user is attempting to delete, so that when the user presses the trash icon
//they can be asked to double check whether they wish to delete, and the deletion can then proceed correctly.
var rowBeingDeleted = null;


//Do this when a user signs in
var userId = null;
var userEmail = null;
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        if (newUser === false){
        console.log("user signed in");
        if (user.emailVerified !== true){
            signOut();
            alert("You need to verify your account via email before signing in.")
            return;
        }


        document.getElementById("signin").style.display='none';
        document.getElementById("firstScreen").style.display='none';
        document.getElementById("intro").style.display='none';
        $(".password-list-screen").css("display", "inline");
        $('body').css('background-image', '');

        email = user.email;

        
        var user = firebase.auth().currentUser;
        userId = user.uid;
        console.log(userId);
        
        /*
        db.collection("users").doc(userId).set({
            uid: userId,
            name: name,
            email: email,
            encrypted_data: "a335f0f7d74fd894f80f9108c62143d08f80f7c72be836720be895e5",
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
        */

        var docRef = db.collection("users").doc(userId);

        docRef.get().then(function(doc) {
            if (doc.exists) {
                console.log("Document data:", doc.data());
                var docData = doc.data();
                console.log(docData);
                decrypt(docData.encrypted_data);

                //For all password entries, display those
                listPasswords();
                
                var clipboard = new ClipboardJS('.copy');

                $("#current_date").html(currentDate());

                //Making the rows editable, one at a time
                var rowEditing = false;
                var currentlyEditingElement = null;
                $("body").on("click", ".edit", function(){ 
                    if (rowEditing === true){
                        let lastEditedRow = $(".currentlyEditing").parent();
                        console.log(lastEditedRow);
                        
                    }   
                    console.log("Attemting to make row editable");
                    let editableRow = $(this).parent().parent();
                    let rowId = editableRow.attr("id");
                    let children = editableRow.children();
                    for (let i=0; i<4; i++){
                        if (i !== 2){
                        let currentChild = children[i];
                        let childValue = currentChild.innerText
                        currentChild.innerHTML = "<input class='form-control currentlyEditing' value="+childValue+">";
                            if (i===3){
                                currentChild.innerHTML = "<input type='password' class='form-control password-editing currentlyEditing' value="+childValue+">";
                            }
                        }
                    }
                    currentlyEditingElement = children[7];
                    children[7].innerHTML = "<button class='btn btn-light save'><i class='far fa-save'></i></button><button class='btn btn-light undo'><i class='fas fa-undo'></i></button>";
                    children[6].innerHTML = "<button class='btn btn-light generate'><i class='fas fa-random'></i></button>";

                    $(".edit").attr("disabled", true);
                    $(".copy").attr("disabled", true);
                    rowEditing = true;
                    console.log(editableRow);                                               
                });

                    $("body").on("click", ".save", function(){
                    rowBeingDeleted = currentlyEditingElement;
                    let i = rowBeingDeleted.parentNode.rowIndex;
                    console.log(i);
                    
                    //Change the editable fields (inputs) to non-editable fields
                    let lastEditedRow = $(".currentlyEditing").parent();
                    for (let i=0; i<3; i++){
                        let currentCell = lastEditedRow[i];
                        let cellValue = currentCell.firstChild.value;
                        currentCell.innerHTML = "<span class='editable'>"+cellValue+"</span>";
                        if (i===2){
                            currentCell.innerHTML = "<span class='editable password'>"+cellValue+"</span>";
                        }
                    }

                    //Change the save button to an edit button
                    let children = lastEditedRow.parent().children();
                    children[7].innerHTML = "<button class='btn btn-light edit'><i class='far fa-edit'></i></button>";

                    //Change the date-last-changed
                    passwords[i-1].dlc = currentDate();
                    children[2].innerHTML = "<span>"+currentDate()+"</span>";

                    //Apply all changes to the database
                    console.log(rowBeingDeleted);
                    let tName = children[0].innerText;
                    let tWebsite = children[1].innerText;
                    let tPassword = children[3].innerText;
                    
                    passwords.splice(i-1,1);

                    let entry = new passwordEntry(tName, tWebsite, tPassword);
                    passwords.splice(i-1, 0, entry);

                    encrypt();
                    children[5].innerHTML = "<button class='btn btn-light copy' data-clipboard-text='" + passwords[i-1].password + "'><i class='far fa-copy'></i></button>";

                    $(".edit").attr("disabled", false);
                    $(".copy").attr("disabled", false);
                    $(".generate").attr("disabled", true);
                    $(".generate-special").attr("disabled", false);
            });

                //Undo any changes to the row by reloading the passwords
                $("body").on("click", ".undo", function(){
                    let tableBody = $("#password_list");
                    let rows = tableBody.children();
                    for (i=0; i<rows.length-1; i++){
                        rows[i].remove();
                        rowNumber--;
                    }
                    listPasswords();
                })
                $("body").on("click", ".add", function(){
                    addEntry(document.getElementById('name01').value, document.getElementById('website01').value, document.getElementById('password01').value);
                    console.log($(".bottom-row"));
                    $(".bottom-row").prop("value", "");
                    console.log("pass");
                })


                //Make passwords visible when hovering over eye icon
                $("body").on("mouseenter", ".eye", function(){
                    $(this).parent().prev().children().addClass("temp-visible");
                    $(this).parent().prev().children().removeClass("password");
                    $(this).parent().prev().children(".password-editing").prop("type", "text");
                })
                $("body").on("mouseleave", ".eye", function(){
                    $(".temp-visible").addClass("password");
                    $(".temp-visible").removeClass("temp-visible");
                    $(".password-editing").prop("type", "password");
                })

                //Open are you sure screen when deleting passwords
                $("body").on("click", ".delete", function(){
                    rowBeingDeleted = $(this).get(0);
                    console.log(rowBeingDeleted);
                    console.log($(this));
                    $("#delete_password").css("display", "block");
                })
                     
                //Randomly generate a new password
                $("body").on("click", ".generate", function(){
                    var randomPass = generatePassword(16);
                    $(this).parent().prev().prev().prev().children().attr("value", randomPass);
                    this.blur();
                })

                //Sign out button
                $("body").on("click", ".sign-out", function(){
                    signOut();
                    location.reload();
                })

                //Change password
                $("body").on("click", ".change-pass", function(){
                    $("#change_password").css("display", "block");
                })
                $("body").on("click", "#button_change_password", function(){
                    hideErrorsOnChangePass();
                    var pwd = $('#new_pass').val();
                    if ($('#old_pass').val() != userPassword){
                        console.log($('#old_pass').val());
                        console.log(userPassword);
                        $("#error_old_pass").css("display","block")
                        //alert("Old password is incorrect!");
                        return
                    } else if (pwd.length < 8) {
                        $("#error_short2").css("display","block")
                        //alert("Password is too short!");
                        return;
                    } else if (pwd.match(/\d/) === null){
                        $("#error_number2").css("display","block")
                        //alert("Password must include a number!");
                        return;
                    } else if (pwd.match(/\D/) === null) {
                        $("#error_letter2").css("display","block")
                        //alert("Password must include a letter");
                        return;			
                    } else if (pwd !== $('#c_new_pass').val()){
                        $("#error_match2").css("display","block")
                        //alert("New passwords don't match!");
                        return;
                    }
                    console.log(user);
                    console.log(pwd);
                    user.updatePassword(pwd).then(function() {
                        // Update successful.
                    }).catch(function(error) {
                        // An error happened.
                    });
                    encrypt();
                      
                })
                
                
                

            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
        });
        
        

    } else {
        console.log("User successfully created");

        user.sendEmailVerification().then(function() {
        // Email sent.
        }).catch(function(error) {
        // An error happened.
        });

        userId = user.uid;
        console.log(userId);
        var email = user.email;
        console.log(email);
        db.collection("users").doc(userId).set({
            uid: userId,
            email: email,
            encrypted_data: "",
            
        })
        .then(function() {
            console.log("Document successfully written!");
            signOut();
            closeRegister();
            newUser = false;
            alert('Thank you for creating an OnlyPass account. Please verify your account by clicking on the link sent to you via email before signing in.');
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });

         
    }
    } else {
    // No user is signed in.
        
    }
});


function closeSignIn(){
    var modal = document.getElementById('signin');
    modal.style.display = "none";
    signInOpen = false;
    $("#error_incor").css('display','none');
}

function closeRegister(){
    var modal = document.getElementById('register');
    modal.style.display = "none";
    hideErrorsOnRegister();
}

function closeAreSure(id){
    var modal = document.getElementById(id)
    modal.style.display = "none";
}


$(document).ready(function() {
    // Get the REGISTER modal
    var modalRegister = document.getElementById('register');
    // Get the SIGN IN modal
    var modalSignIn = document.getElementById('signin');
    //Get the ARE YOU SURE DELETE PASSWORD modal
    var modalDeletePass = document.getElementById('delete_password')
    //Get the CHANGE PASSWORD modal
    var modalChangePass = document.getElementById('change_password');

    // When the user clicks anywhere outside of the open modals, close them
    window.onclick = function(event) {
        if (event.target == modalRegister) {
            //modalRegister.style.display = "none";
            closeRegister();
        } else if (event.target == modalSignIn) {
            //modalSignIn.style.display = "none";
            closeSignIn();
        } else if (event.target == modalDeletePass) {
            closeAreSure('delete_password');
        } else if (event.target == modalChangePass) {
            closeAreSure('change_password')
        }
    }
});


//PASSWORD LIST PART
var passwords = [];

//A variable that counts the number of rows (needed to know which position to add new rows to)
var rowNumber = 0;

//Gets the date in yyyy-mm-dd format, and puts it into any new password entries
function currentDate(){
    var date = new Date();
    var currentMonth = date.getMonth() + 1;
    var currentDate = date.getFullYear() + "-" + currentMonth + "-" + date.getDate();
    return currentDate;
}

class passwordEntry {
    constructor(name, website, password) {
        this.name = name;
        this.website = website;
        this.password = password;
        this.dlc = currentDate();
    }
}

function addEntry(name, website, password){
        
    //backend --> adds the new entry to the array that is encrypted and stored
    var entry = new passwordEntry(name, website, password);
    passwords.push(entry);
    console.log(passwords);
    encrypt();

    //frontend --> adds the new entry to the display
    var table = document.getElementById('password_list');
    var row = table.insertRow(rowNumber);
    rowNumber++;
    var cell0 = row.insertCell(0);
    var cell1 = row.insertCell(1);
    var cell2 = row.insertCell(2);
    var cell3 = row.insertCell(3);
    var cell4 = row.insertCell(4);
    var cell5 = row.insertCell(5);
    var cell6 = row.insertCell(6);
    var cell7 = row.insertCell(7);
    var cell8 = row.insertCell(8);
    cell0.innerHTML = "<span class='editable'>"+name+"</span>";
    cell1.innerHTML = "<span class='editable'>"+website+"</span>";
    cell2.innerHTML = currentDate();
    cell3.innerHTML = "<span class='editable password'>"+password+"</span>";
    cell4.innerHTML = "<button class='btn btn-light eye'><i class='fas fa-eye'></i></button>";
    cell5.innerHTML = "<button class='btn btn-light copy' data-clipboard-text='" + password + "'><i class='far fa-copy'></i></button>";
    cell6.innerHTML = buttonGenerate;
    cell7.innerHTML = buttonEdit;
    cell8.innerHTML = buttonRemove;
}

function deleteEntry(r){
    var i = r.parentNode.parentNode.rowIndex;
    passwords.splice(i-1,1);
    document.getElementById('password_table').deleteRow(i);
    rowNumber--;
    encrypt();

}


function editEntry(row){
    var table = document.getElementById('password_list');
    var row = table
}

var stringPasswords = "";
    
    function stringifyPasswords(){
        stringPasswords = JSON.stringify(passwords);
        console.log(stringPasswords);
    }
    
    function parsePasswords(stringPass){
        passwords = JSON.parse(stringPass);
        console.log(passwords);
    }




//New scrypt attempt: https://github.com/tonyg/js-scrypt
function getKey(password){
    let returnVal = null;
    scrypt_module_factory(function (scrypt) {
    
        console.log(password);
        var keyBytes = scrypt.crypto_scrypt(scrypt.encode_utf8(password), scrypt.encode_utf8(userEmail), 16384, 8, 1, 16)
        console.log(keyBytes);
        returnVal = keyBytes;
    });
    return returnVal;
}



//encrypts the plaintext
function encrypt() {

    //convert password objects in the array to a string
    stringifyPasswords();

    

    // An example 128-bit key (16 bytes * 8 bits/byte = 128 bits)
    var key = getKey(userPassword);
    console.log(key);

    // Convert text to bytes
    var text = stringPasswords;
    var textBytes = aesjs.utils.utf8.toBytes(text);

    // The counter is optional, and if omitted will begin at 1
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var encryptedBytes = aesCtr.encrypt(textBytes);

    // To print or store the binary data, you may convert it to hex
    var encryptedHex = aesjs.utils.hex.fromBytes(encryptedBytes);
    console.log(encryptedHex);
    // "a338eda3874ed884b6199150d36f49988c90f5c47fe7792b0cf8c7f77eeffd87
    //  ea145b73e82aefcf2076f881c88879e4e25b1d7b24ba2788"
    //document.getElementById('a').innerHTML=encryptedHex;
    
    var docRef = db.collection("users").doc(userId);
    var setWithMerge = docRef.set({
        encrypted_data: encryptedHex
    }, { merge: true });



    docRef.get().then(function(doc) {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            var docData = doc.data();
            console.log(docData);
            decrypt(docData.encrypted_data);


        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });

}

//decrypts into plaintext
function decrypt(input){
    var key = getKey("testpassword4");
    console.log(key);
    var encryptedBytes = aesjs.utils.hex.toBytes(input);
    
    // The counter mode of operation maintains internal state, so to
    // decrypt a new instance must be instantiated.
    var aesCtr = new aesjs.ModeOfOperation.ctr(key, new aesjs.Counter(5));
    var decryptedBytes = aesCtr.decrypt(encryptedBytes);

    // Convert our bytes back into text
    var decryptedText = aesjs.utils.utf8.fromBytes(decryptedBytes);
    console.log(decryptedText);
    // "Text may be any length you wish, no padding is required."
    //document.getElementById('decrypted_text').innerHTML=decryptedText;

    //convert string to an array with password objects
    parsePasswords(decryptedText);
}


