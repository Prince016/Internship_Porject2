function remove() {


    var sel = document.getElementById("leveltwo");
    var opts = sel.options;
    var array = new Array();
    for (i = 0; i <= opts.length + 1; i++) {

        sel.remove(opts[i]);
        // sel.innerText.remove;
        sel.innerHTML = ""
    }




}

function remove2() {

    var sel = document.getElementById("levelthree");
    var opts = sel.options;
    var array = new Array();
    for (i = 0; i <= opts.length + 1; i++) {

        sel.remove(opts[i]);
        sel.innerHTML = ""
    }



}


function AddSubFields() {
    console.log(" Show Adding teh fiels   Autos  ");
    const autos = [
        "All Terrain Vechiles",
        "Antique Autos",
        "Auto Dealers",
        "Auto Appraisers",
        "Auto Conversions",
        "Auto Detailing",
        "Auto Repair & Service",
        "REcreational Vechiles",
        "Auto Fuel &amp",
        "REcreational Vechiles",
        "Automotive Supplies",
        "Auto Painting",
        "Auto Parts",
        "Autos Wholesale",
        "Auto Wreckers",
        "Car Accessories",
        "Car Security",
        "Car Transport",
        "Motorcycles",
        "Car Washes",
        "Motorcycles",
        "Racing",
        "Tires",
        "Towing",
        "Traffic Schools",
        "Trailers Dealers &amp",
        "Trucks",

    ];

    let subfieldvariable = document.getElementById("leveltwo");
    subfieldvariable.innerHTML = ""

    for (let i = 0; i < autos.length; i++) {
        var option = document.createElement("OPTION"),
            txt = document.createTextNode(autos[i]);
        option.appendChild(txt);
        option.setAttribute("value", autos[i]);
        subfieldvariable.insertBefore(option, subfieldvariable.lastChild);
    }

}

//  for the auto dealers 
function AddSubSubFields() {
    console.log(" Show Adding the fiels   Autos  Dealers  ");

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Acura Dealers",
        "Audi Dealers",
        "BMW Dealers",
        "Buick Dealers",
        "Cadillac Dealers ",
        "Chrysler-Plymouth Dealers",
        "Chrysler-Plymouth Dealers",
        "Ferrari Dealers",
        "Ford Dealers",
        "GMC Dealers",
        "Honda Dealers",
        "Hyundai Dealers",
        "Infiniti Dealers",
        "Isuzu Dealers",
        "1Kia Dealers",
        "1Lincoln-Mercury Dealers",
        "Mazda Dealers",
        "Mercedes-Benz Dealers",
        "Pontiac Dealers",
        "Porsche Dealers",
        "Saab Dealers",
        "Saturn Dealers",
        "Subaru Dealers",
        "Suzuki Dealers",
        "Toyota Dealers",
        "Used Car Dealers",
        "Volkswagen Dealers",
        "Volvo Dealers",



    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }

}




