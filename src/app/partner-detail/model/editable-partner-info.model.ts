export interface EditablePartnerInfo {
  id: string;
  name: string;
  description: string;
  nextMeetingDate: number;
  studentOffers: string[];
  jobPositions: { [key: string]: number };
  companyContact: { email: string; telegram: string };
  facultyContact: { firstName: string; lastName: string };
}
