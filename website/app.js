// Personal API Key for OpenWeatherMap API
const APIKey = "";
const temperatureElement = document.getElementById("temp");
const dateElement = document.getElementById("date");
const contentElement = document.getElementById("content");

// Event listener to add function to existing HTML DOM element
const submitButton = document.getElementById("generate");
submitButton.addEventListener("click", function () {
  let zip = document.getElementById("zip").value;
  let feelings = document.getElementById("feelings").value;
  submitAction(zip, feelings);
});

/* Function called by event listener */

async function submitAction(zip, feelings) {
  let weatherData = await getWeatherData(APIKey, zip);
  let today = new Date().toISOString().slice(0, 10);

  let dataToPost = {
    temperature: weatherData,
    feelings: feelings,
    date: today,
  };

  postResponse = await postData("/add", dataToPost);
  newData = await getData("/all");
  newUI(newData);
}

/* Function to GET Web API Data*/

const getWeatherData = async (key, zipCode) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=${key}`
  )
    .then((response) => response.json())
    .then((data) => data["main"]["temp"])
    .catch((error) => console.log(error));
};

/* Function to POST data */
const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const postResponse = await response.json();
    return postResponse;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to GET Project Data */

const getData = async (url = "") => {
  const request = await fetch(url);
  try {
    const allData = await request.json();
    return allData;
  } catch (error) {
    console.log("error", error);
  }
};

const newUI = async function updateUI(newData) {
  temperatureElement.textContent = "Temperature: " + newData.temperature;
  contentElement.textContent = "Feeling: " + newData.feelings;
  dateElement.textContent = "Date: " + newData.date;
};
