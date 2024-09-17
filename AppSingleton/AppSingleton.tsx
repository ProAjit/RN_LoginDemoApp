// AppSingleton.ts
class AppSingleton {
  private static instance: AppSingleton;
  private username: string = '';
  private fullName: string = '';
  private badgeNumber: string = '';
  private mobileNumber: string = '';
  private token: string = '';

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

  public getUserName(): string {
    return this.username;
  }

  // Method to set full name
  public setFullName(value: string): void {
    this.fullName = value;
  }

  public getFullName(): string {
    return this.fullName;
  }

  // Method to set badge number
  public setBadgeNumber(value: string): void {
    const extractedNumber = extractNumberFromString(value);
    this.badgeNumber = extractedNumber;
  }

  public getBadgeNumber(): string {
    return this.badgeNumber;
  }

  // Method to set mobile number
  public setMobileNumber(value: string): void {
    this.mobileNumber = value;
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
  return numberMatch ? numberMatch[0] : '';
};

export default AppSingleton;