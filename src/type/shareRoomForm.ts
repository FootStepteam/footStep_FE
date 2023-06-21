export interface IForm {
  title: string;
  startDate: string;
  endDate: string;
}

export interface ISelectedDate {
  startDate: Date;
  endDate: Date;
  printStartDate: string;
  printEndDate: string;
  submitStartDate: string;
  submitEndDate: string;
}
