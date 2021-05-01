export const storageName = "userData";

export interface IUser {
  id: number;
  name: string;
  src: string;
  email: string;
  skype: string;
  user_status: string;
  active: boolean;
  nickname: string;
}

export interface IMessage {
  id: number;
  text: string;
  from: number;
  fromName: string;
  to_user: number;
  to_channel: number;
  is_send: number;
  type: string;
  timeStamp: number;
  author_src: string;
}

export interface IConnect {
  userId: number;
  type: string;
}

export interface IChatTab {
  key: string;
  name: string;
  active: boolean;
}

export interface IUserInfoItem {
  title: string;
  content: string;
}

export enum CellType {
  empty = 0,
  ship = 1,
  shoot = 2,
}

export interface ICell {
  id : string,
  row: number;
  col: number;
  affil : number;
  type: CellType;
}
