export class User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob: string;
  ssn: string;

  constructor(firstName: string, lastName: string, email: string, password: string
    ,         dob: string, ssn: string) {
    // this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.dob = dob;
    this.ssn = ssn;
  }
}
