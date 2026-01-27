export class CreateStudentDto {
  name!: string;
  rollNo!: string; // store as string so leading zeros are preserved
  project?: string;
}
