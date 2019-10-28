class Calendar {
  tmpFirstDay;
  currentCellDate;
  tmpWeek;
  constructor() {
    this.months = MONTH;
    this.weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    this.showdate = document.getElementById("showdate");
    this.showrange = document.getElementById("showrange");
    this.father = document.getElementById("input-calendar");
    this.tmpCurrentYear = parseInt(document.getElementById("year").value);
    this.tmpCurrentMonth = parseInt(document.getElementById("month").value);
    this.today = new Date();
    this.startDay = new Date(0, 0, 0);
    this.endDay = new Date(0, 0, 0);
    this.blockedDays = [
      new Date(2019, 9, 15),
      new Date(2019, 9, 16),
      new Date(2019, 9, 7),
      new Date(2019, 9, 19)
    ];
    this.firstClick = true;

    this.rangeCalendar = false; //true range calendar / false input calendar
    this.init();
    this.showCalendar();
  }

  showCalendar = () => {
    if (this.rangeCalendar === true) {
      document.getElementById("input-container").style.display = "none";
      document.getElementById("calendar-container").style.display = "block";
    } else {
      document.getElementById("input-container").style.display = "block";
      document.getElementById("calendar-container").style.display = "none";
    }
  };

  init() {
    this.currentYear = this.tmpCurrentYear;
    this.currentMonth = this.tmpCurrentMonth;
    this.currentType = parseInt(document.getElementById("type").value);
    this.firstDay = new Date(this.currentYear, this.currentMonth).getDay();
    this.daysInMonth =
      fullMonthDays -
      new Date(this.currentYear, this.currentMonth, fullMonthDays).getDate();
  }
  setMonth(month) {
    this.tmpCurrentMonth = parseInt(month);
    this.render();
  }
  setYear(year) {
    this.tmpCurrentYear = parseInt(year);
    this.render();
  }
  setType(type) {
    this.currentType = type;
    this.render();
  }
  next() {
    this.tmpCurrentYear =
      this.currentMonth === lastMonth ? this.currentYear + 1 : this.currentYear;
    this.tmpCurrentMonth =
      this.currentMonth === lastMonth ? firstMonth : this.currentMonth + 1;
    document.getElementById("year").value = this.tmpCurrentYear;
    document.getElementById("month").value = this.tmpCurrentMonth;
    this.render();
  }
  previous() {
    this.tmpCurrentYear =
      this.currentMonth === firstMonth
        ? this.currentYear - 1
        : this.currentYear;
    this.tmpCurrentMonth =
      this.currentMonth === firstMonth ? lastMonth : this.currentMonth - 1;

    document.getElementById("year").value = this.tmpCurrentYear;
    document.getElementById("month").value = this.tmpCurrentMonth;
    this.render();
  }
  rangeContainBlockedDays() {
    let dateArr = this.getDateArray(this.startDay, this.endDay);
    const blockedTimes = this.blockedDays.map(item => item.getTime());
    for (let i = 0; i < dateArr.length; i++) {
      if (blockedTimes.includes(dateArr[i].getTime())) {
        alert("U cant pick this range");
        this.endDay = dateArr[i - 1];
        break;
      }
    }
  }

  getDateArray(start, end) {
    let arr = new Array(),
      dt = new Date(start);

    while (dt <= end) {
      arr.push(new Date(dt));
      dt.setDate(dt.getDate() + 1);
    }

    return arr;
  }

  renderHeader() {
    const week = document.getElementById("calendar-head");
    week.innerHTML = "";
    const row = document.createElement("tr");

    if (this.currentType === DAY_TYPE.MON) {
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
      if (this.currentType === DAY_TYPE.MON) {
        if (i === 5 || i === 6) {
          cell.classList.add("bg-info");
        }
      } else if (this.currentType === DAY_TYPE.SUN) {
        if (i === 0 || i === 6) {
          cell.classList.add("bg-info");
        }
      }
    }
    week.appendChild(row);
  }

  rangeDays() {
    let cells = document.getElementsByTagName("td");
    if (this.rangeCalendar === false) {
      for (let item of cells) {
        this.currentCellDate = new Date(
          `${this.tmpCurrentMonth + 1} ${parseInt(item.textContent)} ${
            this.tmpCurrentYear
          }`
        );
        for (let i = 0; i < this.blockedDays.length; i++) {
          if (
            this.currentCellDate.getDate() === this.blockedDays[i].getDate() &&
            this.currentCellDate.getMonth() ===
              this.blockedDays[i].getMonth() &&
            this.currentCellDate.getFullYear() ===
              this.blockedDays[i].getFullYear()
          ) {
            item.classList.add("bg-unactive-date");
          }
        }
        if (
          this.currentCellDate.getDate() === this.startDay.getDate() && //date = startday
          this.currentCellDate.getMonth() === this.startDay.getMonth() &&
          this.currentCellDate.getFullYear() === this.startDay.getFullYear()
        ) {
          item.classList.add("bg-choosen-date");
        }
      }
    } else {
      for (let item of cells) {
        this.currentCellDate = new Date(
          `${this.tmpCurrentMonth + 1} ${parseInt(item.textContent)} ${
            this.tmpCurrentYear
          }`
        );

        if (this.currentCellDate < this.startDay) {
          item.classList.add("bg-unactive-date");
        }
        if (this.currentCellDate < this.endDay) {
          item.classList.remove("bg-unactive-date");
        }

        for (let i = 0; i < this.blockedDays.length; i++) {
          if (
            this.currentCellDate.getDate() === this.blockedDays[i].getDate() &&
            this.currentCellDate.getMonth() ===
              this.blockedDays[i].getMonth() &&
            this.currentCellDate.getFullYear() ===
              this.blockedDays[i].getFullYear()
          ) {
            item.classList.add("bg-unactive-date");
          }
        }

        if (
          this.currentCellDate.getDate() === this.startDay.getDate() && //date = startday
          this.currentCellDate.getMonth() === this.startDay.getMonth() &&
          this.currentCellDate.getFullYear() === this.startDay.getFullYear()
        ) {
          item.classList.add("bg-start-date");

          for (let item of cells) {
            item.classList.remove("bg-end-date");
            item.classList.remove("bg-between-date");
          }
        }

        if (
          this.currentCellDate.getDate() === this.endDay.getDate() &&
          this.currentCellDate.getMonth() === this.endDay.getMonth() &&
          this.currentCellDate.getFullYear() === this.endDay.getFullYear()
        ) {
          item.classList.add("bg-end-date");

          this.showdate.innerText = `${
            this.months[this.startDay.getMonth()]
          } ${this.startDay.getDate()} - ${
            this.months[this.endDay.getMonth()]
          } ${this.endDay.getDate()}`;

          if (this.startDay.getFullYear() != this.endDay.getFullYear()) {
            this.showdate.innerText = `${this.startDay.getDate()} ${
              this.months[this.startDay.getMonth()]
            } ${this.startDay.getFullYear()} - ${this.endDay.getDate()} ${
              this.months[this.endDay.getMonth()]
            } ${this.endDay.getFullYear()}`;
          }

          if (
            this.currentCellDate.getDate() === this.endDay.getDate() &&
            this.currentCellDate.getMonth() === this.endDay.getMonth() &&
            this.currentCellDate.getFullYear() === this.endDay.getFullYear() &&
            this.currentCellDate.getDate() === this.startDay.getDate() &&
            this.currentCellDate.getMonth() === this.startDay.getMonth() && // startday = endday
            this.currentCellDate.getFullYear() === this.startDay.getFullYear()
          ) {
            item.classList.remove("bg-start-date");
            item.classList.remove("bg-end-date");
            item.classList.add("bg-choosen-date");
            this.showdate.innerText = `${
              this.months[this.endDay.getMonth()]
            } ${this.endDay.getDate()}`;
          }
        }
        if (
          this.currentCellDate > this.startDay &&
          this.currentCellDate < this.endDay
        ) {
          item.classList.add("bg-between-date");
        }
      }
    }
  }

  dateClick = cell => {
    if (this.rangeCalendar === false) {
      this.startDay = new Date(
        `${this.tmpCurrentMonth + 1} ${parseInt(cell.textContent)} ${
          this.tmpCurrentYear
        }`
      );
      document.getElementById(
        "dateInput"
      ).value = ` ${this.startDay.getDate()} ${
        this.months[this.startDay.getMonth()]
      } ${this.startDay.getFullYear()}`;
      this.father.style.visibility = "hidden";
    } else {
      if (this.firstClick) {
        this.startDay = new Date(
          `${this.tmpCurrentMonth + 1} ${parseInt(cell.textContent)} ${
            this.tmpCurrentYear
          }`
        );
        this.endDay = new Date(0, 0, 0);
        this.showdate.innerText = "";
      } else {
        this.endDay = new Date(
          `${this.tmpCurrentMonth + 1} ${parseInt(cell.textContent)} ${
            this.tmpCurrentYear
          }`
        );
        this.rangeContainBlockedDays();
      }
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
          cell.classList.add("bg-unactive-date");
          row.appendChild(cell);
        } else if (date > this.daysInMonth) {
          break;
        } else {
          let cell = document.createElement("td");
          let cellText = document.createTextNode(date);
          cell.appendChild(cellText);
          row.appendChild(cell);

          cell.onclick = () => this.dateClick(cell);

          //bg-red for holidays
          if (this.currentType === DAY_TYPE.MON) {
            if (j === 5 || j === 6) {
              cell.classList.add("bg-info");
            }
          } else if (this.currentType === DAY_TYPE.SUN) {
            if (j === 0 || j === 6) {
              cell.classList.add("bg-info");
            }
          }

          date++;
        }
      }

      tbl.appendChild(row); // appending each row into calendar body.
    }

    this.rangeDays();
  }

  render() {
    this.init();
    this.renderHeader();
    this.renderBody();
  }
}

const calendar = new Calendar();
calendar.render();

// const calendar = new Calendar();
// calendar.render();

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

function onInputClick() {
  // element.innerHTML = document.getElementById("calendar-container").innerHTML;
  // document.getElementById("calendar-container").style.display = "block";
  calendar.father.style.visibility = "visible";
  let child = document.getElementById("main-container");
  calendar.father.appendChild(child);
}