function AddSubSubFieldsA1() {
    console.log(" Show Adding the fiels   Autos  Repair and service  ");

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = ["Alternator Repairs", "Auto Body Shops",
        "Automotive ",
        "3.	Auto Glass",
        "Automobile Restoration",
        "Automotive Oil Change",
        "Automotive Upholstery",
        "Auto Repairs",
        "Auto Road Service",
        "Batteries",
        "Brake Service",
        "Emission Testing & Service",
        "Engine Repair",
        "Exhaust Services",
        "Radiators",
        "Referral Service",
        "Transmissions",
        "Wheel Alignment & Balance",



    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}



function AddSubSubFieldsA2() {
    console.log(" Show Adding the fields of Recreational Vechicles ");

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = ["Renters", "RV Dealers ",
        "RV Repair & Service",

    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}


//   rental
function AddSubSubFieldsA3() {
    console.log(" Show Adding the fields of Recreational Vechicles ");

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = ["Auto Rentals", "Trailer Rentals "];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}

//   trucks 
function AddSubSubFieldsA4() {
    console.log(" Show Adding the fields of Recreational Vechicles ");

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = ["Truck Dealers", "Truck Dealers",
        "Truck Parts",
        "Truck Rentals",
        "Truck Repair",
        "Truck Stops",
        "Truck Transport",
    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}

function ShowSubFields() {
    console.log(" Show   Sub Fields ");
    remove();
    var status = document.getElementById("levelone");


    if (status.value == "Auto") {
        document.getElementById("subField").style.display = "block";
        AddSubFields();
        // AddSubSubFields();
    } else if (status.value == "Business to Business") {
        document.getElementById("subField").style.display = "block";
        AddSubFields1();
        // AddSubSubFields1();
    } else if (status.value == "Community") {
        document.getElementById("subField").style.display = "block";
        AddSubFields2();
        // AddSubSubFields2();
    } else if (status.value == "Education") {
        document.getElementById("subField").style.display = "block";
        AddSubFields3();
        // AddSubSubFields3();
    } else if (status.value == "Electronics") {
        document.getElementById("subField").style.display = "block";
        AddSubFields4();
        // AddSubSubFields4();
    } else if (status.value == "Entertainment and Arts") {
        document.getElementById("subField").style.display = "block";
        AddSubFields5();
        // AddSubSubFields5();
    } else if (status.value == "Food and Dining") {
        document.getElementById("subField").style.display = "block";
        AddSubFields6();
        // AddSubSubFields6();
    } else if (status.value == "Health and Beauty") {
        document.getElementById("subField").style.display = "block";
        AddSubFields7();
        // AddSubSubFields7();
    } else if (status.value == "Home and Garden") {
        document.getElementById("subField").style.display = "block";
        AddSubFields8();
        // AddSubSubFields8();
    } else if (status.value == "Legal and Financial") {
        document.getElementById("subField").style.display = "block";
        AddSubFields9();
        // AddSubSubFields9();
    } else if (status.value == "Professional Services") {
        document.getElementById("subField").style.display = "block";
        AddSubFields10();
        // AddSubSubFields10();
    } else if (status.value == "Real Estate") {
        document.getElementById("subField").style.display = "block";
        AddSubFields11();
        // AddSubSubFields11();
    } else if (status.value == "Recreation") {
        document.getElementById("subField").style.display = "block";
        AddSubFields12();
        // AddSubSubFields12();
    } else if (status.value == "Retail Shopping") {
        document.getElementById("subField").style.display = "block";
        AddSubFields13();
        // AddSubSubFields13();
    } else if (status.value == "Travel and Lodging") {
        document.getElementById("subField").style.display = "block";
        AddSubFields14();
        // AddSubSubFields14();
    } else {
        document.getElementById("subField").style.display = "none";
        remove();

    }
    // remove();


}

function ShowSubSubFields() {
    console.log(" Show sub  Sub Fields ");
    remove2();
    var status1 = document.getElementById("leveltwo");

    if (status1.value == "Auto Dealers") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFields();
    } else if (status1.value == "Auto Repair & Service") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsA1();
    } else if (status1.value == "Recreational Vehicles") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsA2();
    } else if (status1.value == "Rental") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsA3();
    } else if (status1.value == "Trucks") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsA4();
        // } else if (status1.value == "Energy & Mining") {
        //     document.getElementById("subSubField").style.display = "block";
        //     AddSubSubFields1();
        // } else if (status1.value == "Engineers") {
        //     document.getElementById("subSubField").style.display = "block";
        //     AddSubSubFields1();
        // } else if (status1.value == "Environmental Services") {
        //     document.getElementById("subSubField").style.display = "block";
        //     AddSubSubFields1();
    } else if (status1.value == "Food & Agriculture") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsB1();
        // } else if (status1.value == "Government & Law") {
        //     document.getElementById("subSubField").style.display = "block";
        //     AddSubSubFields1();
    } else if (status1.value == "Manufacturing & Industrial Supplies") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsB2();
    } else if (status1.value == "Office Supplies & Equipment") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsB3();
    } else if (status1.value == "Colleges & Universities") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsD1();
    } else if (status1.value == "Continuing Education") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsD2();
    } else if (status1.value == "Educational Materials & Supplies") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsD3();
        // } else if (status1.value == "Educational Services") {
        //     document.getElementById("subSubField").style.display = "block";
        //     AddSubSubFieldsD3();
    } else if (status1.value == "K-12") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsD4();
    } else if (status1.value == "Internet Services") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsE1();
    } else if (status1.value == "Bars, Pubs, & Clubs") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsF1();
    } else if (status1.value == "Beverage & Drinks") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsG1();
    } else if (status1.value == "Beverages") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsG2();
    } else if (status1.value == "Restaurants") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsG3();
    } else if (status1.value == "Alternative Medicine") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsH1();
    } else if (status1.value == "Care Providers") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsH2();
    } else if (status1.value == "Dental") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsH3();
    } else if (status1.value == "Doctors & Clinics") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsH4();
    } else if (status1.value == "Eye") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsH5();
    } else if (status1.value == "Fitness") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsH6();
    } else if (status1.value == "Hair") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsH7();
    } else if (status1.value == "Appliances") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsI1();
    } else if (status1.value == "Cleaning Services") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsI2();
    } else if (status1.value == "Furniture") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsI3();
    } else if (status1.value == "Home Decor") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsI4();
    } else if (status1.value == "Home Repair & Improvement") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsI5();
    } else if (status1.value == "Lawn & Garden") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsI6();
    } else if (status1.value == "Safety") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsI7();
    } else if (status1.value == "Utilities") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsI8();
    } else if (status1.value == "Financing") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsJ1();
    } else if (status1.value == "Insurance") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsJ2();
    } else if (status1.value == "Investment Services") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsJ3();
    } else if (status1.value == "Law Firms") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsJ4();
    } else if (status1.value == "Animals & Pets") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsK1();
    } else if (status1.value == "Employment") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsK2();
    } else if (status1.value == "News & Media") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsK3();
    } else if (status1.value == "Office Supplies & Services") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsK4();
    } else if (status1.value == "Photography") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsK5();
    } else if (status1.value == "Printing") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsK6();
    } else if (status1.value == "Shipping") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsK7();
    } else if (status1.value == "Storage") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsK8();
    } else if (status1.value == "Telecommunications") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsK9();
    } else if (status1.value == "Golf") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsM1();
    } else if (status1.value == "Hobbies") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsM2();
    } else if (status1.value == "Arts & Crafts") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsN1();
    } else if (status1.value == "Baby Accessories & Services") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsN2();
    } else if (status1.value == "Clothing") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsN3();
    } else if (status1.value == "Home Electronics") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsN4();
    } else if (status1.value == "Shopping Venues") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsN5();
    } else if (status1.value == "Weddings") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsN6();
    } else if (status1.value == "Hotels & Lodging") {
        document.getElementById("subSubField").style.display = "block";
        AddSubSubFieldsO1();

    } else {
        document.getElementById("subSubField").style.display = "none";
        remove2();
    }
}

// -----------------( Business to business)----------------------------------------------------------------------------------------------------------

function AddSubFields1() {
    console.log(" Show Adding teh fiels   Autos  ");
    const arr = ["Advertising", "Business Services",
        "Food & Agriculture",
        "Communications & Media",
        "Computers & Electronics",
        "Construction Materials & Equipment",
        "Construction & Real Estate",
        "Energy & Mining",
        "Engineers",
        "Entertainment & Recreation",
        "Environmental Services",
        "Finance & Investment",
        "Government & Law",
        "Health & Medicine",
        "Importers",
        "Manufacturing & Industrial Supplies",
        "Office Supplies & Equipment",
        "Printing & Publishing",
        "Science & Technology",
        "Security",
        "Shipping",
        "Trade Shows",
        "Transportation",



    ];

    let subfieldvariable = document.getElementById("leveltwo");
    subfieldvariable.innerHTML = "";
    for (let i = 0; i < arr.length; i++) {
        var option = document.createElement("OPTION"),
            txt = document.createTextNode(arr[i]);
        option.appendChild(txt);
        option.setAttribute("value", arr[i]);
        subfieldvariable.insertBefore(option, subfieldvariable.lastChild);
    }
}

