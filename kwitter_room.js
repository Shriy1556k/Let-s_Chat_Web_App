
const firebaseConfig = {
      apiKey: "AIzaSyCoBN3_wLbM08ZmU4DCT9tUpPak1gcTO9c",
      authDomain: "kwitter-acba8.firebaseapp.com",
      databaseURL: "https://kwitter-acba8-default-rtdb.firebaseio.com",
      projectId: "kwitter-acba8",
      storageBucket: "kwitter-acba8.appspot.com",
      messagingSenderId: "672380895174",
      appId: "1:672380895174:web:a909b7395a60965c0e3cc7"
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