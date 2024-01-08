import { TreeNode } from "./treenode";

export class IntervieweeVO implements TreeNode {
  id: number ;
  name: string ;
  title: string ;
  children: IntervieweeVO[] ;
  hideChildren?: boolean ;

  constructor() {
    this.children = []
    this.hideChildren = false ;
  }

  get description(): string {
    return this.title ;
  }
}
