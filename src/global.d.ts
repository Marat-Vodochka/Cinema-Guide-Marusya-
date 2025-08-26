// SCSS modules
declare module "*.module.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

// CSS modules
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}

// SVG as a companent
declare module "*.svg?react" {
  import * as React from "react";
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  export default ReactComponent;
}

// just SVG as URL
declare module "*.svg" {
  const src: string;
  export default src;
}

// Images
declare module "*.png" {
  const src: string;
  export default src;
}
declare module "*.jpg" {
  const src: string;
  export default src;
}
declare module "*.jpeg" {
  const src: string;
  export default src;
}
declare module "*.gif" {
  const src: string;
  export default src;
}
