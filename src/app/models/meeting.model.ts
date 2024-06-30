export interface Meeting {
  id: number;
  time: number;
  companyId: number | null;
  companyName: string;
  auditorium: string;
  comment: string;
  countYes: 0,
  countOnline: 0,
  countNo: 0,
  userVote: string | null
}