//   food adn agriculture 
function AddSubSubFieldsB1() {
    console.log(" Show Adding the fields of Recreational Vechicles ");

    let subSubFieldvariable = document.getElementById("levelthree");
    const arr = ["Farm Equipment", "Feed Dealers",
        "Florists Wholesale Growers",
        "Food & Beverage Vendors",
        "Hydroponics Equipment & Supplies",
        "Livestock",
        "Nurseries & Growers",
        "Poultry Farms & Services",
        "Spraying Horticultural",
        "Vineyards",
    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}

// manugacturing
function AddSubSubFieldsB2() {
    console.log(" Show Adding the fields of Recreational Vechicles ");

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = ["Batteries Wholesale & Manufacturers",
        "Hydraulic Equipment Supplies New",
        "Tool & Die Makers Equipment & Suppliess",

    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}


//   food adn agriculture 
function AddSubSubFieldsB3() {
    console.log(" Show Adding the fields of Recreational Vechicles ");

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = ["printers service & repair",

    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}



// function ShowSubFields1() {

//     console.log(" Show   Sub Fields of Business  ");
//     var status = document.getElementById("levelone");

//     if (status.value == "Business to Business") {
//         document.getElementById("subField").style.display = "block";
//     } else {
//         document.getElementById("subField").style.display = "none";
//     }

// }

// function ShowSubSubFields1() {

//     console.log(" Show sub  Sub Fields of Business to business ");
//     var status1 = document.getElementById("leveltwo");

//     if (status1.value == "Food & Agriculture") {
//         document.getElementById("subSubField").style.display = "block";
//     } else {
//         document.getElementById("subSubField").style.display = "none";
//     }

// }

// // -----------------(Community)----------------------------------------------------------------------------------------------------------

function AddSubFields2() {
    console.log(" Show Adding teh fiels   commmunity  ");
    const arr = ["Animal & Humane Societies", "City Hall",
        "Courts of Law",
        "Correctional Institutions",
        "Disabled Services",
        "Family Services",
        "Finance & Taxation",
        "Fire Protection",
        "Funerals & Memorials",
        "Government",
        "Housing",
        "Immigration Services",
        "Law Enforcement",
        "Legal Services",
        "Military",
        "Other Organizations",
        "Philanthropy",
        "Postal Services",
        "Religion & Spirituality",
        "Social Services",

    ];

    let subfieldvariable = document.getElementById("leveltwo");

    subfieldvariable.innerHTML = "";

    for (let i = 0; i < arr.length; i++) {
        var option = document.createElement("OPTION"),
            txt = document.createTextNode(arr[i]);
        option.appendChild(txt);
        option.setAttribute("value", arr[i]);
        subfieldvariable.insertBefore(option, subfieldvariable.lastChild);
    }
}

// function ShowSubFields1() {

//     console.log(" Show   Sub Fields of Business  ");
//     var status = document.getElementById("levelone");

//     if (status.value == "Business to Business") {
//         document.getElementById("subField").style.display = "block";
//     } else {
//         document.getElementById("subField").style.display = "none";
//     }

// }

// function ShowSubSubFields1() {

//     console.log(" Show sub  Sub Fields of Business to business ");
//     var status1 = document.getElementById("leveltwo");

//     if (status1.value == "Auto Dealers") {
//         document.getElementById("subSubField").style.display = "block";
//     } else {
//         document.getElementById("subSubField").style.display = "none";
//     }

// }

// // -----------------(Education)----------------------------------------------------------------------------------------------------------

function AddSubFields3() {
    console.log(" Show Adding teh fiels   commmunity  ");
    const arr = [
        "Colleges & Universities",
        "Continuing Education",
        "Educational Materials & Supplies",
        "K-12",
        "Preschools",
        "Private Schools",
        "Schools Public & Academic",
        "Specialty Schools",
        "Tutoring",

    ];

    let subfieldvariable = document.getElementById("leveltwo");

    subfieldvariable.innerHTML = "";


    for (let i = 0; i < arr.length; i++) {
        var option = document.createElement("OPTION"),
            txt = document.createTextNode(arr[i]);
        option.appendChild(txt);
        option.setAttribute("value", arr[i]);
        subfieldvariable.insertBefore(option, subfieldvariable.lastChild);
    }
}


//   Colleges & Universities
function AddSubSubFieldsD1() {
    console.log(" Show Adding the fields of Recreational Vechicles ");

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = ["Colleges & Universities",
        "Community Colleges",

    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}


//   Continuing Education
function AddSubSubFieldsD2() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Bartending Schools",
        "Broadcast Schools",
        "Business Schools",
        "Computer Trainings",
        "Continuing Education",
        "Flight School",
        "Literacy Educations",
        "Massage Schools",
        "Real Estate Training",
        "Technical Schools",

    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}



//  Educational Services
function AddSubSubFieldsD3() {
    console.log(" Show Adding the fields of Recreational Vechicles ");

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = ["Test preparation serviceses",

    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}




//   K-12
function AddSubSubFieldsD4() {
    console.log(" Show Adding the fields of Recreational Vechicles ");

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Elementary Schools",
        "High Schoolses",
        "Middle Schools",
        "School Districts",

    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}






// function ShowSubFields1() {

//     console.log(" Show   Sub Fields of Business  ");
//     var status = document.getElementById("levelone");

//     if (status.value == "Business to Business") {
//         document.getElementById("subField").style.display = "block";
//     } else {
//         document.getElementById("subField").style.display = "none";
//     }

// }

// function ShowSubSubFields1() {

//     console.log(" Show sub  Sub Fields of Business to business ");
//     var status1 = document.getElementById("leveltwo");

//     if (status1.value == "Auto Dealers") {
//         document.getElementById("subSubField").style.display = "block";
//     } else {
//         document.getElementById("subSubField").style.display = "none";
//     }

// }

// // -----------------(Electronics)----------------------------------------------------------------------------------------------------------

function AddSubFields4() {
    console.log(" Show Adding teh fiels   commmunity  ");
    const arr = [
        "Communications & Networking",
        "Computer Graphics",
        "Computer Multimedia",
        "Computer Rental",
        "Computer Repair",
        "Computer Services",
        "Computer Software",
        "Computer Stores",
        "Internet Services",

    ];

    let subfieldvariable = document.getElementById("leveltwo");
    subfieldvariable.innerHTML = "";


    for (let i = 0; i < arr.length; i++) {
        var option = document.createElement("OPTION"),
            txt = document.createTextNode(arr[i]);
        option.appendChild(txt);
        option.setAttribute("value", arr[i]);
        subfieldvariable.insertBefore(option, subfieldvariable.lastChild);
    }
}




//   Internet Services
function AddSubSubFieldsE1() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Broadband & DSL",
        "Internet Consulting",
        "Internet Provider",
        "Internet Servicess",
        "Online Services",

    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}









// function ShowSubFields1() {

//     console.log(" Show   Sub Fields of Business  ");
//     var status = document.getElementById("levelone");

//     if (status.value == "Business to Business") {
//         document.getElementById("subField").style.display = "block";
//     } else {
//         document.getElementById("subField").style.display = "none";
//     }

// }

// function ShowSubSubFields1() {

//     console.log(" Show sub  Sub Fields of Business to business ");
//     var status1 = document.getElementById("leveltwo");

//     if (status1.value == "Auto Dealers") {
//         document.getElementById("subSubField").style.display = "block";
//     } else {
//         document.getElementById("subSubField").style.display = "none";
//     }

// }

// // -----------------(Entertainment and Arts)----------------------------------------------------------------------------------------------------------

function AddSubFields5() {
    console.log(" Show Adding teh fiels   commmunity  ");
    const arr = ["Artists", "Bars, Pubs, & Clubs",
        "Entertainers",
        "Dance",
        "Entertainers",
        "Entertainment Venues",
        "Event Planners",
        "Movies & Film",
        "Museums & Galleries",
        "Music",
        "Party Rentals",
        "Producers",
        "Talent Agencies",
        "Theatre",
        "Video",
        "Writers",
        "Zoos & Gardens",




    ];

    let subfieldvariable = document.getElementById("leveltwo");

    subfieldvariable.innerHTML = "";


    for (let i = 0; i < arr.length; i++) {
        var option = document.createElement("OPTION"),
            txt = document.createTextNode(arr[i]);
        option.appendChild(txt);
        option.setAttribute("value", arr[i]);
        subfieldvariable.insertBefore(option, subfieldvariable.lastChild);
    }
}




//  Bars, Pubs, & Clubs
function AddSubSubFieldsF1() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Adult Entertainment",


    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}


// function ShowSubFields1() {

//     console.log(" Show   Sub Fields of Business  ");
//     var status = document.getElementById("levelone");

//     if (status.value == "Business to Business") {
//         document.getElementById("subField").style.display = "block";
//     } else {
//         document.getElementById("subField").style.display = "none";
//     }

// }

// function ShowSubSubFields1() {

//     console.log(" Show sub  Sub Fields of Business to business ");
//     var status1 = document.getElementById("leveltwo");

//     if (status1.value == "Auto Dealers") {
//         document.getElementById("subSubField").style.display = "block";
//     } else {
//         document.getElementById("subSubField").style.display = "none";
//     }

// }

// // -----------------(Food and Dining)----------------------------------------------------------------------------------------------------------

function AddSubFields6() {
    console.log(" Show Adding teh fiels   commmunity  ");
    const arr = ["Banquet Rooms", "Beverage & Drinks",
        "Beverages",
        "Candy & Sweets",
        "Catering Services",
        "Culinary Schools",
        "Fast Food",
        "Food & Produce Wholesale",
        "Food Services",
        "Grocery Stores",
        "Meats",
        "Organic Foods",
        "Produce Retailers",
        "Restaurant Equipment & Services",
        "Restaurants",
        "Specialty Food Stores",


    ];

    let subfieldvariable = document.getElementById("leveltwo");
    subfieldvariable.innerHTML = "";


    for (let i = 0; i < arr.length; i++) {
        var option = document.createElement("OPTION"),
            txt = document.createTextNode(arr[i]);
        option.appendChild(txt);
        option.setAttribute("value", arr[i]);
        subfieldvariable.insertBefore(option, subfieldvariable.lastChild);
    }
}


//  Beverage & Drinks
function AddSubSubFieldsG1() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Juices & Juice Bars",
        "Refreshment Stands",
        "Tea Rooms",



    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}
//  Beverage 
function AddSubSubFieldsG2() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Alcoholic Beverages",
        "Breweries",
        "Drinking Water",
        "Ice",
        "Wine",
        "Wineries",


    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}
