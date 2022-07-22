const firebaseConfig = {
  apiKey: "AIzaSyAFYXn8y457Z_XBtbPHdU-BNX2-ugdJYJg",
  authDomain: "kwiiter-6b658.firebaseapp.com",
  databaseURL: "https://kwiiter-6b658-default-rtdb.firebaseio.com",
  projectId: "kwiiter-6b658",
  storageBucket: "kwiiter-6b658.appspot.com",
  messagingSenderId: "145388227439",
  appId: "1:145388227439:web:084afc2fa12b023e34b69a"
};

firebase.initializeApp(firebaseConfig);

user_name = localStorage.getItem("user_name");

document.getElementById("user_name").innerHTML = "Welcome " + user_name + "!";

function addroom() 
{
room_name = document.getElementById("room_name").value ;
firebase.database().ref("/").child(room_name).update({
purpose:"add room name"
});
localStorage.setItem("room_name",room_name);
window.location = "kwitter_page.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Room_names = childKey;
            console.log("room name -" + Room_names);
            row = "<div class='room_name' id =" +Room_names+" onclick ='redirectToRoomName(this.id)'>#" + Room_names +"</div><hr>";
            document.getElementById("output").innerHTML += row;

            });
      });
}

getData();

function redirectToRoomName(name)
{
      console.log(name);
      localStorage.setItem("room_name",name);
      window.location = "kwitter_page.html";
}

function logout()
{
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}
