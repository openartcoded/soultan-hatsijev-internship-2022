export default class User {
  firstName: string;
  lastName: string;
  goal: number;

  /**
   *
   */
  constructor(firstName: string, lastName: string, goal: number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.goal = goal;
  }

  get isValid(): boolean {
    if (
      this.firstName.length >= 2 &&
      this.firstName.length <= 50 &&
      this.lastName.length >= 2 &&
      this.lastName.length <= 100 &&
      this.goal > 100
    ) {
      return true;
    }

    return false;
  }
}
