import "react";

declare module "react" {
  interface HTMLAttributes<T> {
    [key: string]: any;
  }
}
