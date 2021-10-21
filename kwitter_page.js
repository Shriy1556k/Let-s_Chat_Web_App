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

username = localStorage.getItem("user_name");
room_name = localStorage.getItem("room_name");

function send() {
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name: username,
            message: msg,
            like: 0
      });
      document.getElementById("msg").value = "";
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data);
                        var name = message_data['name'];
                        message = message_data['message'];
                        like = message_data['like'];
                        name_with_tag = "<h4>" + name + "<img class='user_tick' src='tick.png'> </h4>";
                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_with_tag ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updatelike(this.id)'>";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>like:"+like +"</span></button><hr>";

                        row = name_with_tag + message_with_tag + like_with_tag + span_with_tag;
                        document.getElementById("output").innerHTML += row; 
                        //End code
                  }
            });
      });
}
getData();

function updatelike(message_id)
{
      console.log("clicked on the like button - "+message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      updated_likes = Number(likes) + 1;
      console.log(updated_likes);

      firebase.database().ref(room_name).child(message_id).update({
            like : updated_likes
      });
}

function logout()
{
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}