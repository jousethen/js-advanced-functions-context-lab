/* Your Code Here */
// Your code here
function createEmployeeRecord(employeeArr) {

    return {
        firstName: employeeArr[0],
        familyName: employeeArr[1],
        title: employeeArr[2],
        payPerHour: employeeArr[3],
        timeInEvents: [],
        timeOutEvents: []

    }
}

function createEmployeeRecords(employees) {
    return employees.map(function (e) {
        return createEmployeeRecord(e)
    });
}

function createTimeInEvent(timeStamp) {
    let time = timeStamp.slice(-4);
    let date = timeStamp.slice(0, 10);
    /// let time = datetime[1];

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time),
        date: date
    });

    return this;
}

function createTimeOutEvent(timeStamp) {
    let time = timeStamp.slice(-4);
    let date = timeStamp.slice(0, 10);
    /// let time = datetime[1];

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time),
        date: date
    });

    return this;
}

function hoursWorkedOnDate(timeStamp) {
    let time = timeStamp.slice(-4);
    let date = timeStamp.slice(0, 10);
    let indexDate = getDateIndex(this, timeStamp);

    return getTimeDiff(this.timeOutEvents[indexDate].hour, this.timeInEvents[indexDate].hour)
}

function wagesEarnedOnDate(timeStamp) {
    let index = getDateIndex(this, timeStamp);

    return hoursWorkedOnDate.call(this, timeStamp) * this.payPerHour;
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}


function findEmployeeByFirstName(employees, name) {
    return employees.find(function (g) {
        return g.firstName === name;
    })
}

function calculatePayroll(employees) {
    return employees.reduce(function (total, e) {
        return total + allWagesFor.call(e);
    }, 0)
}



function getDateIndex(employee, timeStamp) {
    let i = employee.timeInEvents.findIndex(function (e) {
        return e.date === timeStamp.slice(0, 10)
    });
    ;
    return i;
}
function getTimeDiff(a, b) {
    return (a - b) / 100

}