//  Restaurants
function AddSubSubFieldsG3() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Afghani Restaurants",
        "African",
        "American Restaurants",
        "Argentinean Restaurants",
        "Armenian Restaurants",
        "Bagel & Donut Shops",
        "Bakeries",
        "Barbecue Restaurants",
        "Basque Restaurants",
        "Belgian Restaurants",
        "Bistro Restaurants",
        "Bolivian Restaurants",
        "Brazilian Restaurants",
        "Breakfast Restaurants",
        "Brewpubs",
        "Buffets",
        "Burgers",
        "Burmese Restaurants",
        "Cafes",
        "Cajun Restaurants",
        "Californian Restaurants",
        "Cambodian Restaurants",
        "Caribbean Restaurants",
        "Carry & Take Out",
        "Chinese Restaurants",
        "Coffee Houses",
        "Continental Restaurants",
        "Crepe Restaurants",
        "Cuban Restaurants",
        "Delicatessens",
        "Desserts",
        "Eclectic Restaurants",
        "English Restaurants",
        "Family Style Restaurants",
        "Filipino Restaurants",
        "Fondue Restaurants",
        "Food Delivery Services",
        "French Restaurants",
        "Fusion Restaurants",
        "German Restaurants",
        "Greek Restaurants",
        "Grill Restaurants",
        "Hawaiian Restaurants",
        "Healthy Restaurants",
        "Hungarian Restaurants",
        "Ice Cream & Yogurt",
        "Indian Restaurants",
        "Indonesian Restaurants",
        "International Restaurants",
        "Internet Cafes",
        "Irish Restaurants",
        "Israeli Restaurants",
        "Italian Restaurants",
        "Japanese Restaurants",
        "Korean Restaurants",
        "Kosher Restaurants",
        "Latin American",
        "Lebanese Restaurants",
        "Mediterranean Restaurants",
        "Mexican Restaurants",
        "Middle Eastern",
        "Noodle Shops",
        "Pakistani Restaurants",
        "Peruvian Restaurants",
        "Pizza",
        "Polish Restaurants",
        "Romanian Restaurants",
        "Russian Restaurants",
        "Salad Restaurants",
        "Salvadorian Restaurants",
        "Sandwiches",
        "Seafood Restaurants",
        "Singaporean Restaurants",
        "Soul Food Restaurants",
        "Southeast Asian Restaurants",
        "Southern Restaurants",
        "Southwestern Restaurants",
        "Spanish Restaurants",
        "Steak Houses",
        "Sushi Restaurants",
        "Swiss Restaurants",
        "Taiwanese Restaurants",
        "Tapas Restaurants",
        "Tex-Mex Restaurants",
        "Tibetan Restaurants",
        "Turkish Restaurants",
        "Vegetarian Restaurants",
        "Vietnamese Restaurants",



    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}





// function ShowSubFields1() {

//     console.log(" Show   Sub Fields of Business  ");
//     var status = document.getElementById("levelone");

//     if (status.value == "Business to Business") {
//         document.getElementById("subField").style.display = "block";
//     } else {
//         document.getElementById("subField").style.display = "none";
//     }

// }

// function ShowSubSubFields1() {

//     console.log(" Show sub  Sub Fields of Business to business ");
//     var status1 = document.getElementById("leveltwo");

//     if (status1.value == "Auto Dealers") {
//         document.getElementById("subSubField").style.display = "block";
//     } else {
//         document.getElementById("subSubField").style.display = "none";
//     }

// }

// // -----------------(Health and Beauty)----------------------------------------------------------------------------------------------------------

