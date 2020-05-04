mdc.ripple.MDCRipple.attachTo(document.querySelector('.foo-button'));

    mdc.topAppBar.MDCTopAppBar.attachTo(document.querySelector('header.mdc-top-app-bar'));

    const drawer = mdc.drawer.MDCDrawer.attachTo(document.querySelector('.mdc-drawer'));


    document.querySelector(".mdc-top-app-bar__navigation-icon").addEventListener("click", 
          (e) => {drawer.open = true;}
      );
      
      let ds = null;
      let title_val = null;
        
      document.querySelectorAll('aside.mdc-drawer a.mdc-list-item').forEach(item => {
          item.addEventListener('click', event => {
              /*document.querySelectorAll('div.view').forEach(item1 => {
                  item1.style.display = "none";
              })
              let target = item.getAttribute("href");
              document.querySelector(target).style.display = "block";*/
              drawer.open = false;
          })
      }) 
        
      
        
      //Add event listener to SEARCH button
      document.querySelector("#search-button").addEventListener("click", 
          (e) => { 
              document.querySelector("#search").style.display = "block";
              document.querySelector("#table").style.display = "none";
              document.querySelector("#weather").style.display = "none";
              let exist = document.querySelector("#chart");
              if (exist) {
                  exist.remove();
              }
      });
      //Add event listener to TABLE button
      document.querySelector("#table-button").addEventListener("click", 
          (e) => { 
              document.querySelector("#search").style.display = "none";
              document.querySelector("#table").style.display = "block";
              document.querySelector("#weather").style.display = "none";
              let exist = document.querySelector("#chart");
              if (exist) {
                  exist.remove();
              }
      });
      //Add event listener to CHART button
      document.querySelector("#chart-button").addEventListener("click", 
          (e) => { 
              document.querySelector("#search").style.display = "none";
              document.querySelector("#table").style.display = "none";
              document.querySelector("#weather").style.display = "none";
              //document.querySelector("#chart").style.display = "block";
              let div = document.createElement("div");
              div.setAttribute("id", "chart");
              div.setAttribute("style", "height: 500px;");
              document.querySelector("main").append(div);
              if (ds != null) {
                  drawChart(ds, title_val);
              }
      });
      //Add event listener to WEATHER button
      document.querySelector("#weather-button").addEventListener("click", 
          (e) => {
          document.querySelector("#search").style.display = "none";
          document.querySelector("#table").style.display = "none";
          document.querySelector("#weather").style.display = "block";
          let exist = document.querySelector("#chart");
          if (exist) {
              exist.remove();
          }
          let h3 = document.querySelector(".weather-goes-here");
          let getLocation = () => {
              if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(showPosition);
              }
              else {
                  h3.textContent = "Geolocation is not supported by this browser.";
              }
          }
          let showPosition = (position) => {
              lat = position.coords.latitude;
              long = position.coords.longitude;
              let myKey = "4d4a6cee9cd6a8bab1e59e35af936c5a";
              let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&units=imperial&appid=" + myKey;
              fetch(apiEndpoint)
              .then(response => response.json())
              .then(json => {
                  h3.textContent = "Weather in " + json['name'];
                  let weatherSection = document.querySelector("#weather");
                  let divExist = weatherSection.querySelector("div");
                  if (divExist) {
                      divExist.remove();
                  }
                  let div = document.createElement("div");
                  weatherSection.append(div);
                  let p = document.createElement("p");
                  p.textContent = json['weather'][0]['main'];
                  div.append(p);
                  let p1 = document.createElement("p");
                  p1.textContent = "Temperature: " + json['main']['temp'];
                  div.append(p1);
                  let p2 = document.createElement("p");
                  p2.textContent = "Feels Like: " + json['main']['feels_like'];
                  div.append(p2);
              });
          }
          getLocation();
          
      });
      
      var data;
      fetch("https://covidtracking.com/api/v1/states/daily.json")
      .then(response => response.json())
      .then(json => {
          data = json;
          let dList = document.querySelector("#states");
          let array = []
          for(let obj in json) {
              let exist = false;
              for(let i in array) {
                  if(json[obj]['state'] == array[i]) {
                      exist = true;
                      break;
                  }
              }
              if(exist == false) {
                  array.push(json[obj]['state']);
                  let option = document.createElement('option');
                  option.value = json[obj]['state'];
                  option.text = json[obj]['state'];
                  dList.append(option);
              }
          } 
      });
      
      
      let array = []
      //Add event listener to button
      document.querySelector(".add-state").addEventListener("click", 
          (e) => {
              let div = document.querySelector(".states-added");
              let s = document.querySelector("#states")
              let val = s.options[s.selectedIndex].value
              let allow = true;
              for(let i in array) {
                  if (array[i] == val) {
                      allow = false;
                      break;
                  }
              }
              if (allow == true) {
                  array.push(val);
                  let p = document.createElement("p");
                  p.textContent = val;
                  div.append(p);
              }
          }
      );
      
      //Add event listener to button
      document.querySelector(".create-data").addEventListener("click", 
          (e) => {
              let array_of_arrays = []
              let dataset = []
              let temparray = []
              let d = document.querySelector("#data-type");
              let valD = d.options[d.selectedIndex].value;
              if (valD == 'positive') {
                  title_val = 'Confirmed Cases of COVID-19 In Each State';
              }
              else if (valD == 'positiveIncrease') {
                  title_val = 'Daily New Confirmed Cases of COVID-19 In Each State';
              }
              else if (valD == 'death') {
                  title_val = 'Total COVID-19 Deaths In Each State';
              }
              else if (valD == 'deathIncrease') {
                  title_val = 'Daily New Confirmed Cases of COVID-19 In Each State';
              }
              else if (valD == 'hospitalizedCurrently') {
                  title_val = 'Current Hospitalizations Due To COVID-19 In Each State';
              }
              else if (valD == 'hospitalizedIncrease') {
                  title_val = 'Daily New Hospitalizations Due To COVID-19 In Each State';
              }
              else {
                  title_val = 'Total Recovered Cases of COVID-19 In Each State';
              }              
              let existing = document.querySelector("table");
              if (existing) {
                  existing.remove();
              }
              existing = document.querySelector("p.title");
              if (existing) {
                  existing.remove();
              }
              let p = document.createElement("p");
              p.setAttribute("class", "title");
              p.textContent = title_val;
              document.querySelector("#table").append(p);
              let table = document.createElement("table");
              table.setAttribute("class", "mdc-data-table__table");
              table.setAttribute("aria-label", title_val);
              document.querySelector("#table").append(table);
              let thead = document.createElement("thead");
              table.append(thead);
              let tr = document.createElement("tr");
              tr.setAttribute("class", "mdc-data-table__header-row");
              thead.append(tr);
              let date = document.createElement("th");
              date.setAttribute("class", "mdc-data-table__header-cell");
              date.setAttribute("role", "columnheader");
              date.setAttribute("scope", "col");
              date.textContent = "Date";
              temparray.push("Date");
              tr.append(date);
              for(let i in array) {
                  let th = document.createElement("th");
                  th.setAttribute("class", "mdc-data-table__header-cell mdc-data-table__header-cell--numeric");
                  th.setAttribute("role", "columnheader");
                  th.setAttribute("scope", "col");
                  th.textContent = array[i];
                  temparray.push(array[i]);
                  tr.append(th);   
              }
              dataset.push(temparray);
              let curr_date = 33333333;
              let tbody = document.createElement("tbody");
              tbody.setAttribute("class", "mdc-data-table__content");
              table.append(tbody);
              let currtrRow = document.createElement("tr");
              currtrRow.setAttribute("class", "mdc-data-table__row");
              let currtemparray = [];
              for(let obj in data) {
                  if(data[obj]['date'] < curr_date) {
                      if (currtemparray.length > array.length) {
                          dataset.push(currtemparray);
                      }
                      curr_date = data[obj]['date'];
                      let trRow = document.createElement("tr");
                      trRow.setAttribute("class", "mdc-data-table__row");
                      tbody.append(trRow); 
                      currtrRow = trRow;
                      let temparray = []
                      let date = document.createElement("td");
                      date.setAttribute("class", "mdc-data-table__cell");
                      let day = parseInt(data[obj]['date']) - 20200000;
                      day = day % 100;
                      let month = (parseInt(data[obj]['date']) - 20200000 - day) / 100;
                      let newDate = month.toString() + '-' + day.toString() + '-2020';
                      date.textContent = newDate;
                      currtrRow.append(date);
                      temparray.push(newDate);
                      currtemparray = temparray;
                  }
                  for(let i in array) {
                      if(array[i] == data[obj]['state']) {
                          let value = document.createElement("td");
                          value.setAttribute("class", "mdc-data-table__cell mdc-data-table__cell--numeric");
                          value.textContent = data[obj][valD];
                          currtrRow.append(value);
                          currtemparray.push(data[obj][valD]);
                      }
                  }
              }
                  
              document.querySelector("#search").style.display = "none";
              document.querySelector("#table").style.display = "block";
              ds = dataset;
              //Reverse dataset so oldest entry is first, newest entry is last
              let len = ds.length;
              for (let i in ds) {
                  i++;                  
                  if(i == ((len/2) - ((len/2)%1))) {
                      break;
                  }
                  let temp = ds[i];
                  ds[i] = ds[len-i];
                  ds[len-i] = temp;
              }
          
              var db = new Dexie("Searches");
              db.version(1).stores({
	          data: 'dataset,array,selection,title'
              //enemies: '++id,name'
              });
              db.data.add({dataset: ds, array: array, selection: valD, title: title_val});
          });
      
      //Default open to first screen
      document.querySelector("#search").style.display = "block";    
      
      if ("serviceWorker" in navigator) {
          window.addEventListener("load", function() {
          navigator.serviceWorker
          .register("/serviceWorker.js")
          .then(res => console.log("service worker registered"))
          .catch(err => console.log("service worker not registered", err))
          })
      }