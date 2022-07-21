const FitnetLeave = require('./i2fl_folders/_models/Fitnet.model')
const StaticValues = require('./i2fl_folders/enums/StaticValues.enum')
const Helper = require("./i2fl_folders/helper/Helper");


const express = require('express')
const app = express()
const axios = require('axios');

var getLuccaLeaves = null;
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

LeaveType = StaticValues.LEAVE_TYPE;


const INDEX = "\\integrator.component.html"; // remove this
app.get('/', function (req, res) {
    res.send(__dirname + INDEX);
})


var dateParam, dateStart, dateEnd, isCancelled;
function reInitializeVariables() {
    dateStart = '';
    dateEnd = '';
    dateParam = '';
}
app.post('/integrate', function (req, res) {
    payload = res.req.body;
    ownerId = payload.owner.id;
    email = "siraj.berry@idento.fr";

    isCancelled = payload.isCancelled;

    console.log("res.req.body",res.req.body);
    if (dateStart === '') {
        dateStart = res.req.body.date;
    }
    dateEnd = res.req.body.date;
    dateParam = 'between,' + dateStart + ',' + dateEnd;
    res.json(res.req.body)
})

function callback() {
    setTimeout(() => {
        if(isCancelled) {
            deleteLeave(dateStart);
        }
        else {
            getLuccaLeaves = getLeavesAPI(ownerId, dateParam, StaticValues.PAGING);
            getLuccaLeaves.then(function (leaves) {
                if (leaves) {
                    luccaLeaves = leaves?.data?.items;
                    integrator(luccaLeaves, email);
                }
            })
        }
    }, 0);
}

//first function
function initialize() {
    reInitializeVariables();

    setInterval(() => {
        if (!(dateParam === '')) {
            callback();
        }
        else {
            console.log('dateParam still empty', dateParam);
        }
    }, 7000);
}

//initial function
initialize();

app.listen(process.env.PORT || 8088, function () {
    console.log("integrator server listening at 8088")
})

//functions
async function getLeavesAPI(ownerId, date, paging) {
    const response = await axios.get('https://i-tracing.ilucca-test.net/api/v3/leaves?leavePeriod.ownerId=' + ownerId + '&date=' + date + '&paging=' + paging, {
        headers: {
            Authorization: 'lucca application=ca6beae7-92e5-4b02-8472-4edc15dcfe26'
        }
    })
    const json = response.data;
    return json;
}

function integrator(luccaLeaves, email) {
    //case of half day
    if (luccaLeaves.length == 1) {
        halfDay = luccaLeaves[0];
        let d = Helper.getDateFromId(halfDay);
        halfDayDate = Helper.transformToDateFormat(d);
        var fitnetLeaveRequest1 = new FitnetLeave(email, LeaveType, halfDayDate, halfDayDate, Helper.isAm(halfDay.id), !Helper.isAm(halfDay.id))
        console.log("LeaveType", LeaveType);
        setLeaves(fitnetLeaveRequest1);
    }
    // case of full day
    else if(luccaLeaves.length == 2) {
        fullDay = luccaLeaves[0];

        let fd = Helper.getDateFromId(fullDay);
        fullDayDate = Helper.transformToDateFormat(fd);
        var fitnetLeaveRequest2 = new FitnetLeave(email, LeaveType, fullDayDate, fullDayDate, false, false);
        setLeaves(fitnetLeaveRequest2);
    }
    else if (luccaLeaves.length > 2) {
        var begin = luccaLeaves[0];
        var end = luccaLeaves[luccaLeaves.length - 1];

        var beginDate = Helper.getDateFromId(begin);
        beginDate = Helper.transformToDateFormat(beginDate);
        var endDate = Helper.getDateFromId(end);
        endDate = Helper.transformToDateFormat(endDate);

        var startMidday = Helper.isHalfDay(luccaLeaves, begin.id);
        var endMidday = Helper.isHalfDay(luccaLeaves, end.id);

        var fitnetLeaveRequest3 = new FitnetLeave(email, LeaveType, beginDate, endDate, startMidday, endMidday);
        setLeaves(fitnetLeaveRequest3);
    }
}
async function setLeaves(fitnetLeaveRequest) {
    response = await axios.post("https://evaluation.fitnetmanager.com/FitnetManager/rest/leaves/create", fitnetLeaveRequest, {
        headers: {
            Authorization: 'Basic c2lyYWouYmVycnlAaWRlbnRvLmZyOnRlc3QxMjMh'
        }
    }).then((res) => { console.log("success this leave request was aded to fitnet", fitnetLeaveRequest) }).catch((error) => {
        console.log("error: ", error);
    });
    reInitializeVariables();
}

function deleteLeave(dateLeave) {
    console.log('dateLeave',dateLeave);
    splitLeaveDate = dateLeave.split("-");
    var companyId = StaticValues.COMPANY_ID;

    var year = Number(splitLeaveDate[0]);
    var month = Number(splitLeaveDate[1]);
    var day = Number(splitLeaveDate[2]);

    var luccaToFitnetDateFormat = Helper.luccaToFitnetDateConvertor(day, month, year);
    console.log("luccaToFitnetDateFormat: ", luccaToFitnetDateFormat)


    fitnetLeaveObj = fitnetGetLeave(companyId, month, year);
    fitnetLeaveObj.then(function (leaves) {
        if (leaves) {
            leaves.forEach(leave => {
                console.log("leave", leave);
                if (leave.beginDate === luccaToFitnetDateFormat) {
                    deleteLeavePromise = fitnetDeleteLeave(leave.leaveId);
                    deleteLeavePromise.then((res) => { console.log("leave request with id "+leave.leaveId+"was deleted successfully") }).catch((error) => {
                        console.log("error: ", error);
                    });

                    reInitializeVariables();
                }
            }
            );
        }
    })
}


async function fitnetGetLeave(companyId, month, year) {
    const response = await axios.get("https://evaluation.fitnetmanager.com/FitnetManager/rest/leaves/getLeavesWithRepartition/" + companyId + "/" + month + "/" + year, {
        headers: {
            Authorization: 'Basic c2lyYWouYmVycnlAaWRlbnRvLmZyOnRlc3QxMjMh'
        }
    }
    );
    const json = response.data;
    return json;
}

async function fitnetDeleteLeave(id) {
    const response = await axios.get("https://evaluation.fitnetmanager.com/FitnetManager/rest/leaves/delete/" + id, {
        headers: {
            Authorization: 'Basic c2lyYWouYmVycnlAaWRlbnRvLmZyOnRlc3QxMjMh'
        }
    }
    );
    const json = response.data;
    return json;
} 
