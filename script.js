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
    this.startDay;
    this.endDay;
    this.firstClick = true;
    this.currentCellDate;
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

  dateClick = cell => {
    let cells = document.getElementsByTagName("td");
    let showdate = document.getElementById("showdate");
    if (this.firstClick) {
      this.startDay = parseInt(cell.textContent);
      delete this.endDay;

      // showdate.innerHTML = this.startDay;

      //   if (item.textContent < this.startDay) {
      //     item.classList.add("unactive-date");
      //   }
      // }
      // cell.classList.add("bg-start-date");
    } else {
      this.endDay = parseInt(cell.textContent);

      // showdate.innerHTML = this.startDay + " - " + this.endDay;
      // cell.classList.add("bg-end-date");
      // for (let item of cells) {
      //   item.classList.remove("unactive-date");
      //   if (
      //     item.textContent > this.startDay &&
      //     item.textContent < this.endDay
      //   ) {
      //     item.classList.add("bg-between-date");
      //   } else if (
      //     item.textContent == this.startDay &&
      //     item.textContent == this.endDay
      //   ) {
      //     item.classList.remove("bg-start-date");
      //     item.classList.remove("bg-end-date");
      //     item.classList.add("bg-choosen-date");
      //     // showdate.innerHTML = this.endDay;
      //   }
      // }
    }

    this.firstClick = !this.firstClick;
    this.render();
  };

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
          let cellMonth = this.tmpCurrentMonth;
          let cellText = document.createTextNode(date);
          cell.appendChild(cellText);
          row.appendChild(cell);
          this.currentCellDate = parseInt(cell.textContent);

          cell.onclick = () => this.dateClick(cell);

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

    let cells = document.getElementsByTagName("td");
    for (let item of cells) {
      this.currentCellDate = parseInt(item.textContent);
      if (this.currentCellDate < this.startDay) {
        item.classList.add("bg-unactive-date");
      } else if (this.currentCellDate === this.startDay) {
        if (
          this.currentCellDate === this.endDay &&
          this.currentCellDate === this.startDay
        ) {
          item.classList.remove("bg-start-date");
          item.classList.remove("bg-end-date");
          item.classList.add("bg-choosen-date");
          for (let item of cells) {
            item.classList.remove("bg-unactive-date");
          }
        } else {
          item.classList.add("bg-start-date");
        }
        for (let item of cells) {
          item.classList.remove("bg-end-date");
          item.classList.remove("bg-between-date");
        }
      } else if (this.currentCellDate === this.endDay) {
        item.classList.add("bg-end-date");
        for (let item of cells) {
          item.classList.remove("bg-unactive-date");
        }
      } else if (
        this.currentCellDate > this.startDay &&
        this.currentCellDate < this.endDay
      ) {
        item.classList.add("bg-between-date");
      }
    }

    // } else if (date > this.startDay && date < this.endDay) {
    //   cell.classList.add("bg-between-date");
    // }
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
