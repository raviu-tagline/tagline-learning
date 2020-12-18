//Function for get time
function get_time() {
    var dt = new Date();
    var ti = ["01", "02", "03", "04", "05", "06", "07", "08", "09"]
    var se = ["01", "02", "03", "04", "05", "06", "07", "08", "09"]
    if(dt.getSeconds() < 10)
        return dt.getHours() + " : " + dt.getMinutes() + " : " + se[dt.getSeconds()];
    else
        return dt.getHours() + " : " + dt.getMinutes() + " : " + dt.getSeconds();
}

//Function for get date
function get_date() {
    var dt = new Date();
    var months = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    return dt.getDate() + "/" + months[dt.getMonth()] + "/" + dt.getFullYear();
}




//Function get data from state
function get_data_from_state(stateId){
    var cityData = city_arr.filter(obj => obj.state_id == stateId);
    return cityData;
}

//Function for set array value in table
function fillData(tmpArr) {
    var str = "";
    $.each(tmpArr, function (index, person) {
        str += "<tr id='name0'><td>" + person.name + "</td>" +
            "<td>" + person.email + "</td>" +
            "<td>" + person.gen + "</td>" +
            "<td>" + get_hob_name(person.hobbies) + "</td>" +
            "<td>" + person.age + "</td>" +
            "<td>" + get_state_name(person.sid) + "</td>" +
            "<td>" + get_city_name(person.cid) + "</td>" +
            "<td>" + person.time + "</td>" +
            "<td><button id='btnEdit0' class='btnEdit btn btn-success btn-block font-weight-bold' value=" + person.id + ">Edit</button></td>" +
            "<td><button id='btnDelete0' class='btnDelete btn btn-danger btn-block font-weight-bold' value=" + person.id + ">Delete</button></td>" +
            "</tr>";
    });

    $("#tblData").html(str);
}

//Function set value in city dropdown
function set_city(data){
    $.each(data, function(index, value){
        $("<option/>").val(value.cid).text(value.name).appendTo("#ddlCity");
    })
}

//Function get hobbies into array
function get_hobbies(){
    var favorite = [];
    $.each($("input[name='uHob']:checked"), function(){
        favorite.push(parseInt($(this).val()));
    });
    return favorite;
}

//Function for validate email
function validate_mail(email){
    var chkReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if(chkReg.test(email))
        return email;
    else
        return "err";
}

//validate Age input
function validate_age(age){
    var chkReg = /^[0-9]+/;
    if(chkReg.test(age))
        return age;
    else
        return "err";
}



//Function for get index value
function get_index(x){
    return x;
}

//Function for get data 
function get_data(tblId, arr){
    var uData = arr.filter(obj => obj.id == tblId);
    return uData;
}

function get_del_data(tblId, arr){
    var uAr = arr.filter(obj => obj.id == tblId);
    return uAr;
}

var ind = 1;

//Function for get array data by index
function get_array_data(ind2)
{
    var tArray =
    {
        id: parseInt(ind2),
        name: $("#uName").val(),
        email: validate_mail($("#uEmail").val()),
        gen: $("input[name='gender']:checked").val(),
        hobbies: get_hobbies(),
        age: validate_age($("#uAge").val()),
        sid: parseInt($("#ddlState").val()),
        cid: parseInt($("#ddlCity").val()),
        date: get_date(),
        time: get_time()
    };
    return tArray;
}

//Function for set data for update
function set_data(eData){
    $.each(eData, function(index, valueA){
        $("#btnUpdate").text(valueA.id);
        $("#uName").val(valueA.name);
        $("#uEmail").val(valueA.email);
        $("input[value='"+ valueA.gen +"']").prop("checked","true");
        $.each(valueA.hobbies,function(index, values){
            $("input[value='"+ values +"']").prop("checked","true");
        });
        $("#uAge").val(valueA.age);
        $("#ddlState").val(valueA.sid);
        set_city(get_data_from_state(valueA.sid));
        $("#ddlCity").val(valueA.cid);
    });
}

//Function for set value in drop down state
function set_ddlState()
{
    $.each(state_arr, function(id, value){
        $("<option/>").val(value.sid).text(value.name).appendTo("#ddlState");
    });
}

//Functiuon for set value in drop down of sorting
function set_ddlASort()
{
    $.each(sorting_Order,function(id,value){
        $("<option/>").val(value.oid).text(value.o_type).appendTo("#ddlASort");
    });
}

