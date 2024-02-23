export interface Route {
  endpoint: string;
  method: string;
  handlers: any;
  middleware: ((props: any) => Promise<void>)[];
}
