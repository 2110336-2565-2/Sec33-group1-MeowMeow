export interface IEditForm {
  title: string;
  locations: string[];
  tags: string[];
  content: string;
  fee: number;
  maxParticipant: number;
  contactInfo: string;
}

export function editViewModel(methodType: string) {
  const formBody: IEditForm = {
    title: "demo title",
    locations: ["Thailand"],
    tags: ["Happy"],
    content: "demo content",
    fee: 9.5,
    maxParticipant: 3,
    contactInfo: "demo contact info",
  };
  // Get Data Post from API Here
  if (methodType === "PUT") {
    formBody.title = "mock Title";
    formBody.locations = ["mock Location1", "mock Location2"];
    formBody.tags = ["mock Tag1", "mock Tag2"];
    formBody.content = "mock Content";
    formBody.fee = 1000;
    formBody.maxParticipant = 10;
    formBody.contactInfo = "mock Contact Info";
  }
  //

  return formBody;
}