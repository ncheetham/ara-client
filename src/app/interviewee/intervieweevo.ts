import { TreeNode } from "./treenode";

export class IntervieweeVO implements TreeNode {
  id: number ;
  name: string ;
  title: string ;
  children: IntervieweeVO[] ;

  constructor() {
    this.children = []
  }

  get description(): string {
    return this.title ; 
  }
}