function AddSubFields7() {
    console.log(" Show Adding teh fiels   commmunity  ");

    const arr = [
        "Alternative Medicine",
        "Abuse Treatment",
        "Barbers",
        "Beauty Supplies",
        "Care Providers",
        "Cosmetics",
        "Cosmetologists",
        "Day Spas",
        "Dental",
        "Doctors & Clinics",
        "Domestic Violence Information & Treatment",
        "Drug Stores",
        "Eye",
        "First Aid",
        "Fitness",
        "Fragrances",
        "Hair",
        "Hospitals & Medical Centers",
        "Information &amp; Referral",
        "Laboratories",
        "Medical Supplies",
        "Mental Health",
        "Nail Care",
        "Nursing Homes",
        "Pharmacies",
        "Skin Care",
        "Tanning Salons",
        "Tattoos & Piercings",
        "Women's Health",

    ];

    let subfieldvariable = document.getElementById("leveltwo");
    subfieldvariable.innerHTML = "";


    for (let i = 0; i < arr.length; i++) {
        var option = document.createElement("OPTION"),
            txt = document.createTextNode(arr[i]);
        option.appendChild(txt);
        option.setAttribute("value", arr[i]);
        subfieldvariable.insertBefore(option, subfieldvariable.lastChild);
    }
}


//  Alternative Medicine
function AddSubSubFieldsH1() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Acupuncture",
        "Alternative Clinics",
        "Alternative Medicine Retailers ",
        "Aromatherapy ",
        "Biofeedback ",
        "Chiropractic Officess ",
        "Hypnotism",
        "Massage Therapy ",
        "Naturopaths ",
        "Nutrition & Supplements ",


    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}

//  Care Providers
function AddSubSubFieldsH2() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Assisted Living",
        "Home Health Care",
        "Hospice Care",
        "Nurses",
        "Physicians Assistants",



    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}



//  Dental
function AddSubSubFieldsH3() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Dental Referral Services",
        "Dental Specialties",
        "Dentistry",
        "Oral Surgeons",
        "Orthodontists",



    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}



//  Doctors & Clinics
function AddSubSubFieldsH4() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "AIDS & HIV Clinics",
        "Allergies & Asthma",
        "Anesthesiology",
        "Bariatric",
        "Birth Centers",
        " Cardiology",
        "Cosmetic Surgery",
        "Dermatology",
        "Diabetes",
        " Ear Care",
        " Ear Nose & Throat",
        " Endocrinology",
        " Family Medical Practice",
        " Fertility & Sterility",
        "Gastroenterology",
        "General Practice Medicine",
        "Hand Surgery",
        "Hematology",
        "Infectious Disease",
        "Internal Medicine",
        "Medical Referral Services",
        "Nephrology",
        "Neurology",
        "Oncology",
        "Orthopedics",
        "Pain Management",
        "Pathology",
        "Pediatrics",
        "Physical Therapy",
        "Podiatry",
        "Radiology",
        "Rehabilitation Services",
        "Rheumatology",
        "Sports Medicine",
        "Urology",



    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}



//  Eye
function AddSubSubFieldsH5() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Eye Care Referral Services",
        " Eyewear",
        " Laser Vision Correction",
        " Ophthalmology",
        " Opticians",
        " Optometry ",


    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}



// Fitness
function AddSubSubFieldsH6() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Exercise Equipment",
        "Fitness",
        "Health Clubs",
        "Personal Trainers",
        "Weight Loss",
        "Yoga",


    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}
// Hair
function AddSubSubFieldsH7() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Hair Removal",
        "Hair Replacement",
        "Hair Salons",
        "Hair Supplies",



    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}




// function ShowSubFields1() {

//     console.log(" Show   Sub Fields of Business  ");
//     var status = document.getElementById("levelone");

//     if (status.value == "Business to Business") {
//         document.getElementById("subField").style.display = "block";
//     } else {
//         document.getElementById("subField").style.display = "none";
//     }

// }

// function ShowSubSubFields1() {

//     console.log(" Show sub  Sub Fields of Business to business ");
//     var status1 = document.getElementById("leveltwo");

//     if (status1.value == "Auto Dealers") {
//         document.getElementById("subSubField").style.display = "block";
//     } else {
//         document.getElementById("subSubField").style.display = "none";
//     }

// }

// // -----------------(Home and Garden)----------------------------------------------------------------------------------------------------------

function AddSubFields8() {
    console.log(" Show Adding teh fiels   commmunity  ");
    const arr = ["Bed & Bath", "Appliances",
        "Cleaning Services",
        "Florists",
        "Furniture",
        "Home Decor",
        "Home & Garden Lighting",
        "Home & Garden Retailers",
        "Home Repair & Improvement",
        "Housewares",
        "Lawn & Garden",
        "Locksmiths",
        "Pest Control",
        "Plumbing, Heating, & Air",
        "Pools, Spas, & Saunas",
        "Safety",
        "Telephone",
        "Tree Service",
        "Utilities",
        "Waste Management",
        "Welding Services",
        "Window Treatments",




    ];

    let subfieldvariable = document.getElementById("leveltwo");
    subfieldvariable.innerHTML = "";


    for (let i = 0; i < arr.length; i++) {
        var option = document.createElement("OPTION"),
            txt = document.createTextNode(arr[i]);
        option.appendChild(txt);
        option.setAttribute("value", arr[i]);
        subfieldvariable.insertBefore(option, subfieldvariable.lastChild);
    }
}




//  Appliances
function AddSubSubFieldsI1() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Appliance repair",
        "Appliances ",



    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}

//  Cleaning Services
function AddSubSubFieldsI2() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        " Carpet Cleaning",
        " Chimney Sweeps",
        " Efficiency & Organization",
        " Floor Cleaning",
        " Gutter & Downspout Cleaning",
        " House Cleaning",
        " Laundry Services",
        " Maid & Butler Services",
        " Power Washing",
        " Cleaning ",


    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}

// Furniture
function AddSubSubFieldsI3() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "	Antique Furniture",
        "Furniture Rental",
        "Furniture Reupholstery",
        "Home Furnishings",
        "Outdoor Furniture",
        "Used Furniture",



    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}


// Home Decor
function AddSubSubFieldsI4() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Clocks",
        "Decoration Supplies",
        "Ornamental Glass, Metal, & Stone",
        "Statuary",


    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}