//Function for finding name using search bar
function findName(x){
    
    var tmp = $(x).val().toLowerCase();
    
    $('#tblData tr').filter(function(index,value){
        $(this).toggle($('#name' + index + ' td').eq(1).text().toLowerCase().indexOf(tmp) > -1)
    });
}

//Function for Sorting table in asending order
function sortTableAsc(a, b) {
   const nameA = a.name.toLowerCase();
   const nameB = b.name.toLowerCase();
    console.log("Name first ",nameA)
    console.log("Name second ",nameB)
   let compare = 0;
   if (nameA > nameB) {
        compare = 1;
    } else if (nameA < nameB) {
        compare = -1;
    }
    return compare;
}

//Function for sorting table in descending order
function sortTableDsc(a, b) {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();
    console.log("Name 1: ",nameA)
    console.log("Name 2: ",nameB);
    let compare = 0;
    if (nameA < nameB) {
        compare = 1;
    } else if (nameA > nameB) {
        compare = -1;
    }
    return compare;
}

//Function for reset form
function resetForm()
{
    $("#form1").trigger("reset");
   
    $("#ddlCity").html("").prop("disabled",true);
    $('#erMsg').text("");
    $("#ddlState").val(0);
}

//Validate field
function verify_name(udata){
    if(udata !== null || udata !== undefined)
        return udata;
    else
        return false;
}

//validate city and state
function verify_dropdown(udata)
{
    if(udata > 0)
        return parseInt(udata);
    else
        return false;
}

//Validate email and age
function verify_enda(udata)
{
    if(udata !== "err")
        return udata;
    else
        return false;
}

//Function Get hobby name
function get_hob_name(hob){
    var hoby_name = [];
    var hoby;
    $.each(hob,function(index, value){
        hoby = hob_arr.find(obj => obj.hid == value)
        hoby_name.push(hoby.name)
    });
    return hoby_name
}

//Function for get state
function get_state_name(sta){
    var st;
    st = state_arr.find(obj => obj.sid == sta)
    return st.name;
}

//Function for get city
function get_city_name(cty) {
    var ct;
    ct = city_arr.find(obj => obj.cid == cty)
    return ct.name;
}



//Submit data
function submit_data(temp){
    var str = "";
    str = set_table_string(temp);
    $("#tblData").append(str);
    
}

function set_table_string(temp)
{
    var tStr = "";
    tStr += "<tr id='name" + temp.id + "'><td>" + temp.name + "</td>" +
        "<td>" + temp.email + "</td>" +
        "<td>" + temp.gen + "</td>" +
        "<td>" + get_hob_name(temp.hobbies) + "</td>" +
        "<td>" + temp.age + "</td>" +
        "<td>" + get_state_name(temp.sid) + "</td>" +
        "<td>" + get_city_name(temp.cid) + "</td>" +
        "<td>" + temp.time + "</td>" +
        "<td><button id='btnEdit" + temp.id + "' class='btnEdit btn btn-success btn-block font-weight-bold' value=" + temp.id + ">Edit</button></td>" +
        "<td><button id='btnDelete' class='btnDelete btn btn-danger btn-block font-weight-bold' value=" + temp.id + ">Delete</button></td>" +
        "</tr>";
    return tStr;
}

