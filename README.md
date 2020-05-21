# _OpenHouse_

#### _Volunteers teachers can register as volunteers, login to schedule and make a weekly lesson plan. Parents can register their kids for sessions._

#### 12/19/2019

#### By _**Carrie Schmid**_

## Description

_This is a tool for a cooperative parenting group. Volunteer teacher can make and share lesson plans. Parents can register kids and pay for sessions. An adminstrator can approve volunteers as registered. The site tracks program openings and volunteer hours._

## Specifications

- #### Authentication

  | Spec                                                  | Input               | Output                                            |
  | :---------------------------------------------------- | :------------------ | :------------------------------------------------ |
  | Users will be prompted to register or Login           | `navigates to page` | Register or Login                                 |
  | User can register                                     | `Register`          | Please enter a new user name, email, and password |
  | User can log in                                       | `Log In`            | Please enter a new user name and password         |
  | Logged in users will be allowed to view their content | `Log in Successful` | \_Navigates to user dashboard.                    |

- #### Admin Dashbord

  | Spec                                                              | Input                | Output                                                          |
  | :---------------------------------------------------------------- | :------------------- | :-------------------------------------------------------------- |
  | Admin users can create a program scheduler                        | `Edit Schedule`      | _Form to enter new sessions._                                   |
  | Admin users can approve volunteers when registration is submitted | `Approve volunteer.` | _Volunteer approved appears._                                   |
  | Admin can see all planned sessions and participants registered    | `Edit session`       | _See session details including lesson and participants listed._ |

  |

- #### Volunteer Admin
  | Spec                                                                      | Input            | Output                              |
  | :------------------------------------------------------------------------ | :--------------- | :---------------------------------- |
  | Volunteer can select session from schedule, fill in form and add lessons. | `Choose session` | _Form with session fields to edit._ |

* #### Participant Admin (Home page)
  | Spec                                                                           | Input            | Output                              |
  | :----------------------------------------------------------------------------- | :--------------- | :---------------------------------- |
  | Participant can select a session and fill in fields to register a participant. | `Choose session` | _Form with sessoin fields to edit._ |

## Setup/Installation Requirements

## Known Bugs

_Registration form_

## Support and contact details

_Send any questions or comments to Carrie Schmid at carriepedersonschmid@gmail.com._

## Technologies Used

_This application was written using JavaScript, HTML, and CSS. Packages manager with Node Package Manager. The front end of this application was written with React. Other libraries include Semantic UI, React Final Form, React Router and Dropzone. Authorization and databasing was accomplished using C# and a .NET framework. JWT tokens are implemented._

### License

_This software is licensed under the MIT license._

Copyright (c) 2019 **_Carrie Schmid_**
