// Singleton.ts
class AppSingleton {
    private static instance: AppSingleton;
    private userName: string = '';
  
    // Private constructor to prevent direct class instantiation
    private constructor() {}
  
    // Static method to get the single instance of the class
    public static getInstance(): AppSingleton {
      if (!AppSingleton.instance) {
        AppSingleton.instance = new AppSingleton();
      }
      return AppSingleton.instance;
    }
  
    // Method to set the string value
    public setUserName(value: string): void {
      this.userName = value;
    }
  
    // Method to get the string value
    public getUserName(): string {
      return this.userName;
    }
  }
  
  export default AppSingleton;