//Main JQuery
$(document).ready(function(){

    /***********************
     * ******* Declaration section ********** *
    **************************/


    //Array object for table
    emp_arr = [{
        id: 1,
        name: "zzz",
        email: "abc@a.com",
        gen: "Male",
        hobbies: [1, 2],
        age: "18",
        sid: 1,
        cid: 1,
        date: get_date(),
        time: get_time()
    }];

    //Array for hobby
    hob_arr = [{
        hid: 1,
        name: "Music"
    }, {
        hid: 2,
        name: "Dancing"
    }, {
        hid: 3,
        name: "Singing"
    }, {
        hid: 4,
        name: "Playing"
    }
    ];

    //Array object for state
    state_arr = [{
        sid: 1,
        name: "Gujarat"
    }, {
        sid: 2,
        name: "Maharastra"
    }, {
        sid: 3,
        name: "Rajasthan"
    }];

    //Array object for City
    city_arr = [{
        cid: 1,
        state_id: 1,
        name: "Surat"
    },
    {
        cid: 2,
        state_id: 1,
        name: "Rajkot"
    },
    {
        cid: 3,
        state_id: 1,
        name: "Ahmedabad"
    },
    {
        cid: 4,
        state_id: 2,
        name: "Nashik"
    },
    {
        cid: 5,
        state_id: 2,
        name: "Pune"
    },
    {
        cid: 6,
        state_id: 2,
        name: "Nagpur"
    },
    {
        cid: 7,
        state_id: 3,
        name: "Jaipur"
    },
    {
        cid: 8,
        state_id: 3,
        name: "Jodhpur"
    },
    {
        cid: 9,
        state_id: 3,
        name: "Kota"
    }];

    //Array object for sorting
    sorting_Order = [{
        oid: 1,
        o_type: "Ascending"
    },
    {
        oid: 2,
        o_type: "Descending"
    }
    ];

    $("#divBtn").css("display","none");
    $("#fValue").text("Select Sorting Name  wise").prop("disabled",true);
    $("#sFValue").text("Select State").prop("disabled",true);
    $("#cFValue").text("Select City").prop("disabled",true);
    set_ddlState();
    set_ddlASort();

    fillData(emp_arr);
    
    //Change the value of drop down city on state change
    $("#ddlState").on('change',function(){
        $("#ddlCity").prop("disabled",false);
        $("#ddlCity").html("");
        set_city(get_data_from_state($("#ddlState").val()));
    });

    
    //Event fires when submit button click
    $("#btnSubmit").click(function(){


        //Local variables for get the value of form and set into array
        var arrData;
        var uid = parseInt(ind);
        var uname = verify_name($("#uName").val());
        var uemail = verify_enda(validate_mail($("#uEmail").val()));
        var ugender = verify_name($("input[name='gender']:checked").val());
        var uhobbies = verify_name(get_hobbies());
        var uage = verify_enda(validate_age($("#uAge").val()));
        var ustate = parseInt(verify_dropdown($("#ddlState").val()));
        var ucity = parseInt(verify_dropdown($("#ddlCity").val()));
        var udate = get_date();
        var utime = get_time();

        //Check for validdation in form
        
        if(uname && uemail && ugender && uhobbies && uage && ustate && ucity != false){                    
            arrData = {
                id: uid,
                name: uname,
                email: uemail,
                gen: ugender,
                hobbies: uhobbies,
                age: uage,
                sid: ustate,
                cid: ucity,
                date: udate,
                time: utime
            };
            
            emp_arr.push(arrData);
            ind++;
            resetForm();
            submit_data(arrData);
        }
        else{
            $("#erMsg").text("Null or Uncorrect value found please check!!!!");
            $('.alert').toggle();
        }
    });

    //Event fires when update button is click
    $("#btnUpdate").click(function(){
        var idr = $("#btnUpdate").text();
        var tmpArray = get_array_data(idr);
        var val1 = emp_arr.findIndex(obj => obj.id == idr);
        emp_arr[val1] = tmpArray;
        var demo = set_table_string(tmpArray);
       
        $("#tblData").each(function(index, value){
            var bId = $('#btnUpdate').text();
            $('tr').find($('#name'+bId).replaceWith(demo));
        });
        
        $("#divBtn").css("display","none");
        resetForm();
        $("#btnSubmit").css("display","inline");
    });
    
    $("#tblData").on("click", ".btnEdit" , function () {
        var id = $(this).val();
        $("#ddlCity").prop("disabled", false);
        $("#divBtn").css("display", "inline");
        $("#btnSubmit").css("display", "none");
        var eData = get_data(id, emp_arr);
        set_data(eData);
    });

    //Started a new click event delete
    $("#tblData").on("click", ".btnDelete", function () {
        var id = $(this).val();
        console.log("Id of btnDelete: ",id)
        var r = get_del_data(id, emp_arr);
        emp_arr.pop(r);

        $('#tblData').each(function (ind, value) {
            console.log("delete row id: ", id);
            $('tr').find($('#name' + id).remove());
        })
    });


    //Event fires when cancel button click
    $("#btnReset").click(function(){

        $("#ddlCity").prop("disabled",true);
        $("#btnSubmit").css("display","inline");
        $("#divBtn").css("display","none");
        
        resetForm();
    });

    //Event fires when any character is typed in search box
    $("#fSearch").keyup(function(){
        findName(this);
    })

    //Event fires when drop down change it's state
    $("#ddlASort").on('change',function(){
        $("#tblData").html("");
        var asc = parseInt($(this).val());
        console.log("Value of Ascending: ",asc);
        if(asc == 1) {
            // sort_order()
            emp_arr.sort(sortTableAsc);
        }
        else if (asc == 2){
            emp_arr.sort(sortTableDsc);
        }
        
        fillData(emp_arr)
    });
})