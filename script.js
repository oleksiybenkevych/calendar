class Calendar {
  constructor() {
    this.months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    this.weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    this.today = new Date();
    this.tmpCurrentYear = parseInt(document.getElementById("year").value);
    this.tmpCurrentMonth = parseInt(document.getElementById("month").value);
    this.tmpFirstDay;
    this.tmpWeek;
    this.init();
  }

  init() {
    this.currentYear = this.tmpCurrentYear;
    this.currentMonth = this.tmpCurrentMonth;
    this.currentType = parseInt(document.getElementById("type").value);
    this.firstDay = new Date(this.currentYear, this.currentMonth).getDay();
    this.daysInMonth =
      32 - new Date(this.currentYear, this.currentMonth, 32).getDate();
  }
  setMonth(month) {
    this.tmpCurrentMonth = month;
    this.render();
  }
  setYear(year) {
    this.tmpCurrentYear = year;
    this.render();
  }
  setType(type) {
    this.currentType = type;
    this.render();
  }
  next() {
    this.tmpCurrentYear =
      this.currentMonth === 11 ? this.currentYear + 1 : this.currentYear;
    this.tmpCurrentMonth = (this.currentMonth + 1) % 12;

    document.getElementById("year").value = this.tmpCurrentYear;
    document.getElementById("month").value = this.tmpCurrentMonth;
    this.render();
  }
  previous() {
    this.tmpCurrentYear =
      this.currentMonth === 0 ? this.currentYear - 1 : this.currentYear;
    this.tmpCurrentMonth = this.currentMonth === 0 ? 11 : this.currentMonth - 1;

    document.getElementById("year").value = this.tmpCurrentYear;
    document.getElementById("month").value = this.tmpCurrentMonth;
    this.render();
  }
  renderHeader() {
    const week = document.getElementById("calendar-head");
    week.innerHTML = "";
    const row = document.createElement("tr");

    if (this.currentType === 1) {
      this.tmpFirstDay = this.firstDay - 1;
      this.weekDays.splice(7, 0, "Sun");
      this.tmpWeek = this.weekDays.slice(1);
    } else {
      this.tmpFirstDay = this.firstDay;
      this.tmpWeek = this.weekDays;
    }

    for (let i = 0; i < 7; i++) {
      let cell = document.createElement("td");
      let cellText = document.createTextNode(this.tmpWeek[i]);
      cell.appendChild(cellText);
      row.appendChild(cell);
      if (this.currentType === 1) {
        if (i === 5 || i === 6) {
          cell.classList.add("bg-info");
        }
      } else if (this.currentType === 0) {
        if (i === 0 || i === 6) {
          cell.classList.add("bg-info");
        }
      }
    }
    week.appendChild(row);
  }

  renderBody() {
    let tbl = document.getElementById("calendar-body");
    tbl.innerHTML = "";
    let date = 1;
    // creating all cells
    for (let i = 0; i < 6; i++) {
      // creates a table row
      let row = document.createElement("tr");
      //creating individual cells, filing them up with data.
      for (let j = 0; j < 7; j++) {
        if (i === 0 && j < this.tmpFirstDay) {
          let cell = document.createElement("td");
          let cellText = document.createTextNode("");
          cell.appendChild(cellText);
          row.appendChild(cell);
        } else if (date > this.daysInMonth) {
          break;
        } else {
          let cell = document.createElement("td");
          let cellText = document.createTextNode(date);
          cell.appendChild(cellText);
          row.appendChild(cell);

          cell.onclick = function() {
            // onclick add\remove class
            let cells = document.getElementsByTagName("td");
            for (let item of cells) {
              item.classList.remove("bg-choosen-date");
            }
            cell.classList.add("bg-choosen-date");
            let showdate = document.getElementById("showdate");
            showdate.innerHTML = cellText.textContent;
          };

          //bg-red for holidays
          if (this.currentType === 1) {
            if (j === 5 || j === 6) {
              cell.classList.add("bg-info");
            }
          } else if (this.currentType === 0) {
            if (j === 0 || j === 6) {
              cell.classList.add("bg-info");
            }
          }

          date++;
        }
      }
      tbl.appendChild(row); // appending each row into calendar body.
    }
  }

  render() {
    this.init();
    this.renderHeader();
    this.renderBody();
  }
}

const calendar = new Calendar();
calendar.render();

function onMonthChange(value) {
  calendar.setMonth(value);
}

function onYearChange(value) {
  calendar.setYear(value);
}

function onTypeChange(value) {
  calendar.setType(value);
}

function prevMonth() {
  calendar.previous();
}

function nextMonth() {
  calendar.next();
}
