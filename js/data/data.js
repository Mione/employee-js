
var mio = mio || {};
mio.data =
    (function () {
        'use strict';
        var data = {},
            employees = [
                {
                    fullName : 'John Doe',
                    jobTitle : "UI Developer",
                    grade : "Senior Engineer",
                    allocationStatus : "Allocated",
                    project : "Trinity Mirror",
                    date : "10/05/2015",
                    details: {
                        'Delivery Unit': 'ISD_Iasi',
                        'Date of Start': '12/03/2015',
                        'Line manager' : 'Bogdan Volosincu',
                        'Project Manager' : 'Andrei Ursache'
                    }
                },
                {
                    fullName : 'John Doe',
                    jobTitle : "UI Developer",
                    grade : "Senior Engineer",
                    allocationStatus : "Allocated",
                    project : "Trinity Mirror",
                    date : "10/05/2015",
                    details: {
                        'Delivery Unit': 'ISD_Iasi',
                        'Date of Start': '12/03/2015',
                        'Line manager' : 'Bogdan Volosincu',
                        'Project Manager' : 'Andrei Ursache'
                    }
                },
                {
                    fullName : 'John Doe',
                    jobTitle : "UI Developer",
                    grade : "Senior Engineer",
                    allocationStatus : "Allocated",
                    project : "Trinity Mirror",
                    date : "10/05/2015",
                    details: {
                        'Delivery Unit': 'ISD_Iasi',
                        'Date of Start': '12/03/2015',
                        'Line manager' : 'Bogdan Volosincu',
                        'Project Manager' : 'Andrei Ursache'
                    }
                },
                {
                    fullName : 'John Doe',
                    jobTitle : "UI Developer",
                    grade : "Senior Engineer",
                    allocationStatus : "Allocated",
                    project : "Trinity Mirror",
                    date : "10/05/2015",
                    details: {
                        'Delivery Unit': 'ISD_Iasi',
                        'Date of Start': '12/03/2015',
                        'Line manager' : 'Bogdan Volosincu',
                        'Project Manager' : 'Andrei Ursache'
                    }
                },
                {
                    fullName : 'John Doe',
                    jobTitle : "UI Developer",
                    grade : "Senior Engineer",
                    allocationStatus : "Allocated",
                    project : "Trinity Mirror",
                    date : "10/05/2015",
                    details: {
                        'Delivery Unit': 'ISD_Iasi',
                        'Date of Start': '12/03/2015',
                        'Line manager' : 'Bogdan Volosincu',
                        'Project Manager' : 'Andrei Ursache'
                    }
                },
                {
                    fullName : 'John Doe',
                    jobTitle : "UI Developer",
                    grade : "Senior Engineer",
                    allocationStatus : "Allocated",
                    project : "Trinity Mirror",
                    date : "10/05/2015",
                    details: {
                        'Delivery Unit': 'ISD_Iasi',
                        'Date of Start': '12/03/2015',
                        'Line manager' : 'Bogdan Volosincu',
                        'Project Manager' : 'Andrei Ursache'
                    }
                },
                {
                    fullName : 'John Doe',
                    jobTitle : "UI Developer",
                    grade : "Senior Engineer",
                    allocationStatus : "Allocated",
                    project : "Trinity Mirror",
                    date : "10/05/2015",
                    details: {
                        'Delivery Unit': 'ISD_Iasi',
                        'Date of Start': '12/03/2015',
                        'Line manager' : 'Bogdan Volosincu',
                        'Project Manager' : 'Andrei Ursache'
                    }
                },
                {
                    fullName : 'John Doe',
                    jobTitle : "UI Developer",
                    grade : "Senior Engineer",
                    allocationStatus : "Allocated",
                    project : "Trinity Mirror",
                    date : "10/05/2015",
                    details: {
                        'Delivery Unit': 'ISD_Iasi',
                        'Date of Start': '12/03/2015',
                        'Line manager' : 'Bogdan Volosincu',
                        'Project Manager' : 'Andrei Ursache'
                    }
                },
                {
                    fullName : 'John Doe',
                    jobTitle : "UI Developer",
                    grade : "Senior Engineer",
                    allocationStatus : "Allocated",
                    project : "Trinity Mirror",
                    date : "10/05/2015",
                    details: {
                        'Delivery Unit': 'ISD_Iasi',
                        'Date of Start': '12/03/2015',
                        'Line manager' : 'Bogdan Volosincu',
                        'Project Manager' : 'Andrei Ursache'
                    }
                },
                {
                    fullName : 'John Doe',
                    jobTitle : "UI Developer",
                    grade : "Senior Engineer",
                    allocationStatus : "Allocated",
                    project : "Trinity Mirror",
                    date : "10/05/2015",
                    details: {
                        'Delivery Unit': 'ISD_Iasi',
                        'Date of Start': '12/03/2015',
                        'Line manager' : 'Bogdan Volosincu',
                        'Project Manager' : 'Andrei Ursache'
                    }
                }
            ],
            customers = [
                {
                    fullName : 'Ciba Mumu',
                    jobTitle : "UI Developer",
                    grade : "Senior Engineer",
                    allocationStatus : "Allocated",
                    project : "Trinity Mirror",
                    date : "10/05/2015",
                    details: {
                        'Delivery Unit': 'ISD_Iasi',
                        'Date of Start': '12/03/2015',
                        'Line manager' : 'Bogdan Volosincu',
                        'Project Manager' : 'Andrei Ursache'
                    }
                },
                {
                    fullName : 'Ciba Mumu',
                    jobTitle : "UI Developer",
                    grade : "Senior Engineer",
                    allocationStatus : "Allocated",
                    project : "Trinity Mirror",
                    date : "10/05/2015",
                    details: {
                        'Delivery Unit': 'ISD_Iasi',
                        'Date of Start': '12/03/2015',
                        'Line manager' : 'Bogdan Volosincu',
                        'Project Manager' : 'Andrei Ursache'
                    }
                },
                {
                    fullName : 'Ciba Mumu',
                    jobTitle : "UI Developer",
                    grade : "Senior Engineer",
                    allocationStatus : "Allocated",
                    project : "Trinity Mirror",
                    date : "10/05/2015",
                    details: {
                        'Delivery Unit': 'ISD_Iasi',
                        'Date of Start': '12/03/2015',
                        'Line manager' : 'Bogdan Volosincu',
                        'Project Manager' : 'Andrei Ursache'
                    }
                },
                {
                    fullName : 'Ciba Mumu',
                    jobTitle : "UI Developer",
                    grade : "Senior Engineer",
                    allocationStatus : "Allocated",
                    project : "Trinity Mirror",
                    date : "10/05/2015",
                    details: {
                        'Delivery Unit': 'ISD_Iasi',
                        'Date of Start': '12/03/2015',
                        'Line manager' : 'Bogdan Volosincu',
                        'Project Manager' : 'Andrei Ursache'
                    }
                },
                {
                    fullName : 'Ciba Mumu',
                    jobTitle : "UI Developer",
                    grade : "Senior Engineer",
                    allocationStatus : "Allocated",
                    project : "Trinity Mirror",
                    date : "10/05/2015",
                    details: {
                        'Delivery Unit': 'ISD_Iasi',
                        'Date of Start': '12/03/2015',
                        'Line manager' : 'Bogdan Volosincu',
                        'Project Manager' : 'Andrei Ursache'
                    }
                },
                {
                    fullName : 'Ciba Mumu',
                    jobTitle : "UaI Developer",
                    grade : "Senior Engineer",
                    allocationStatus : "Allocated",
                    project : "Trinity Mirror",
                    date : "10/05/2015",
                    details: {
                        'Delivery Unit': 'ISD_Iasi',
                        'Date of Start': '12/03/2015',
                        'Line manager' : 'Bogdan Volosincu',
                        'Project Manager' : 'Andrei Ursache'
                    }
                }
            ];
        data.employees = employees;
        data.customers = customers;
        return data;
    }());