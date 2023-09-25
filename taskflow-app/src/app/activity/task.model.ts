// export interface ITask {
//   taskId: number;
//   taskName: string;
//   taskOwner: object;
//   taskDescription: string;
//   taskStatus: string;
// };

// export class Task implements ITask {

//   constructor(
//     public taskId: number,
//     public taskName: string,
//     public taskOwner: object,
//     public taskDescription: string,
//     public taskStatus: string
//   ){}

//   getDescription(taskDescription: string): string {
//     return taskDescription;
//   }

// }


export class Activity {
  constructor(
    public name: string,
    public description: string,
    public owner: {
      firstName: string,
      lastName: string,
      id?: number | null
    }
    // Ajouter d'autres propriétés ici si nécessaire
  ) {}
}

