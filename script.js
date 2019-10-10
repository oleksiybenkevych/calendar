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
    this.selectYear = document.getElementById("year");
    this.selectMonth = document.getElementById("month");
    this.selectType = document.getElementById("type");
    this.init();
    this.tmpFirstDay;
    this.tmpWeek;
  }
  init() {
    this.currentYear = parseInt(this.selectYear.value);
    this.currentMonth = parseInt(this.selectMonth.value);
    this.currentType = parseInt(this.selectType.value);
    this.firstDay = new Date(this.currentYear, this.currentMonth).getDay();
    this.daysInMonth =
      32 - new Date(this.currentYear, this.currentMonth, 32).getDate();
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
      //   this.weekDays.splice(7, 0, "Sun");
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
    monthAndYear.innerHTML =
      this.months[this.currentMonth] + " " + this.currentYear;

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
          if (
            date === this.today.getDate() &&
            year === this.today.getFullYear() &&
            month === this.today.getMonth()
          ) {
            cell.classList.add("bg-info");
          }
          if (this.currentType === 1) {
            if (j === 5 || j === 6) {
              cell.classList.add("bg-info");
            }
          } else if (this.currentType === 0) {
            if (j === 0 || j === 6) {
              cell.classList.add("bg-info");
            }
          } // color  date
          cell.appendChild(cellText);
          row.appendChild(cell);
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

function add() {
  calendar.render();
}
