class AppSingleton {
  private static instance: AppSingleton;
  username: string = '';
  fullName: string = '';
  badgeNumber: string = '';
  mobileNumber: string = '';
  token: string = '';
  eMail: string = '';
  title: string = '';
  beSafeIsAdmin: boolean = false;
  region: string = ''

  // Private constructor to prevent direct class instantiation
  private constructor() { }

  // Static method to get the single instance of the class
  public static getInstance(): AppSingleton {
    if (!AppSingleton.instance) {
      AppSingleton.instance = new AppSingleton();
    }
    return AppSingleton.instance;
  }

  // Method to set username
  public setUserName(value: string): void {
    this.username = value;
  }

  // Method to set full name
  public setFullName(value: string): void {
    this.fullName = value;
    console.log('\nUser setFullName', this.fullName);
  }

  // Method to set badge number
  public setBadgeNumber(value: string): void {
    const extractedNumber = extractNumberFromString(value);
    this.badgeNumber = extractedNumber;
    console.log('\nUser setBadgeNumber', this.badgeNumber);
  }

  // Method to set mobile number
  public setMobileNumber(value: string): void {
    this.mobileNumber = value;
  }

  public setTitle(value: string): void {
    this.title = value;
  }

  public setEmail(value: string): void {
    this.eMail = value;
  }

  public setBeSafeIsAdmin(IsAdmin: boolean): void {
    this.beSafeIsAdmin = IsAdmin
  }

  public setRegion(value: string): void {
    this.region = value
  }
  
  public getUserName(): string {
    return this.username;
  }

  public getFullName(): string {
    return this.fullName;
  }

  public getBadgeNumber(): string {
    return this.badgeNumber;
  }

  public getMobileNumber(): string {
    return this.mobileNumber;
  }

  // Method to set token
  public setToken(value: string): void {
     this.token = value;
  }

  public getToken(): string {
    return this.token;
  }
  
}

const extractNumberFromString = (input: string): string => {
  const numberMatch = input.match(/\d+/);
  console.log('\nextractNumberFromString', numberMatch ? numberMatch[0] : '')
  return numberMatch ? numberMatch[0] : '';
};


export default AppSingleton;