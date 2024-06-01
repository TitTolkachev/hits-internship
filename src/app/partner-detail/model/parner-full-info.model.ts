export interface PartnerFullInfo {
  id: string;
  name: string;
  description: string;
  nextMeetingDate: number; // Дата в формате Epoch mills
  studentOffers: string[]; // Список id студентов
  jobPositions: { [key: string]: number }; // Должность: количество мест
  companyContact: {
    email: string;
    telegram: string;
  };
  facultyContact: {
    firstName: string;
    lastName: string;
  };
}
