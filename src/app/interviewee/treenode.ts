export interface TreeNode {
  // Node
  children: TreeNode[];
  hideChildren?: boolean;
  onClick?: () => void;
  // CSS (used for custom styling of individual nodes)
  cssClass?: string;
  css?: string;
}