// Home Repair & Improvement
function AddSubSubFieldsI5() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = "";
    const arr = [
        "	Antique Furniture",
        " Bathroom Remodeling",
        " Bathtubs & Sinks",
        " Carpenters",
        " Closets & Wardrobes",
        " Concrete & Cement",
        " Doors & Windows",
        " Driveway & Sidewalk",
        " Electricians",
        ". Fire & Water Damage",
        ". Garage Construction",
        ". General Contractors",
        " Handy Person Services",
        " Hardware & Tools",
        " Heating Ventilation & Air Conditioning",
        " Home Shelving",
        " House Painting",
        " Interior Design",
        " Kitchen Cabinets & Counters",
        " Kitchen Renovation",
        " Lumber",
        " Mold Remediation",
        " Painting Services",
        " Patio & Deck",
        " Plumbing",
        " Roof Contractors",
        " Septic Tank Contractors",
        " Solar Products & Services Retail",
        " Tiling & Flooring",
        " Water Heater Services",
        " Water Purification Systems",
        " Well Drilling Services ",


    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}

// Lawn & Garden
function AddSubSubFieldsI6() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Barbecue & Grill",
        "Fences & Gates",
        "Firewood Sales",
        "Gardening",
        "Landscaping",
        "Lawn & Garden Equipment",
        "Lawn & Garden Retailers",
        "Lawn & Garden Services",
        "Nurseries",
        "Playground Equipment",
        "Snow Removal",
        "Sprinklers Garden & Lawn Parts & Supplies",



    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}


// Safety
function AddSubSubFieldsI7() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "1.	Burglar Alarms",
        "2.	Fire Extinguishers",
        "3.	Home Automation",
        "4.	Home Safes & Vaults",
        "5.	Home Security",
        "6.	Smoke Detectors",



    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}

// Utilities
function AddSubSubFieldsI8() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Cable",
        "Combined Utilities",
        "Electric Utilities",
        "Gas Companies",
        "Propane",
        "Satellite Systems",
        "Utility Agencies",


    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}





// function ShowSubFields1() {

//     console.log(" Show   Sub Fields of Business  ");
//     var status = document.getElementById("levelone");

//     if (status.value == "Business to Business") {
//         document.getElementById("subField").style.display = "block";
//     } else {
//         document.getElementById("subField").style.display = "none";
//     }

// }

// function ShowSubSubFields1() {

//     console.log(" Show sub  Sub Fields of Business to business ");
//     var status1 = document.getElementById("leveltwo");

//     if (status1.value == "Auto Dealers") {
//         document.getElementById("subSubField").style.display = "block";
//     } else {
//         document.getElementById("subSubField").style.display = "none";
//     }

// }

// // -----------------(Legal and Financial)----------------------------------------------------------------------------------------------------------

function AddSubFields9() {
    console.log(" Show Adding teh fiels   commmunity  ");
    const arr = [
        "Accountant Brokers",
        "Accounting & Bookkeeping",
        "Arbitration & Mediation",
        "Credit & Debt Services",
        "Bail Bonds",
        "Banking Services",
        "Banks",
        "Cash & Check Advances",
        "Court Reporting Services",
        "Credit Unions",
        "Escrow Legal Services",
        "Financing",
        "Fingerprinting",
        "Fund Transfer Services",
        "Insurance",
        "Investment Services",
        "Law Firms",
        "Notaries",
        "Taxes",
    ];

    let subfieldvariable = document.getElementById("leveltwo");
    subfieldvariable.innerHTML = "";


    for (let i = 0; i < arr.length; i++) {
        var option = document.createElement("OPTION"),
            txt = document.createTextNode(arr[i]);
        option.appendChild(txt);
        option.setAttribute("value", arr[i]);
        subfieldvariable.insertBefore(option, subfieldvariable.lastChild);
    }
}


// Financing
function AddSubSubFieldsJ1() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Automotive Financing",
        "Business Financing",
        "Personal Financing",
        "Real Estate Financing",



    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}


// Insurance
function AddSubSubFieldsJ2() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Adjusters",
        "Car Insurance",
        "Health Insurance",
        "Home Insurance",
        "Insurance",
        "Life Insurance",



    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}


// Investment Services
function AddSubSubFieldsJ3() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Financial Planning",
        "Insurance Annuities",
        "Investment Banks",
        "Investment Brokerages",
        "Investment Services",



    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}


// Law Firms
function AddSubSubFieldsJ4() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "	Accident Lawyers",
        "Adoption Lawyers",
        "All Law Firms",
        "Attorneys Information &amp; Referral Service",
        "Aviation Lawyers",
        "Bankruptcy Lawyers",
        "Construction Lawyers",
        "Corporate Lawyers",
        "Criminal Lawyers",
        "	Divorce Lawyers",
        "	DUI Lawyers",
        "	Elder Law Attorneys",
        "	Entertainment Lawyers",
        "	Environmental Lawyers",
        "	Estate & Probate Lawyers",
        "	Family Lawyers",
        "	Immigration Lawyers",
        "	Insurance Lawyers",
        "	Intellectual Property Lawyers",
        "	Labor Relations Lawyers",
        "	Litigation",
        "	Medical Malpractice Lawyers",
        "	Personal Injury Lawyers",
        "	Product Liability Lawyers",
        "	Real Estate Lawyers",
        "	Sexual Harassment Lawyers",
        "	Social Security Lawyers",
        "	Support Services",
        "	Tax Attorneys",
        "	Tenant Law Attorneys",
        "	Workers' Compensation Lawyers",



    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}







// function ShowSubFields1() {

//     console.log(" Show   Sub Fields of Business  ");
//     var status = document.getElementById("levelone");

//     if (status.value == "Business to Business") {
//         document.getElementById("subField").style.display = "block";
//     } else {
//         document.getElementById("subField").style.display = "none";
//     }

// }

// function ShowSubSubFields1() {

//     console.log(" Show sub  Sub Fields of Business to business ");
//     var status1 = document.getElementById("leveltwo");

//     if (status1.value == "Auto Dealers") {
//         document.getElementById("subSubField").style.display = "block";
//     } else {
//         document.getElementById("subSubField").style.display = "none";
//     }

// }

// // -----------------(Professional Services)----------------------------------------------------------------------------------------------------------

function AddSubFields10() {
    console.log(" Show Adding teh fiels   commmunity  ");
    const arr = ["Animals & Pets", "Auctioneers",
        "Child Care Services",
        "Business Organizations",
        "Design",
        "Employment",
        "Eviction Service",
        "News & Media",
        "Office Supplies & Services",
        "Photocopying",
        "Photography",
        "Printing",
        "Private Investigation",
        "Publishing",
        "Shipping",
        "Shopping & Errand Services",
        "Storage",
        "Telecommunications",

    ];

    let subfieldvariable = document.getElementById("leveltwo");
    subfieldvariable.innerHTML = "";


    for (let i = 0; i < arr.length; i++) {
        var option = document.createElement("OPTION"),
            txt = document.createTextNode(arr[i]);
        option.appendChild(txt);
        option.setAttribute("value", arr[i]);
        subfieldvariable.insertBefore(option, subfieldvariable.lastChild);
    }
}



