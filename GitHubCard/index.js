import axios from "axios";

/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/

// axios
//   .get("https://api.github.com/users/joseph-fantuzzi")
//   .then((resp) => {
//     console.log(resp.data);
//   })
//   .catch((err) => {
//     console.log(err);
//   })
//   .finally(() => {
//     console.log("DONE");
//   });

/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3 (line 34).
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

const cardsDiv = document.querySelector(".cards");
const button = document.querySelector("button");

function renderCards() {
  axios
    .get("https://api.github.com/users/joseph-fantuzzi")
    .then((resp) => {
      const myCard = githubCardMaker(resp.data);
      cardsDiv.appendChild(myCard);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      console.log("DONE");
    });

  const otherUsersArray = ["tetondan", "dustinmyers", "justsml", "luishrd", "bigknell", "crharding", "EmmS21", "MelodyLayne"];

  otherUsersArray.forEach((user) => {
    axios
      .get(`https://api.github.com/users/${user}`)
      .then((resp) => {
        const otherCard = githubCardMaker(resp.data);
        cardsDiv.appendChild(otherCard);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("DONE");
      });
  });

  cardsDiv.innerHTML = "";
}

button.addEventListener("click", renderCards);
button.addEventListener("click", () => {
  cardsDiv.classList.toggle("cards-active");
});

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
        <p>Location: {users location}</p>
        <p>Profile:
          <a href={address to users github page}>{address to users github page}</a>
        </p>
        <p>Followers: {users followers count}</p>
        <p>Following: {users following count}</p>
        <p>Bio: {users bio}</p>
      </div>
    </div>
*/

function githubCardMaker(userObj) {
  const divCard = document.createElement("div");
  const userImg = document.createElement("img");
  const cardInfoDiv = document.createElement("div");
  const userName = document.createElement("h3");
  const userUserName = document.createElement("p");
  const userLocation = document.createElement("p");
  const userProfile = document.createElement("p");
  const userAddress = document.createElement("a");
  const followerCount = document.createElement("p");
  const followingCount = document.createElement("p");
  const userBio = document.createElement("p");

  divCard.appendChild(userImg);
  divCard.appendChild(cardInfoDiv);
  cardInfoDiv.appendChild(userName);
  cardInfoDiv.appendChild(userUserName);
  cardInfoDiv.appendChild(userLocation);
  cardInfoDiv.appendChild(userProfile);
  cardInfoDiv.appendChild(followerCount);
  cardInfoDiv.appendChild(followingCount);
  cardInfoDiv.appendChild(userBio);

  divCard.classList.add("card");
  cardInfoDiv.classList.add("card-info");
  userName.classList.add("name");
  userUserName.classList.add("username");

  userImg.src = userObj.avatar_url;
  userName.textContent = userObj.name;
  userUserName.textContent = userObj.login;
  userLocation.textContent = `Location: ${userObj.location}`;
  userProfile.textContent = "Profile: ";
  userAddress.href = userObj.blog;
  userAddress.textContent = userObj.blog;
  followerCount.textContent = `Followers: ${userObj.followers}`;
  followingCount.textContent = `Following: ${userObj.following}`;
  userBio.textContent = `Bio: ${userObj.bio}`;

  userProfile.appendChild(userAddress);

  return divCard;
}

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
    crharding
*/
