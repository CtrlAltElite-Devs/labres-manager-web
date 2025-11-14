
export type LabResult = {
  id: string
  userPid: string
  testName: string
  testDate: string
}

export type User = {
  pid: string,
  lastName: string,
  emailVerified: boolean,
  dob: Date,
}