// Animals & Pets
function AddSubSubFieldsK1() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "All Animal Services",
        "Birds",
        "Cat Boarding",
        "Cat Breeders",
        "Cat Grooming",
        "Dog Behavior Training",
        "Dog Boarding",
        "Dog Breeders",
        "Dog Grooming",
        "	Fish",
        "	Horse Boarding Stables",
        "	Horse Breeders",
        "	Horse Supplies",
        "	Horse Training",
        "	Pet Care Services",
        "	Pet Cemeteries",
        "	Pet Sitting Services",
        "	Pet Supplies",
        "	Reptiles",
        "	Taxidermy",
        "	Veterinarians",
        "	Veterinary Medicin",



    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}


// Employment	
function AddSubSubFieldsK2() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "	Advertising &amp; Marketing Employment",
        "All Employment Service",
        "Education Employment",
        "Employment Training",
        "General Employment Placement",
        "Health Employment Recruiting",
        "High Tech Employment Recruiting",
        "Resume Services",
        "Temporary Employment Agencies",


    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}


// News & Media	
function AddSubSubFieldsK3() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Magazines",
        "Newspapers",
        "Radio",
        "Television",



    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}
// Office Supplies & Services
function AddSubSubFieldsK4() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Office Furniture",
        "Office Retailers",
        "Personal Stationery",



    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}

// Photography
function AddSubSubFieldsK5() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Photographers",
        "Photographic Restoration",
        "Photographic Supplies",
        "Photography",
        "Photography Manufacturers",
        "Photography Wholesalers",



    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}

// Printing
function AddSubSubFieldsK6() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Book Printers",
        "Business Forms Printers",
        "Commercial Printers",
        "Printing Facilities",
        "Screen Printing",
        "	Signage",



    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}

// Shipping
function AddSubSubFieldsK7() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Courier Services",
        "Mail Services",
        "Movers",
        "Piano & Organ Moving",



    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}

// Storage
function AddSubSubFieldsK8() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Warehouses Commodity &amp; Merchandise",
        "Warehouses Self Storage",



    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}


//Telecommunications
function AddSubSubFieldsK9() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Answering Services",
        "Cellular Phones",
        "Cellular Providers",
        "Electronic",
        "Fax Services",
        "Pagers",
        "Phone Messaging Services",
        "Telegram Services",



    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}





// function ShowSubFields1() {

//     console.log(" Show   Sub Fields of Business  ");
//     var status = document.getElementById("levelone");

//     if (status.value == "Business to Business") {
//         document.getElementById("subField").style.display = "block";
//     } else {
//         document.getElementById("subField").style.display = "none";
//     }

// }

// function ShowSubSubFields1() {

//     console.log(" Show sub  Sub Fields of Business to business ");
//     var status1 = document.getElementById("leveltwo");

//     if (status1.value == "Auto Dealers") {
//         document.getElementById("subSubField").style.display = "block";
//     } else {
//         document.getElementById("subSubField").style.display = "none";
//     }

// }

// // -----------------(Real Estate)----------------------------------------------------------------------------------------------------------

function AddSubFields11() {
    console.log(" Show Adding teh fiels   commmunity  ");
    const arr = ["Apartments ", "Corporate Housing",
        "Escrow Services",
        "Home Builders",
        "Mobile Home Parks",
        "Other Real Estate",
        "Planned Communities",
        "Property Management",
        "Real Estate Agents",
        "Real Estate Appraisal",
        "Real Estate Inspection",
        "Relocation Services",
        "Rental Agencies",
        "Retirement Apartments & Hotels",
        "Title Companies",
        "Vacation Rentals",

    ];

    let subfieldvariable = document.getElementById("leveltwo");
    subfieldvariable.innerHTML = "";


    for (let i = 0; i < arr.length; i++) {
        var option = document.createElement("OPTION"),
            txt = document.createTextNode(arr[i]);
        option.appendChild(txt);
        option.setAttribute("value", arr[i]);
        subfieldvariable.insertBefore(option, subfieldvariable.lastChild);
    }
}








// function ShowSubFields1() {

//     console.log(" Show   Sub Fields of Business  ");
//     var status = document.getElementById("levelone");

//     if (status.value == "Business to Business") {
//         document.getElementById("subField").style.display = "block";
//     } else {
//         document.getElementById("subField").style.display = "none";
//     }

// }

// function ShowSubSubFields1() {

//     console.log(" Show sub  Sub Fields of Business to business ");
//     var status1 = document.getElementById("leveltwo");

//     if (status1.value == "Auto Dealers") {
//         document.getElementById("subSubField").style.display = "block";
//     } else {
//         document.getElementById("subSubField").style.display = "none";
//     }

// }

// // -----------------(Recreation)----------------------------------------------------------------------------------------------------------

function AddSubFields12() {
    console.log(" Show Adding teh fiels   commmunity  ");
    const arr = ["Amusement Parks", "Boating",
        "Camping",
        "Archery",
        "Baseball",
        "Country Clubs",
        "Cycling",
        "Equestrian",
        "Fishing",
        "Golf",
        "Gymnastics",
        "Hobbies",
        "Hunting & Shooting",
        "Marinas",
        "Martial Arts",
        "Other Sports",
        "Outdoor Parks",
        "Recreation Centers",
        "Skating",
        "Skiing",
        "Soccer",
        "Sport Clubs",
        "Sporting Goods",
        "Swimming & Diving",
        "Tennis",


    ];

    let subfieldvariable = document.getElementById("leveltwo");
    subfieldvariable.innerHTML = "";


    for (let i = 0; i < arr.length; i++) {
        var option = document.createElement("OPTION"),
            txt = document.createTextNode(arr[i]);
        option.appendChild(txt);
        option.setAttribute("value", arr[i]);
        subfieldvariable.insertBefore(option, subfieldvariable.lastChild);
    }
}

//Golf
function AddSubSubFieldsM1() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Golf Carts",
        "Golf Courses",
        "Golf Driving Ranges",
        "Golf Instruction",
        "Golf Retailers",
        "Miniature Golf",



    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}

//       Hobbies
function AddSubSubFieldsM2() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Coin Collecting",
        "Hobby Shops",
        "Homebrewing",
        "Kites",
        "Magic",
        "Metal Detecting",
        "Model Making",
        "Other Hobbies",
        "Smoking & Tobacco",
        "Stamp Collecting",





    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}









// function ShowSubFields1() {

//     console.log(" Show   Sub Fields of Business  ");
//     var status = document.getElementById("levelone");

//     if (status.value == "Business to Business") {
//         document.getElementById("subField").style.display = "block";
//     } else {
//         document.getElementById("subField").style.display = "none";
//     }

// }

// function ShowSubSubFields1() {

//     console.log(" Show sub  Sub Fields of Business to business ");
//     var status1 = document.getElementById("leveltwo");

//     if (status1.value == "Auto Dealers") {
//         document.getElementById("subSubField").style.display = "block";
//     } else {
//         document.getElementById("subSubField").style.display = "none";
//     }

// }

// // -----------------(Retail Shopping)----------------------------------------------------------------------------------------------------------

function AddSubFields13() {
    console.log(" Show Adding teh fiels   commmunity  ");
    const arr = [
        "Arts & Crafts",
        "Antiques & Collectibles",
        "Baby Accessories & Services",
        "Bookstores",
        "Clothing",
        "Clothing & Apparel",
        "Convenience Stores",
        "Events & Occasions",
        "Flowers",
        "Footwear",
        "Gifts",
        "Home Electronics",
        "Jewellery & Watches",
        "Luggage & Accessories",
        "Shopping Venues",
        "Toys & Games",
        "Trophies & Awards",
        "Weddings",

    ];

    let subfieldvariable = document.getElementById("leveltwo");
    subfieldvariable.innerHTML = "";


    for (let i = 0; i < arr.length; i++) {
        var option = document.createElement("OPTION"),
            txt = document.createTextNode(arr[i]);
        option.appendChild(txt);
        option.setAttribute("value", arr[i]);
        subfieldvariable.insertBefore(option, subfieldvariable.lastChild);
    }
}



//       Arts & Crafts {

function AddSubSubFieldsN1() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Art Galleries",
        "Art Instruction",
        "Arts & Craft Supplies",
        "Embroidery",
        "Fabric Stores",
        "Knitting",
        "Other Arts & Crafts",
        "Picture Framing",
        "Quilting",
        "Sewing",





    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}

//       Baby Accessories and services

function AddSubSubFieldsN2() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Baby Apparel",
        "Baby Furniture",
        "Baby Sitters",
        "Breastfeeding",
        "Diaper Service",
        "Maternity Needs",

    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}

//    Clothing
function AddSubSubFieldsN3() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Alterations & Tailoring",
        "Athletic",
        "Children's Clothing",
        "Clothing Accessories",
        "Clothing Manufacturers",
        "Clothing Retailers",
        "Clothing Stores",
        "Clothing Wholesalers",
        "Costumes",
        "	Formal Wear & Tuxedos",
        "	Laundromats",
        "	Lingerie",
        "	Mastectomy Boutiques",
        "	Men's Clothing",
        "	Military Surplus",
        "	Sunglasses",
        "	Uniforms ",
        "	Vintage & Used Clothing",
        "	Wigs & Hairpieces",
        "	Women's Clothing",





    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}


//    Home Electronics
function AddSubSubFieldsN4() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Batteries Storage Retail",
        "Cameras & Video Equipment & Service",
        "DVD Players",
        "Electronics Parts",
        "Electronics Retailers",
        "Home Theater",
        "Stereo Equipment",
        "TV & Electronics Rental",





    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}

//    Shopping Venues
function AddSubSubFieldsN5() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Department Stores",
        "Flea Markets",
        "Outlet Malls",
        "Salvage & Surplus Merchandise",
        "Shopping Centers",
        "Thrift Stores",





    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}


//    Weddings
function AddSubSubFieldsN6() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Bridal Boutiques",
        "Wedding Invitations",
        "3.	Wedding Planners",
        "Weddings Entertainment",
        "Wedding Supplies & Services",
        "Wedding Venues",


    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}


// function ShowSubFields1() {

//     console.log(" Show   Sub Fields of Business  ");
//     var status = document.getElementById("levelone");

//     if (status.value == "Business to Business") {
//         document.getElementById("subField").style.display = "block";
//     } else {
//         document.getElementById("subField").style.display = "none";
//     }

// }

// function ShowSubSubFields1() {

//     console.log(" Show sub  Sub Fields of Business to business ");
//     var status1 = document.getElementById("leveltwo");

//     if (status1.value == "Auto Dealers") {
//         document.getElementById("subSubField").style.display = "block";
//     } else {
//         document.getElementById("subSubField").style.display = "none";
//     }

// }

// // -----------------(Travel and Lodging)----------------------------------------------------------------------------------------------------------

function AddSubFields14() {
    console.log(" Show Adding teh fiels   commmunity  ");
    const arr = ["Airlines", "Airports", "Charter Buses",
        "Cruises",
        "Hotels & Lodging",
        "Limos & Shuttles",
        "Mass Transit",
        "Parking Services",
        "Passports & Visas",
        "Taxi Services",
        "Tourist Attractions",
        "Tour Operators",
        "Travel Agents",

    ];

    let subfieldvariable = document.getElementById("leveltwo");
    subfieldvariable.innerHTML = "";


    for (let i = 0; i < arr.length; i++) {
        var option = document.createElement("OPTION"),
            txt = document.createTextNode(arr[i]);
        option.appendChild(txt);
        option.setAttribute("value", arr[i]);
        subfieldvariable.insertBefore(option, subfieldvariable.lastChild);
    }
}




//    Hotels & Lodging
function AddSubSubFieldsO1() {

    let subSubFieldvariable = document.getElementById("levelthree");
    subSubFieldvariable.innerHTML = ""
    const arr = [
        "Bed & Breakfasts",
        "Casinos",
        "Hostels",
        "Hotels & Motels",
        "Other Lodging",
        "Resorts",


    ];

    for (let i = 0; i < arr.length; i++) {
        var option1 = document.createElement("OPTION"),
            txt1 = document.createTextNode(arr[i]);
        option1.appendChild(txt1);
        option1.setAttribute("value", arr[i]);
        subSubFieldvariable.insertBefore(option1, subSubFieldvariable.lastChild);
    }
}




// function ShowSubFields1() {

//     console.log(" Show   Sub Fields of Business  ");
//     var status = document.getElementById("levelone");

//     if (status.value == "Business to Business") {
//         document.getElementById("subField").style.display = "block";
//     } else {
//         document.getElementById("subField").style.display = "none";
//     }

// }s

// function ShowSubSubFields1() {

//     console.log(" Show sub  Sub Fields of Business to business ");
//     var status1 = document.getElementById("leveltwo");

//     if (status1.value == "Auto Dealers") {
//         document.getElementById("subSubField").style.display = "block";
//     } else {
//         document.getElementById("subSubField").style.display = "none";
//     }

// }